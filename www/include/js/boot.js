var boot = {};
boot.keys = {};
boot.createKeys = function() {
	boot.keys.A = ph.input.keyboard.addKey(Phaser.Keyboard.A);
	boot.keys.D = ph.input.keyboard.addKey(Phaser.Keyboard.D);
	boot.keys.S = ph.input.keyboard.addKey(Phaser.Keyboard.S);
	boot.keys.W = ph.input.keyboard.addKey(Phaser.Keyboard.W);
	boot.keys.space = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	boot.keys.enter = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	boot.keys.esc = ph.input.keyboard.addKey(Phaser.Keyboard.ESC);
}
boot.start = function() {
	ph.state.start("boot");
}
boot.resizeCanvas = function() {
	$(ph.canvas).css({position: "absolute", left: "0%", top: "0%", width: "100%", height: "100%"});
}
boot.state = {
	init: function() {
		/* basic template working on electron too */
		window.oncontextmenu = function() {return false;};
		window.addEventListener("keydown", function(e) {
			if (e.key == "F10") {
				win.fullscreen();
			}
		});
		window.addEventListener("resize", function(e) {
			win.setScale(win.getWindowScale());
		});
		win.onFullscreen = function(flag) {
			if (flag) {
				//win.setScale(win.getScreenScale());
				win.setScale(win.getWindowScale());
			} else {
				if (typeof require !== 'undefined') { // electron
					win.setScale(win.getWindowScale());
				} else { // browser
					win.setScale(1);
				}
			}
		};
		/* -------------------------------------- */
		
		//boot.memory.createOptions();
		window.addEventListener("mousemove", function() {
			ph.canvas.parentNode.style.cursor = "default";
			ph.canvas.parentNode.style.cursor = "url('include/images/cursor.png'), auto";
		});
	},
	create: function() {
		ph.stage.disableVisibilityChange = true;
		ph.time.desiredFps = FPS;
		ph.state.start("loading");
	}
};


boot.profileMemoryData = null; // seted in profiles menu page. read only
boot.SetProfile = function(profileName) {
	boot.profileMemoryData = memory.data.profiles[profileName];
}
boot.StartLevel = function(episodeKey, levelKey) {
	game.start(episodeKey, levelKey);
}