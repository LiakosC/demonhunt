"use strict";

boot.episodes = {
	"1": {
		name: "Trapped in Darkness", // not used
		artifacts: ["Mask of the Demon Hunter", "a"],
		levels: {
			"1": new game.Level(),
			"2": new game.Level(),
			"3": new game.Level(),
			"4": new game.Level(),
			"5": new game.Level()
		}
	}
};

var level;
level = boot.episodes[1].levels[1];
level.init = function() { // after (or before?) game.create()
	console.log("Initing levels[1]");
	//return 0;

	// set world
	game.SetWorld(12500, 5500);
	
	// create room
	var r0 = game.CreateRoom(50, 50); // creates new Room() and pushes to game.rooms[]
	
	r0.CreateHero(650, 850, 1); // x, y, direction

	// ceiling	
	r0.CreateWall(500, 500, 290, 50, "empty");
	r0.CreateWall(850, 500, 250, 50, "empty");
	r0.CreateTile(500, 500, 600, 50, "brick-wall");
	r0.CreateWall(500, 550, 50, 100, "brick-wall");
	r0.CreateWall(1050, 550, 50, 100, "brick-wall");
	
	// floor
	r0.CreateWall(500, 950, 600, 50, "brick-wall");
	r0.CreateWall(500, 900, 50, 50, "brick-wall");
	r0.CreateWall(1050, 900, 50, 50, "brick-wall");
	
	r0.CreateExitDoor(1000, 900); // top-left 50 50
	//game.CreateCoin(r0, [{x:525,y:775}, {x:525,y:810}, {x:525,y:845}, {x:575, y:925}]);
	r0.CreateManyCoins([{x:525,y:775}, {x:525,y:810}, {x:525,y:845}, {x:575, y:925}]);
	
	//game.victory();
	
	/* OLD BUILD - never delete */
	//celling
	
	
	r0.CreateWall(1500, 2500, 2450, 25, "brick-wall");
	r0.CreateWall(3950, 2350, 50, 50, "brick-wall");
	r0.CreateWall(3900, 2400, 50, 100, "brick-wall");
	
	r0.CreateWall(3800, 2150, 50, 50, "brick-wall");
	r0.CreateWall(3700, 2200, 150, 50, "brick-wall");
	var mw = r0.CreateWall(3700, 2250, 50, 50, "brick-wall"); // moving wall, entrance to ROOM
	mw.MovingWall(r0.G2Rect(3775, 2275, 25, 25), 6000, {x:r0.x+3400});
	mw.onMove.add(function() {roomFog.reveal();});
	r0.CreateWall(3700, 2300, 200, 50, "brick-wall");
	r0.CreateWall(3900, 2200, 50, 50, "brick-wall");
	r0.CreateWall(4000, 2150, 50, 50, "brick-wall");
	r0.CreateWall(4000, 2200, 150, 50, "brick-wall");
	r0.CreateWall(4100, 2250, 50, 50, "brick-wall");
	r0.CreateWall(3950, 2300, 200, 50, "brick-wall");
	
	// COLUMN
	r0.CreateWall(3800, 950, 50, 1200, "stone-wall"); // left column
	r0.CreateWall(4000, 950, 50, 1200, "stone-wall"); // right column
	r0.CreateWall(3900, 1000, 50, 50, "stone-wall");
	r0.CreateWall(3900, 1200, 50, 50, "stone-wall");
	r0.CreateWall(3900, 1400, 50, 50, "stone-wall");
	r0.CreateWall(3900, 1600, 50, 50, "stone-wall");
	r0.CreateWall(3900, 1800, 50, 50, "stone-wall");
	r0.CreateWall(3900, 2000, 50, 50, "stone-wall");
	r0.CreateWall(3850, 1100, 50, 50, "stone-wall"); r0.CreateWall(3950, 1100, 50, 50, "stone-wall");
	r0.CreateWall(3850, 1300, 50, 50, "stone-wall"); r0.CreateWall(3950, 1300, 50, 50, "stone-wall");
	r0.CreateWall(3850, 1500, 50, 50, "stone-wall"); r0.CreateWall(3950, 1500, 50, 50, "stone-wall");
	r0.CreateWall(3850, 1700, 50, 50, "stone-wall"); r0.CreateWall(3950, 1700, 50, 50, "stone-wall");
	r0.CreateWall(3850, 1900, 50, 50, "stone-wall"); r0.CreateWall(3950, 1900, 50, 50, "stone-wall");
	r0.CreateWall(3850, 2100, 50, 50, "stone-wall"); r0.CreateWall(3950, 2100, 50, 50, "stone-wall");
	// head
	r0.CreateWall(3700, 700, 450, 50, "stone-wall");
	r0.CreateWall(3700, 750, 50, 150, "stone-wall"); r0.CreateWall(4100, 750, 50, 150, "stone-wall");
	r0.CreateWall(3700, 900, 150, 50, "stone-wall"); r0.CreateWall(4000, 900, 150, 50, "stone-wall");
	
	// ROOM
	var roomFog = r0.CreateFog(2700, 1850, 1000, 500);
	r0.CreateWall(2700, 1850, 850, 50, "brick-wall");
	r0.CreateWall(2700, 1900, 50, 300, "brick-wall");
	r0.CreateWall(3500, 1900, 50, 300, "brick-wall");
	r0.CreateWall(3500, 2200, 200, 50, "brick-wall");
	r0.CreateWall(2600, 2300, 1100, 50, "brick-wall");
	r0.CreateWall(3100, 2100, 50, 50, "brick-wall");
	r0.CreateDoor(3100, 2050, "red-door", r0, 725, 325);
	// cave
	var caveFog = r0.CreateFog(2600, 2150, 100, 200);
	r0.CreateWall(2600, 2150, 100, 50, "brick-wall");
	r0.CreateWall(2600, 2200, 50, 50, "brick-wall");
	r0.CreateWall(2700, 2250, 50, 50, "brick-wall").MovingWall(r0.G2Rect(2775, 2275, 0, 0), 1500, {x:r0.x+2600}, function() {
		caveFog.reveal();
	}); // bottom secret
	r0.CreateWall(2700, 2200, 50, 50, "brick-wall").MovingWall(r0.G2Rect(2675, 2225, 0, 0), 2500, {x:r0.x+3000}); // upper secret
	
	// FINAL
	//frame
	r0.CreateWall(500, -50, 50, 250, "brick-wall");
	r0.CreateWall(500, 200, 150, 50, "brick-wall");
	r0.CreateWall(650, 250, 50, 100, "brick-wall");
	r0.CreateWall(650, 350, 100, 50, "brick-wall");
	r0.CreateWall(800, 350, 450, 50, "brick-wall");
	r0.CreateWall(1200, 100, 50, 250, "brick-wall");
	//inner
	r0.CreateWall(600, 50, 50, 50, "brick-wall"); r0.CreateWall(800, 50, 50, 50, "brick-wall");
	r0.CreateWall(700, -50, 50, 50, "brick-wall"); r0.CreateWall(700, 150, 50, 50, "brick-wall");
	r0.CreateWall(750, 250, 50, 50, "brick-wall");
	r0.CreateWall(950, 0, 50, 50, "brick-wall");
	r0.CreateWall(900, 150, 200, 50, "brick-wall");
	r0.CreateWall(1100, 200, 100, 50, "brick-wall");
	var gate = r0.CreateGate150(900, 200);
	var mask = r0.CreateArtifact(1038, 250, "Mask of the Demon Hunter");
	mask.onTake.add(function() {
		game.music.stop();
		game.music = ph.add.audio("doom", 1, true);
		game.music.play();
	});
	game.speaker.onSpeak.add(function() {
		if (game.speaker.lastTalk == "hello") {
			if (g2.RectOverRect(game.me.G2Rect(), r0.G2Rect(1150, 150, 50, 50))) {
				gate.toggle();
			}
		}
	});
	r0.onUpdate.add(function() {
		if (g2.RectOverRect(game.me.G2Rect(), r0.G2Rect(1150, 150, 50, 50))) {
			moon.alpha = 1;
		} else {
			moon.alpha = 0;
		}
	});
	var moon = r0.CreateSprite(1450, 0, "moon");
	moon.alpha = 0;
	//*/
};

