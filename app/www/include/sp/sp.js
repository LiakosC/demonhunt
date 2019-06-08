var sp = {
	Audio: function(howlOptions, maxVolume) {
		Howl.call(this, howlOptions);
		this.maxVolume = maxVolume;
		this.setVolume = function(vol /*0-1*/) {
			if (vol < 0) {vol = 0;} else if (vol > 1) {vol = 1;}
			var volume = vol * this.maxVolume;
			this.volume(volume);
		};
		this.volume(maxVolume);
	},
	AudioGroup: function() {
		this.children = [];
		this.add = function(audio) {
			this.children.push(audio);
		}
		this.remove = function(audio) {
			for (var i=0; i<this.children.length; i++) {
				if (this.children[i] == audio) {
					this.children.splice(i, 1);
					break;
				}
			}
		}
		this.setVolume = function(vol /*0-1*/) {
			for (var i=0; i<this.children.length; i++) {
				this.children[i].setVolume(vol);	
			}
		};
		this.createSound = function(howlOptions, maxVolume) {
			var audio = new sp.Audio(howlOptions, maxVolume);
			this.add(audio);
			return audio;
		};
	}
};
sp.Audio.prototype = Object.create(Howl.prototype);
sp.Audio.prototype.constructor = sp.Audio;



/* SPECIFIC */

sp.ROOT = "include/sp";

sp.effectsGroup = new sp.AudioGroup();
sp.effects = {
		
};

sp.guiGroup = new sp.AudioGroup();
sp.gui = {
	buttonClick: sp.guiGroup.createSound({src: [sp.ROOT + "/gui/toup.ogg"], loop: false}, 1),
	buttonHover: sp.guiGroup.createSound({src: [sp.ROOT + "/gui/foup.wav"], loop: false}, 1)
};


sp.musicGroup = new sp.AudioGroup();
sp.music = {};
sp.music.main = sp.musicGroup.createSound({src: [sp.ROOT + "/music/menu.ogg"], loop: true}, 1);
sp.music.game = sp.musicGroup.createSound({src: [sp.ROOT + "/music/game.ogg"], loop: true}, 1);
sp.music.maskFound = sp.musicGroup.createSound({src: [sp.ROOT + "/music/doom.ogg"], loop: true}, 1);
sp.music.victory = sp.musicGroup.createSound({src: [sp.ROOT + "/music/victory.ogg"], loop: true}, 1);

