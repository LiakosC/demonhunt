game.Room = class {

	constructor(x, y) {
		this.name = "Room";

		// coordinates of top left corner or Room
		this.x = x;
		this.y = y;
		
		this.units 		= [];
		this.enemies	= [];
		this.boundsV	= [];
		this.boundsH	= [];
		this.walls		= []; // all rect walls. check collision with "body" boolean
		this.coins 		= [];
		this.artifacts	= [];
	
		this.onUpdate = new Phaser.Signal();
		this.onRender = new Phaser.Signal();

	}
	G2Rect(x, y, w, h) {
		return g2.Rect(this.x+x, this.y+y, w, h);
	}
	
	CreateHero(x, y, direction) {
		return game.CreateHero(this, this.x + x, this.y + y, direction);
	}
	CreateManyCoins(coins) {
		for (var i=0; i<coins.length; i++) {
			game.CreateCoin(this, this.x + coins[i].x, this.y + coins[i].y);
		}
	}
	CreateCoin(x, y) {
		return game.CreateCoin(this, this.x + x, this.y + y);
	}
	CreateWall(x, y, w, h, texture) {
		return game.CreateWall(this, this.x + x, this.y + y, w, h, texture);
	}
	CreateTile(x, y, w, h, texture) {
		return game.CreateTile(this, this.x + x, this.y + y, w, h, texture);
	}
	
	CreateDoor(x, y, texture, roomTo, toX, toY) {
		var x = this.x + x;
		var y = this.y + y;
		var door = {};
		door.toX = roomTo.x + toX;
		door.toY = roomTo.y + toY;
		door.sprite = ph.add.sprite(x, y, texture);
		game.doorsGroup.add(door.sprite);
		door.room = this;
		door.roomTo = roomTo;
		door.G2Rect = function() {return g2.Rect(x, y, door.sprite.width, door.sprite.height);};
		door.sound = ph.add.audio("door");
		game.me.onAction.add(function() {
			if (game.me.room === door.room) {
				if (game.me.canEnter) {
					if (g2.RectOverRect(game.me.G2Rect(), door.G2Rect())) {
						game.tp(game.me, door.roomTo, door.toX, door.toY);
						game.me.GetBodySprite().body.velocity.y = 0; // avoid "falling down" bug
						game.me.canEnter = false;
						door.sound.play();
						ph.time.events.add(500, function() {game.me.canEnter = true;});
					}
				}
			}
		});
		
		return door;
	}
	
	CreateExitDoor(x, y) {
		var x = x + this.x;
		var y = y + this.y;
		
		var door = {};
		door.room = this;
		
		door.sprite = ph.add.sprite(x, y, "exit-door");
		game.doorsGroup.add(door.sprite);
		
		door.G2Rect = function() {return g2.Rect_CS(g2.P(x, y), door.sprite.width, door.sprite.height);}
		game.me.onAction.add(function() {
			if (g2.RectOverRect(game.me.G2Rect(), door.G2Rect()) && game.me.room == door.room) {
				game.Victory();
			}
		});
		return door;
	}
	
	
	CreateSkeleton(x, y, direction) {
		var sk = new game.SkeletonUnit();
		sk.room = this;
		sk.SetPosition(this.x + x, this.y + y);
		sk.SetDirection(direction);
		this.units.push(sk);
		return sk;
	}
	
	CreateSprite(x, y, texture) {
		var sprite = ph.add.sprite(this.x + x, this.y + y, texture);
		game.spritesGroup.add(sprite);
		return sprite;
	}
	
	CreateFog(x, y, width, height) {
		var fog = {};
		fog.room = this;
		fog.tile = ph.add.tileSprite(this.x + x, this.y + y, width, height, "black");
		game.fogGroup.add(fog.tile);
		fog.reveal = function() {
			fog.tween.start();
		}
		fog.tween = ph.add.tween(fog.tile).to({alpha: 0}, 900, null, false);
		return fog;
	}
	
	CreateGate150(x, y) {
		var gate = {};
		gate.room = this;
		gate.sprite = ph.add.sprite(this.x + x, this.y + y, "gate150_closed");
		ph.physics.arcade.enable(gate.sprite);
		gate.sprite.body.immovable = true;
		gate.sprite.body.setSize(50, 150);
		gate.updateCB = function() {
			//console.log("oups");
			ph.physics.arcade.collide(game.me.GetBodySprite(), gate.sprite);
		}
		game.onUpdate.add(gate.updateCB);
		gate.opened = false;
		gate.close = function() {
			gate.sprite.loadTexture("gate150_closed");
			game.onUpdate.add(gate.updateCB);
			gate.opened = false;
			gate.sound.play();
		}
		gate.open = function() {
			gate.sprite.loadTexture("gate150_opened");
			game.onUpdate.remove(gate.updateCB);
			gate.opened = true;
			gate.sound.play();
		}
		gate.toggle = function() {if (gate.opened) {gate.close();} else {gate.open();}}
		gate.sound = ph.add.audio("open");
		return gate;
	}
	
	CreateArtifact(x, y, name) {
		var THIS = this; // room
		var a = {room: this, name: name};
		a.sprite = ph.add.sprite(this.x + x, this.y + y, name);
		a.sprite.anchor.setTo(0.5);
		game.artifactsGroup.add(a.sprite);
		a.G2Rect = function() {return g2.Rect_CS(g2.P(a.sprite.x-a.sprite.width/2, a.sprite.y-a.sprite.height/2), a.sprite.width, a.sprite.height);}
		a.tween = ph.add.tween(a.sprite).to({y:a.sprite.y+30}, 800, null, true, 0, -1, true);
		a.CheckOverlapCallback = function() {
			if (g2.RectOverRect(game.me.G2Rect(), a.G2Rect())) {
				THIS.onUpdate.remove(a.CheckOverlapCallback);
				a.takenTween.start();
				game.artifactsGained.push(a.name);
				a.onTake.dispatch();
			}
		}
		this.onUpdate.add(a.CheckOverlapCallback);
		a.onTake = new Phaser.Signal();
		a.takenTween = ph.add.tween(a.sprite).to({alpha: 0}, 1000, null);
		return a;
	}
	getUnitCollisionWalls(unit, vector) {
		var walls = [];
		for (var i=0; i<this.walls.length; i++) {
			if (g2.rectCollidesRect(unit.g2Rect(), vector, this.walls[i].g2Rect())) {
				walls.push(this.walls[i]);
			}
		} return walls;
	}
	updateUnitPhysics(unit, s) {
		var x0 = unit.x;
		var y0 = unit.y;
		var moveVector = unit.getMoveVector(s);
		var toMoveDX = moveVector.dx();
		var toMoveDY = moveVector.dy();
		unit.grounded = false;
		var walls = this.getUnitCollisionWalls(unit, moveVector);
		if (walls.length > 0) {
			for (var i=0; i<walls.length; i++) {
				var wall = walls[i];
				if (g2.rectCollidesRect(unit.g2Rect(), g2.Vector(moveVector.dx(), 0), wall.g2Rect())) {
					toMoveDX = 0;
				}
				if (g2.rectCollidesRect(unit.g2Rect(), g2.Vector(0, moveVector.dy()), wall.g2Rect())) {
					toMoveDY = 0; // dont move
					if (moveVector.dy() > 0) { // if going down
						unit.xy(unit.x, wall.y-unit.h/2-0.01);
						unit.gravitySpeed = 0;
						unit.grounded = true; // used for cast_jump();
					} else { // if going up
						unit.gravitySpeed = -unit.gravitySpeed; // bounce your head right down
					}
				}
			}
		}
		unit.xy(unit.x + toMoveDX, unit.y + toMoveDY);
	}
	UnitsWallsCollision() {
		for (var wallIndex=0; wallIndex<this.walls.length; wallIndex++) {
			// only true walls. not tiles
			var wall = this.walls[wallIndex];
			if (wall.canCollideUnits == true) {
				for (var unitIndex=0; unitIndex<this.units.length; unitIndex++) {
					var unit = this.units[unitIndex];
					ph.physics.arcade.collide(wall, unit);
				}
			}
		}
		unit.xy(unit.x + toMoveDX, unit.y + toMoveDY);
	}
	Update(ms) {
		var s = ms / 1000;
		// scan units
		for (var unitIndex=0; unitIndex<this.units.length; unitIndex++) {
			var unit = this.units[unitIndex];
			//unit.isJumping = false; // so a unit doesn't jumps in mid air. changed below when overlapping floor detector.
			// scan walls for each unit
			for (var wallIndex=0; wallIndex<this.walls.length; wallIndex++) {
				//console.log("Checking ", wallIndex, unitIndex);
				var wall = this.walls[wallIndex];
				//game.lighter.SetColor("#85b24a").DrawRect(wall.G2Rect());
				///game.lighter.DrawRect(wall.G2Rect());
				if (wall.canCollideUnits == true) {
						ph.physics.arcade.collide(wall.GetBodySprite(), unit.GetBodySprite());
						ph.physics.arcade.overlap(wall.groundDetectorSprite, unit.GetBodySprite(), function() {
							if (unit.isJumping == true) {
								unit.isJumping = false;
								unit.onLand.dispatch();
							}
						});
					}
				}
				unit.Update(ms);
				unit.Highlight();
			}
			//this.updateUnitPhysics(unit, s);
		
		// hero collects coins
		if (game.me != null) {
			for (var i=0; i<this.coins.length; i++) {
				var coin = this.coins[i];
				var coinCircle = coin.G2Circle();
				var heroRect = game.me.G2Rect();
				game.lighter.DrawCircle(coinCircle);
				if (g2.CircleOverRect(coinCircle, heroRect)) {
					console.log("coins length", this.coins.length);
					coin.sound.play();
					coin.sprite.kill();
					coin.expirationTime(1000);
					this.coins.splice(this.coins.indexOf(coin), 1);
					game.goldGained += 1;
					game.goldInfo.update();
				}
			}
		}
				
		// highlight walls
		for (var wallIndex=0; wallIndex<this.walls.length; wallIndex++) {
			var wall = this.walls[wallIndex];
			wall.Highlight();
		}
		this.onUpdate.dispatch();
	}
	RemoveUnit(unit) {
		for (var i=0; i<this.units.length; i++) {
			if (unit == this.units[i]) {
				this.units.splice(i, 1);
			}
		}
	}
	Render() { // called by game.state.render(). already official check
		for (var unitIndex=0; unitIndex<this.units.length; unitIndex++) {
			var unit = this.units[unitIndex];
			//game.lighter.SetColor(0xffffff).DrawRect(unit.G2Rect());
			//game.lighter.SetColor(0x85b24a).DrawRect(unit.G2Rect());
			//ph.debug.body(unit.GetBodySprite());
		}
		this.coins.forEach(function(coin) {
			game.lighter.SetColor(0xffffff).DrawCircle(coin.G2Circle());
			ph.debug.body(coin.GetBodySprite());
		});
		this.walls.forEach(function(wall) {
			//ph.debug.body(wall.GetBodySprite());
		});
		if (game.me.room == this) {
			ph.debug.text("Room XY: " + (-this.x+ph.input.worldX) + " " + (-this.y+ph.input.worldY), 50, 100);
		}
		this.onRender.dispatch();
	}
}