boot.episodes[1].levels[2].init = function() {
	console.log("Initing levels[2]");
	//ph.world.setBounds(-500, 0, 3000, 2000);
	game.SetWorld(3000, 2000);
	var r0 = game.CreateRoom(0, 0);
	r0.CreateHero(650, 800);
	r0.CreateWall(500, 500, 50, 400, "brick-wall");
	r0.CreateWall(550, 850, 250, 50, "brick-wall");
	r0.CreateWall(975, 850, 325, 50, "brick-wall");
	
	
	r0.CreateWall(1150, 750, 50, 100, "brick-wall");
	r0.CreateWall(1200, 650, 50, 100, "brick-wall");
	r0.CreateWall(1250, 750, 50, 100, "brick-wall");
	r0.CreateWall(1250, 500, 50, 150, "brick-wall");
	
	// 2 hops
	r0.CreateWall(1050, 550, 50, 50, "brick-wall");
	r0.CreateWall(1050, 400, 50, 50, "brick-wall");
	r0.CreateWall(1100, 400, 25, 10, "brick-wall"); // 3rd slim
	
	r0.CreateWall(900, 450, 150, 50, "brick-wall");
	r0.CreateWall(850, 500, 50, 50, "brick-wall");
	r0.CreateWall(800, 550, 50, 50, "brick-wall");
	r0.CreateWall(750, 450, 50, 50, "brick-wall");
	r0.CreateWall(550, 650, 200, 50, "brick-wall");
	/**/
	
	r0.CreateExitDoor(600, 600);

	// leap
	//game.CreateCoin(r0, [{x:775, y:825}, {x:825, y:760}, {x:875, y:725}, {x:925, y:760}, {x:975, y:825}]);
	r0.CreateManyCoins([{x:775, y:825}, {x:825, y:760}, {x:875, y:725}, {x:925, y:760}, {x:975, y:825}]);
	game.CreateCoin(r0, [{x:925, y:625}, {x:975, y:575}]);
	game.CreateCoin(r0, 1025, 250);
	game.CreateCoin(r0, [{x:875, y:475}, {x:825, y:525}]);
	game.CreateCoin(r0, 1325, 375);
	// exit
	game.CreateCoin(r0, 450, 400);
};

