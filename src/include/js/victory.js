var victory = {};
victory.start = function() { // using game data
	ph.state.start("victory");
}
victory.state = {
	create: function() {
		var s = ph.add.sprite(0, 0, "victory-image");
		s.scale.setTo(0.5979);
		
		victory.box = $("<div>").addClass("victoryBox").appendTo(htmlbox)[0];
		var innerBox  = $("<div>").addClass("box").appendTo(victory.box)[0];
		
		for (var maxLevel in boot.episodes[game.episode].levels) {} // get maxLevel of episode


		var caption, btnInner, upButtonCallback;
		if (game.level < maxLevel) {
			caption = "Level "+game.level+" Completed!";
			btnInner = "Continue";
			var upButtonCallback = function() {
				victory.goto_nextLevel();
			}
		} else {
			caption = "Level "+game.level+" Completed!";//</br>Episode "+game.episode+" Completed!";
			btnInner = "To Main Menu";
			var upButtonCallback = function() {
				menu.start(function() {menu.StartPage_levels(game.episode);});
			}
		}
		
		// create the title caption
		var title = $("<div>").addClass("title").html(caption).appendTo(innerBox)[0];
		
		// gold image and info
		var goldImage = $("<img>").attr("src", "include/graphics/gold.png").addClass("goldImage").appendTo(innerBox)[0];
		var goldInfo = $("<div>").addClass("goldInfo").html(game.goldGained + ' / ' + game.levelGold).appendTo(innerBox)[0];
		
		// up button
		var upButton = $("<button>").addClass("menu-button").html(btnInner).click(function() {
			upButtonCallback();
		}).appendTo(innerBox)[0];

		var downButton = $("<button>").addClass("menu-button").html("Main Menu").click(function() {
			menu.start(function() {menu.StartPage_levels(game.episode);});
		}).appendTo(innerBox)[0];
		
		victory.music = ph.add.audio("victory-music");
		victory.music.play();
	},
	update: function() {
		boot.resizeCanvas();
	},
	shutdown: function() {
		victory.box.parentNode.removeChild(victory.box);
		victory.music.destroy();
	}
};
victory.goto_nextLevel = function() {
	//menu.runGame(game.episode, game.level + 1);
	console.log("goto_nextLevel", game.episode, game.level+1);
	//boot.episodes[game.episode].levels[game.level].init();
	game.start(game.episode, game.level + 1);
}
victory.goto_mainMenu = function() {
	menu.start(function() {menu.BK.start("episodes");});
}
