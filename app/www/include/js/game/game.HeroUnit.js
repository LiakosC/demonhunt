game.HeroUnit = class extends game.Unit {
	constructor() {
		super();
		var THIS = this;
		game.meGroup.add(this.GetBodySprite());
		this.SetBodySize(42, 50);
		this.SetScale(0.88);
		this.CenterBodyToSprite();
		this._GetTextureSprite().loadTexture("hero"); // same as body sprite: this.sprite
		this.onAction = new Phaser.Signal();
		this.speed = 220;
		this.regenPS = 10;
		this.canEnter = true; // when entering a door, briefly turn this off so reentering doesnt become spamming
		this.deathSprite = ph.add.sprite(0, 0, "death_flash");
		this.deathSprite.alpha = 0;
		this.deathSprite.fixedToCamera = true;
		this.deathTween = ph.add.tween(this.deathSprite).to({alpha:1});
		this.onDamaged.add(function() {
			THIS.damagedSounds[ph.rnd.integerInRange(0, game.me.damagedSounds.length-1)].play();
		});
		game.deathSpriteGroup.add(this.deathSprite);
		this.onLand.add(function() {
			console.log("landing");
			THIS._GetTextureSprite().loadTexture("hero");
		})
		this.onUpdate.add(function() {
			//if (game.me.isMoving && game.me.isAttacking) {
			//	game.me.direction = game.me.attackDirection;
			//} else if (game.me.isMoving) {
			//	game.me.direction = game.me.movingDirection;
			//} else if (game.me.isAttacking) {
			//	game.me.direction = game.me.attackDirection;
			//}
			
			var sprite = THIS.GetBodySprite();
			if (sprite.y > ph.world.height) {THIS.Die();}

			//console.log(sprite.y, ph.world.height);
			
			var regenPS = 10;
			if (THIS.hp < THIS.hpMax) {
				THIS.hp += THIS.regenPS * ph.time.physicsElapsed;
				if (THIS.hp > THIS.hpMax) {THIS.hp = THIS.hpMax;}
				THIS.deathSprite.alpha = 1 - THIS.hp / THIS.hpMax;
			}
		});
		this.onDeath.add(function() {
			ph.state.start("game"); // game.episode and game.level already saved
		});
		this.jumpSounds = [ph.add.audio("hop1"), ph.add.audio("hop2"), ph.add.audio("hop3")];
		this.attackSounds = [ph.add.audio("attack1"), ph.add.audio("attack2"), ph.add.audio("attack3")];
		this.damagedSounds = [ph.add.audio("damaged1"), ph.add.audio("damaged2"), ph.add.audio("damaged3")];
		console.log(this.GetBodySprite(), this._GetTextureSprite());
		//console.log(this.G2Point(), this.GetBodySprite());
		//if (GOD_MODE && !OFFICIAL) {
		//	ph.input.onDown.add(function() {
		//		game.tp(game.me, game.me.room, ph.input.worldX, ph.input.worldY);
		//		game.me.GetBodySprite().body.velocity.y = 0;
		//	});
		//}
	}
	CastUse() {
		this.onAction.dispatch();
	}
	DirectionAttack(delta) { // -1 | +1 . overwritten
		console.log("hero attacks", delta);
		var THIS = this;
		this._GetTextureSprite().loadTexture("hero_attack");
		this.SetDirection(delta);
		ph.time.events.add(150, function() {THIS._GetTextureSprite().loadTexture("hero");});
		var sprite = this.GetBodySprite();
		var width = 40;
		var height = 20;
		var attackRect = g2.Rect_CS(g2.P(sprite.x + delta * width/2, sprite.y), width, height);
		//game.me.updateAnimation();
		for (var i=0; i<this.room.units.length; i++) {
			var unit = this.room.units[i];
			if (unit !== this) { // hero cant attack self
				if (unit.alive) {
					if (g2.RectOverRect(attackRect, unit.G2Rect())) {
						console.log(attackRect, unit.G2Rect());
						unit.GetDamaged(10);
						this.attackSounds[ph.rnd.integerInRange(0, 2)].play();
					}
				}
			}
		}
	}
	Jump() {
		super.Jump();
		this._GetTextureSprite().loadTexture("hero_jump");
		this.jumpSounds[ph.rnd.integerInRange(0, 2)].play();
	}
	Update(ms) {
		super.Update(ms);
		//console.log(this.pointSprite.body.onFloor());
	}
};



/*

var hero = new game.HeroUnit();
		hero.room = this;
		hero.xy(this.x + x, this.y + y);
		hero.direction = (direction) ? direction : 1;
		
		/* old
		game.me.createBody(37, 48, GRAVITY);
		game.me.sprite.loadTexture("hero");
		ph.camera.follow(game.me.sprite);
		
		hero.controlled = true;
		game.me = hero;
		
		game.me.canMove = true;
		game.me.canEnter = true; // after entering a door, the door makes this false for 500 ms
		game.me.canJump = true;
		game.me.canAttack = true;
		
		game.me.isMoving = false;
		game.me.isJumping = false;
		game.me.isAttacking = false;
		
		game.me.attackDirection = 0;
		game.me.speed = 220;
		
		
		game.me.onLand = new Phaser.Signal();
		game.me.onLand.add(function() {
			game.me.canJump = true;
			game.me.isJumping = false;
			game.me.updateAnimation();
		});
		
		
		game.me.attack = function(direction) {
			
		}
		
	
		
		
		*/
		