boot.episodes[1].levels[3].init = function() {
	//ph.world.setBounds(0, 0, 5000, 5000);
	game.SetWorld(5000, 5000);
	//ph.camera.bounds = new Phaser.Rectangle(-1500, -1500, 10000, 10000);

	// CreateRoom 0
	var r0 = game.CreateRoom(500, 500);
	r0.name = "Starting Room";

	var hero = r0.CreateHero(75, 50);

	r0.CreateWall(0, 0, 50, 150, "brick-wall");
	r0.CreateWall(0, 150, 150, 50, "brick-wall");
	r0.CreateWall(150, 50, 150, 50, "brick-wall");
	
	// CreateRoom 1
	var r1 = game.CreateRoom(500, 1200);
	//game.tp(hero, r1, r1.x+75, r1.y+200);
	r1.name = "Red Room";
	
	r0.CreateDoor(200, 0, "red-door", r1, 75, 375);
	r1.CreateDoor(50, 350, "red-door", r0, 225, 25);
	
	
	r1.CreateWall(0, 0, 750, 50, "brick-wall"); // hor up
	r1.CreateWall(0, 50, 50, 350, "brick-wall"); // ver left
	r1.CreateWall(0, 400, 400-5, 50, "brick-wall"); // hor 1st floor
	//r1.CreateTile(50, 300, 50, 50, "brick-wall");
	r1.CreateWall(0, 450, 50, 50, "brick-wall"); // single left
	r1.CreateWall(0, 500, 500, 50, "brick-wall"); // hor down floor

	r1.CreateWall(450, 400, 50, 100, "empty"); // wall stick fix
	r1.CreateWall(450, 450, 50, 50, "brick-wall");
	r1.CreateWall(450, 400, 850, 50, "brick-wall");
	r1.CreateWall(1250, 350, 50, 50, "brick-wall");
	r1.CreateWall(600, 300, 700, 50, "brick-wall");
	r1.CreateWall(700, 50, 50, 250, "brick-wall");
	r1.CreateDoor(50, 450, "green-door", r1, 325, 175);
	r1.CreateDoor(300, 150, "green-door", r1, 75, 475);
	//return
	
	r1.CreateManyCoins([{x:275, y:125}, {x:275, y:175}, {x:325, y:125}, {x:375, y:125}, {x:375, y:175}]);
	r1.CreateManyCoins([{x:625, y:225}, {x:675, y:225}, {x:625, y:275}, {x:675, y:275}]);
	
	r1.CreateWall(250, 200, 150, 50, "brick-wall");
	
	r1.CreateExitDoor(750, 350);

	//r1.onRender.add(function() {
	//	ph.debug.text("walls length " + r1.walls.length, 100, 120);
	//})
	
	// CreateRoom 2
	var r2 = game.CreateRoom(1500, 500);
	r2.name = "3rd Room";
	
	r2.CreateWall(0, 0, 450, 50, "brick-wall");
	r2.CreateWall(0, 50, 50, 450, "brick-wall");
	r2.CreateWall(0, 500, 450, 50, "brick-wall");
	r2.CreateWall(400, 50, 50, 450, "brick-wall");
	
	r2.CreateWall(200, 150, 50, 50, "brick-wall");
	r2.CreateWall(350, 200, 50, 50, "brick-wall");
	r2.CreateWall(300, 300, 50, 50, "brick-wall");
	r2.CreateWall(350, 400, 50, 50, "brick-wall");
	
	r2.CreateManyCoins([{x:225, y:475}, {x:275, y:475}, {x:325, y:475}, {x:375, y:475}]);
	r2.CreateManyCoins([{x:375, y:375}, {x:325, y:275}, {x:375, y:175}, {x:225, y:125}]);
	r2.CreateManyCoins([{x:125, y:75}, {x:175, y:75}, {x:125, y:125}, {x:175, y:125}]);
	r2.CreateManyCoins([{x:75, y:225}, {x:75, y:275}, {x:75, y:325}]);
	
	r1.CreateDoor(1200, 350, "purple-door", r2, 125, 475);
	r2.CreateDoor(50, 450, "purple-door", r1, 1175, 375);
	
};

