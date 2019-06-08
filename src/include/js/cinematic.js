var cinematic = {};
cinematic.start = function() {
	ph.state.start("cinematic");
}

cinematic.skip = function() { // go to menu unless skipCB specified
	menu.start(function() {
		menu.BK.start("main");
	})
}

cinematic.state = {
	create: function() {
		var skip = function() {
			cinematic.skip();
		}
		
		cinematic.keys = {};
		cinematic.keys.esc = ph.input.keyboard.addKey(Phaser.Keyboard.ESC);
		cinematic.keys.enter = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		cinematic.keys.space = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		cinematic.keys.esc.onDown.add(function() {skip();});
		cinematic.keys.enter.onDown.add(function() {skip();});
		cinematic.keys.space.onDown.add(function() {skip();});
		
		cinematic.background = ph.add.sprite(0, 0, "cinematic_0");
		cinematic.image = ph.add.sprite(0, 0, "cinematic_1");
		cinematic.image.alpha = 0;
		var tween;
		ph.time.events.add(500, function() {
			tween = ph.add.tween(cinematic.image).to({alpha: 1}, 2000, null, true);
			tween.onComplete.addOnce(function() {
				ph.tweens.remove(tween);
				tween = ph.add.tween(cinematic.image).to({alpha: 0}, 2000, null, true);
				tween.onComplete.addOnce(function() {
					cinematic.image.loadTexture("cinematic_2");
					ph.tweens.remove(tween);
					tween = ph.add.tween(cinematic.image).to({alpha: 1}, 2000, null, true);
					tween.onComplete.addOnce(function() {
						ph.tweens.remove(tween);
						tween = ph.add.tween(cinematic.image).to({alpha: 0}, 2000, null, true);
						tween.onComplete.add(function() {
							cinematic.image.loadTexture("cinematic_3");
							ph.tweens.remove(tween);
							tween = ph.add.tween(cinematic.image).to({alpha:1}, 2000, null, true);
							tween.onComplete.addOnce(function() {
								ph.tweens.remove(tween);
								tween = ph.add.tween(cinematic.image).to({alpha: 0}, 2000, null, true);
								tween.onComplete.add(function() {
									cinematic.image.loadTexture("cinematic_4");
									ph.tweens.remove(tween);
									tween = ph.add.tween(cinematic.image).to({alpha:1}, 2000, null, true);
									tween.onComplete.addOnce(function() {
										ph.tweens.remove(tween);
										tween = ph.add.tween(cinematic.image).to({alpha: 0}, 2000, null, true);
										tween.onComplete.add(function() {
											cinematic.image.loadTexture("cinematic_5");
											ph.tweens.remove(tween);
											tween = ph.add.tween(cinematic.image).to({alpha:1}, 2000, null, true);
											tween.onComplete.addOnce(function() {
												ph.tweens.remove(tween);
												tween = ph.add.tween(cinematic.image).to({alpha: 0}, 2000, null, true);
												tween.onComplete.add(function() {
													cinematic.image.loadTexture("cinematic_6");
													ph.tweens.remove(tween);
													tween = ph.add.tween(cinematic.image).to({alpha:1}, 2000, null, true);
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	},
	render: function() {
		ph.debug.text("ESC / Enter / Spacebar to exit cinematic", 5, 15);
	}
};
