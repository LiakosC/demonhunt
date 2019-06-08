var game = {};
game.episode = -1;
game.level = -1;
game.startCB = undefined;
game.start = function(episode, level, cb) {
	console.log("game.start()");
	game.episode = episode;
	game.level = level;
	ph.state.start("game"); // sxolio
	if (cb !== undefined) {game.startCB = cb;}
}
game.input = null;
game.state = {
	create: function() {
		console.log("game.create()");
		
		game.speaker = new Speaker(htmlbox);
		game.speaker.toggle(false);
		game.speaker.onOpen.add(function() {
			//ph.input.keyboard.enabled = false;
			//game.me.controlled = false;
			//ph.input.keyboard.clearCaptures(); // this way we can write to chat
			game.input.Toggle(false);
		});
		game.speaker.onClose.add(function() {
			//game.me.controlled = true;
			game.input.Toggle(true);
		});
		// game.speaker.onSpeak.add(function() {game.speaker.lastTalk});
		
		game.onUpdate = new Phaser.Signal();
		game.onRender = new Phaser.Signal();
		
		game.spritesGroup 		= ph.add.group();
		game.doorsGroup 		= ph.add.group();
		game.meGroup			= ph.add.group();
		game.goldGroup			= ph.add.group();
		game.artifactsGroup		= ph.add.group();
		game.wallsGroup 		= ph.add.group();
		game.tilesGroup 		= ph.add.group();
		game.enemiesGroup		= ph.add.group();
		game.fogGroup			= ph.add.group();
		game.deathSpriteGroup 	= ph.add.group();
		
		game.rooms = [];
		
		game.goldGained = 0;
		game.levelGold = 0; // game.CreateCoin increases this value. it is explored and then saved in memory level as goldMax
		game.artifactsGained = []; // names of artifacts gained in level

		game.input = new game.Input();
		game.input.Toggle(true);

		game.lighter = new G2_Phaser_Lighter(ph);

		
		boot.episodes[game.episode].levels[game.level].init();

		boot.profileMemoryData.episodes[game.episode].levels[game.level].goldMax = game.levelGold;
		
		game.goldInfo = {};
		game.goldInfo.sprite = ph.add.sprite(10, 10, "gold");
		game.goldInfo.sprite.animations.add(0);
		game.goldInfo.sprite.animations.play(0, 14, true);
		game.goldInfo.sprite.fixedToCamera = true;
		game.goldInfo.sprite.scale.setTo(0.65);
		game.goldInfo.text = ph.add.text(54, 14, "?", {font: "bold 18pt Arial", fill: "white"});
		game.goldInfo.text.setShadow(1, 1, "black");
		game.goldInfo.text.fixedToCamera = true;
		game.goldInfo.update = function() {
			game.goldInfo.text.setText(game.goldGained + " / " + game.levelGold);
		}; game.goldInfo.update();
		
		game.levelText = ph.add.text(ph.canvas.width/2, 14, "Level " + game.level, {font: "bold 18pt Arial", fill: "white"});
		game.levelText.fixedToCamera = true;
		game.levelText.anchor.setTo(0.5, 0);
		game.levelText.setShadow(1, 1, "black");
		
		game.exitDiv = $("<div>").css({
			position: "absolute",
			right: "1.8%", bottom: "2.5%",
			width: "5%", height: "10%"
		}).prop("title", "Exit").appendTo(htmlbox)[0];
		var exit_btn = $("<button>").css({
			backgroundImage: "url(" + GRAPHICS_ROOT + "/exit.png",
			backgroundSize: "100% 100%",
			width: "100%", height: "100%"
		}).on("click", function() {
			menu.start(function() {menu.BK.start("episodes");});
		}).appendTo(game.exitDiv);
		
		game.sounds = {};
		
		game.music = ph.add.audio("game-music", 1, true);
		game.music.play();
		if (game.startCB !== undefined) {game.startCB(); delete game.startCB;}
		ph.time.advancedTiming = true;
		ph.time.desiredFps = FPS;
	},
	update: function() {
		var ms = ph.time.physicsElapsedMS;
		for (var i=0; i<game.rooms.length; i++) {
			game.rooms[i].Update(ms);
		}
		//for (var i=0; i<game.units.length; i++) {
		//	game.units[i].update();
		//}
		game.onUpdate.dispatch();
		boot.resizeCanvas();
	},
	render: function() {
		// if i dont put these it lags like hell
		game.lighter.Clear();
		game.lighter.End();
		if (!OFFICIAL) {
			try {
				//ph.debug.text("Aiming FPS: " + ph.time.desiredFps, 5, 65);
				//ph.debug.text("FPS: " + ph.time.fps + ", Max: " + ph.time.fpsMax, 5, 85);
				//ph.debug.text("Mouse (Room): " + (parseInt(ph.input.worldX)-game.me.room.x)+" | "+(parseInt(ph.input.worldY)-game.me.room.y), 5, 105);
				//ph.debug.text("Me: (Room): " + (parseInt(game.me.sprite.x)-game.me.room.x)+" | "+(parseInt(game.me.sprite.y)-game.me.room.y), 5, 125);
				//ph.debug.text(game.log, 5, 145);
				//game.onRender.dispatch();
			} catch(e) {console.log(e);}
			for (var i=0; i<game.rooms.length; i++) {
				game.rooms[i].Render();
			}
			ph.debug.text("World XY: " + (ph.input.worldX) + " " + (ph.input.worldY), 50, 50);
		}
	},
	shutdown: function() {
		game.speaker.destroy();
		game.exitDiv.parentNode.removeChild(game.exitDiv);
		game.input.Destroy();
		game.music.destroy();
	}
}