boot.episodes[1].levels[4].init = function() {
	game.SetWorld(15000, 15000);
	var r0 = game.CreateRoom(500, 500);
	r0.CreateHero(75, 225);
	r0.CreateWall(0, 0, 1900, 50, "brick-wall");
	r0.CreateWall(0, 50, 50, 200, "brick-wall");
	r0.CreateWall(1850, 50, 50, 200, "brick-wall");
	r0.CreateWall(0, 250, 1900, 50, "brick-wall");
	
	r0.CreateWall(300, 50, 50, 100, "empty");
	r0.CreateTile(300, 50, 50, 200, "brick-wall");
	r0.CreateManyCoins([{x:75, y:125}, {x:175, y:125}, {x:275, y:125}]);
	var fog = r0.CreateFog(350, 0, 1200, 300);
	
	r0.onUpdate.add(function() {
		if (g2.PointOverRect(g2.P(r0.x+325, r0.y+225), game.me.G2Rect())) {fog.reveal();}
	});
	
	r0.CreateWall(750, 50, 50, 150, "brick-wall");
	var mw = r0.CreateWall(750, 200, 50, 50, "brick-wall");
	mw.MovingWall(r0.G2Rect(700, 200, 50, 50), 3500, {x:r0.x+850, y:r0.y+200});
	r0.CreateManyCoins([{x:1025, y:225}, {x:1075, y:225}, {x:1125, y:225}, {x:1175, y:225}, {x:1225, y:225}]);
	r0.CreateManyCoins([{x:1275, y:225}, {x:1325, y:225}, {x:1375, y:225}, {x:1425, y:225}, {x:1475, y:225}]);
	r0.CreateWall(900, 200, 100, 50, "brick-wall");
	r0.CreateWall(900, 100, 50, 100, "brick-wall");

	var fog2 = r0.CreateFog(800, 0, 1000, 300);
	r0.onUpdate.add(function() {
		if (g2.PointOverRect(g2.P(r0.x+775, r0.y+225), game.me.G2Rect())) {fog2.reveal();}
	});
	
	r0.CreateSprite(1100, 100, "sokail");
	var s = ph.add.sprite(r0.x + 1500, r0.y + 50, "blue-wall");
	s.scale.setTo(0.5);
	//var g = game.CreateGate150(r0.x + 1500, r0.y + 100);
	var g = r0.CreateGate150(1500, 100);
	//g.toggle();
	//g.toggle();
	game.speaker.onSpeak.add(function() {
		//console.log(game.speaker.lastTalk);
		if (game.speaker.lastTalk == "sokail" && g2.RectOverRect(game.me.G2Rect(), g2.Rect_CS(g2.P(r0.x+1350, r0.y+150), g2.P(r0.x+1500, r0.y+250)))) {g.toggle();}
	});
	//game.tp(game.me, r0, r0.x+1700, r0.y+100);
	
	
	r0.CreateWall(1700, 200, 50, 50, "brick-wall");
	r0.CreateManyCoins([{x:1775, y:75}, {x:1825, y:75}, {x:1775, y:125}, {x:1825, y:125}, {x:1775, y:175}, {x:1825, y:175}]);

	r0.CreateExitDoor(1700, 150);
	return;
};

boot.episodes[1].levels[5].init = function() {
	game.SetWorld(10000, 10000);
	//ph.world.setBounds(0, 0, 10000, 10000);
	var r0 = game.CreateRoom(500, 500);
	r0.CreateHero(425, 175);
	r0.CreateWall(350, -250, 750, 50, "brick-wall"); // kapaki
	r0.CreateWall(0, 0, 400, 50, "brick-wall");
	r0.CreateWall(0, 50, 50, 150, "brick-wall");
	r0.CreateWall(350, -200, 50, 200, "brick-wall");
	r0.CreateWall(350, 50, 50, 150, "brick-wall");
	r0.CreateWall(0, 200, 200, 50, "brick-wall");
	r0.CreateWall(200, 250, 50, 50, "brick-wall");
	r0.CreateWall(250, 300, 50, 50, "brick-wall");
	r0.CreateWall(300, 350, 50, 50, "brick-wall");
	r0.CreateWall(350, 400, 50, 50, "brick-wall");
	r0.CreateWall(400, 450, 50, 50, "brick-wall");
	r0.CreateWall(450, 500, 500, 50, "brick-wall");
	r0.CreateWall(900, 350, 50, 150, "brick-wall");
	r0.CreateSprite(75, 100, "hello_the_moon");
	var fog1 = [r0.CreateFog(0, 0, 350, 500), r0.CreateFog(450-200, 250, 200, 500)];
	r0.onUpdate.add(function() {
		if (g2.PointOverRect(g2.P(r0.x+475, r0.y+475), game.me.G2Rect())) {
			fog1[0].reveal();
			fog1[1].reveal();
		}
	});
	r0.CreateManyCoins([{x:75, y:75}, {x:75, y:125}, {x:75, y:175}]); // gold in hello_the_moon
	
	r0.CreateWall(550, -50, 300, 50, "brick-wall");
	
	r0.CreateWall(350, 200, 500, 50, "brick-wall");
	r0.CreateWall(450, 250, 50, 150, "brick-wall");
	r0.CreateWall(500, 400, 350, 50, "brick-wall");
	r0.CreateWall(550, 300, 600, 50, "brick-wall");
	r0.CreateWall(900, 200, 100, 100, "brick-wall");
	r0.CreateWall(1100, 150, 50, 150, "brick-wall");
	r0.CreateManyCoins([{x:675, y:175}, {x:725, y:175}, {x:675, y:275}, {x:725, y:275}, {x:675, y:375}, {x:725, y:375}, {x:675, y:475}, {x:725, y:475}]);
	
	r0.CreateWall(1050, -150, 300, 50, "brick-wall");
	r0.CreateWall(1050, -200, 50, 250, "brick-wall");
	r0.CreateWall(1100, 0, 50, 50, "brick-wall");
	r0.CreateWall(1300, -100, 50, 200, "brick-wall");
	r0.CreateWall(1000, 100, 350, 50, "brick-wall");
	var mw1 = r0.CreateWall(1050, 50, 50, 50, "brick-wall");
	mw1.MovingWall(r0.G2Rect(1000, 50, 50, 50), 3500, {x:r0.x+1250});
	var fog2 = [r0.CreateFog(1100, -150, 250, 250), r0.CreateFog(1150, 100, 200, 50)];
	mw1.onMove.add(function() {
		fog2[0].reveal();
		fog2[1].reveal();
	});
	r0.CreateManyCoins([{x:1225, y:-75}, {x:1275, y:-75}]); // gold in secret
	r0.CreateManyCoins([{x:675, y:-125}, {x:675, y:-75}, {x:725, y:-125}, {x:725, y:-75}, {x:775, y:-125}, {x:775, y:-75}, {x:825, y:-125}, {x:825, y:-75}]); // gold in balcony
	
	var r1 = game.CreateRoom(0, 2000);
	r0.CreateDoor(1050, 250, "purple-door", r1, 75, 425);
	r1.CreateDoor(50, 400, "purple-door", r0, 1075, 275);
	r1.CreateSprite(50, 100, "leap");
	r1.CreateWall(0, 0, 50, 450, "brick-wall");
	r1.CreateWall(0, 450, 550, 50, "brick-wall");
	
	r1.CreateWall(500, 500, 50, 50, "brick-wall");
	r1.CreateWall(500, 550, 250, 50, "brick-wall");
	r1.CreateWall(700, 450, 50, 100, "brick-wall");
	var mw2 = r1.CreateWall(500, 400, 50, 50, "brick-wall");
	mw2.MovingWall(r1.G2Rect(450, 400, 50, 50), 3000, {x:700});
	var fog3 = [r1.CreateFog(550, 400, 200, 200), r1.CreateFog(500, 500, 250, 100)];
	mw2.onMove.add(function() {
		fog3[0].reveal();
		fog3[1].reveal();
	});
	var s = r1.CreateSprite(550, 450, "level_right");
	s.scale.setTo(0.5);
	
	r1.CreateWall(500, 350, 850, 50, "brick-wall");
	r1.CreateWall(1300, -100, 50, 450, "brick-wall");
	r1.CreateSprite(1000, 100, "1");
	r1.CreateExitDoor(1250, 300);
	//r1.CreateSkeleton(700, 200, 1);
	ph.time.events.add(ph.rnd.integerInRange(0, 500), function() {
		r1.CreateSkeleton(700, 250, 1).Patrol(650, 750);
	});
	ph.time.events.add(ph.rnd.integerInRange(0, 500), function() {
		r1.CreateSkeleton(800, 250, 1).Patrol(750, 850);
	});
	ph.time.events.add(ph.rnd.integerInRange(0, 500), function() {
		r1.CreateSkeleton(900, 250, 1).Patrol(850, 950);
	});
	
	var r2 = game.CreateRoom(3000, 500);
	r2.CreateWall(0, 0, 450, 50, "brick-wall");
	r2.CreateWall(0, 300, 450, 50, "brick-wall");
	r2.CreateWall(0, 50, 50, 300, "brick-wall");
	r2.CreateWall(400, 50, 50, 300, "brick-wall");
	r2.CreateSprite(55, 60, "dont_stone");
	r0.CreateDoor(1100, -50, "blue-door", r0, 576, -76);
	r0.CreateDoor(550, -100, "blue-door", r2, 375, 275);
	r2.CreateDoor(350, 250, "blue-door", r0, 1125, -25);

	//game.tp(game.me, r1, r1.x+300, r1.y+400);
};



boot.episodes[2] = {name: "Bones"};
boot.episodes[2].artifacts = [];
boot.episodes[2].levels = {};

boot.episodes[2].levels[1] = {
	init: function() {
		ph.world.setBounds(0, 0, 15000, 5000);
		var r0 = new CreateRoom(500, 500);
		/**/
		//r0.createWallsGrid([ //  7,8,9           15          20
		//	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
		//	[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
		//	[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] // 9
		//]);
		var grid = new Grid(20, 9, 50, 50, [ //  7,8,9           15          20
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
			[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] // 9
		]);
		grid.scan(function(x, y, value) {
			if (value == 1) {
				r0.Wall(x*grid.nodeWidth, y*grid.nodeHeight, grid.nodeWidth, grid.nodeHeight, "blue-wall");
			}
		});
		
		
		r0.Me(75, 375);
		r0.Skeleton(400, 500).patrol(350, 450);
		//r0.Wall(400, 700, 500, 50, "blue-wall");
	}
}
/**/