game.createGate150 = function(x, y) {
	var gate = {};
	gate.sprite = ph.add.sprite(x, y, "gate150_closed");
	ph.physics.arcade.enable(gate.sprite);
	gate.sprite.body.immovable = true;
	gate.sprite.body.setSize(50, 150);
	gate.updateCB = function() {
		ph.physics.arcade.collide(game.me.sprite, gate.sprite);
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

// teleport. x and y are word coords (not room). use room.x+x as parameter
game.tp = function(object, room, x, y) {
	object.SetPosition(x, y);
	if (room != null) {
		object.room.RemoveUnit(object);
		room.units.push(object);
		object.room = room;
	} else throw "teleporting to null room"
}
game.Victory = function() {
	//var json = JSON.parse(localStorage.data);
	//if (game.level > json.profiles[boot.profile].episodes[game.episode].levelWon) {
	//	json.profiles[boot.profile].episodes[game.episode].levelWon = game.level;
	//}
	//localStorage.data = JSON.stringify(json);
	var episodeData = boot.profileMemoryData.episodes[game.episode];
	var levelData = episodeData.levels[game.level];
	levelData.completed = true;
	levelData.gold = game.goldGained;
	// artifacts gained have their flag set to true in memory
	for (var i=0; i<game.artifactsGained.length; i++) {
		var artifactName = game.artifactsGained[i];
		episodeData.artifacts[artifactName] = true;
	}
	memory.Save();
	victory.start(); // victory uses game data
	//boot.menu.runProfile(boot.profile);
}
game.defeat = function() {
	game.start(game.episode, game.level);
}
game.CreateCoin = function(room, x, y) {
	if (Array.isArray(x)) { // game.CreateCoin(room, [{x:, y:}, {x:, y:}])
		var coins = x; // coins = [{x,y}, {x,y}]
		for (var i=0; i<coins.length; i++) {game.CreateCoin(room, coins[i]);}
	} else if (typeof x === 'object') { // game.CreateCoin(room, {x:, y:})
		var coin = x;
		game.CreateCoin(room, coin.x, coin.y);
	} else { // game.CreateCoin(x, y)
		var coin = new game.Coin();
		coin.SetPosition(x, y);
		room.coins.push(coin);
		game.levelGold += 1;
		return coin;
	}
}
game.SetWorld = function(sizeX, sizeY) {
	ph.world.setBounds(0, 0, sizeX, sizeY);
}
game.CreateRoom = function(x, y) {
	var room = new game.Room(x, y);
	game.rooms.push(room);
	return room;
}
game.CreateHero = function(room, x, y, direction) {
	var hero = new game.HeroUnit();
	hero.room = room;
	hero.SetPosition(x, y);
	ph.camera.follow(hero.GetBodySprite());
	//console.log("hero pos", hero.pointSprite.x, hero.pointSprite.y);
	hero.onDeath.add(function() {
		game.defeat();
	});
	hero.onUpdate.add(function() {
		if (hero.y > Y_TO_DIE) {
			hero.Die();
		}
	});
	room.units.push(hero);
	game.me = hero; // used for input (check if hero is null)
	return hero;
}
game.CreateTile = function(room, x, y, w, h, texture) {
	var wall = new game.Wall(x, y, w, h, texture);
	wall.room = room;
	room.walls.push(wall);
	return wall;
}
game.CreateWall = function(room, x, y, w, h, texture) {
	var wall = new game.Wall(x, y, w, h, texture);
	wall.room = room;
	wall.EnableCollider();
	room.walls.push(wall);
	return wall;
}