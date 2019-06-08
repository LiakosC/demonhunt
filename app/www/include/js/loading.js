var loading = {};

loading.callback = function() {};

loading.start = function() {
	ph.state.start("loading");
};

loading.state = {
	preload: function() {
		console.log("loading preload()");
		loading.epicLoading = new EpicLoading(htmlbox);
		$(loading.epicLoading.element).css({
			position: "absolute",
			//backgroundColor: "white",
			left: "0%", top: "0%", width: "100%", height: "100%",
			pointerEvents: "auto"
		});
		loading.epicLoading.title.innerHTML = "Demon Hunt";
		loading.epicLoading.subtitle.innerHTML = "LiakosC";
		loading.epicLoading.overbar.innerHTML = "Loading...";
		loading.epicLoading.underbar.innerHTML = "The nightmare begins..";
		
		ph.load.onFileComplete.add(function() {
			loading.epicLoading.setProgress(ph.load.progress / 100);
			//console.log("load", ph.load.progress / 1);
		});
		
		/* CINEMATIC */
		if (OFFICIAL || LOAD_CINEMATIC) {
			ph.load.image("cinematic_0", "include/graphics/cinematic/0.png");
			ph.load.image("cinematic_1", "include/graphics/cinematic/1.png");
			ph.load.image("cinematic_2", "include/graphics/cinematic/2.png");
			ph.load.image("cinematic_3", "include/graphics/cinematic/3.png");
			ph.load.image("cinematic_4", "include/graphics/cinematic/4.png");
			ph.load.image("cinematic_5", "include/graphics/cinematic/5.png");
			ph.load.image("cinematic_6", "include/graphics/cinematic/6.png");
		}
		
		ph.load.image("menu-image", "include/graphics/menu-image.png");
		ph.load.audio("menu-music", 'include/sp/music/menu.ogg');
		ph.load.audio("button-hover", 'include/sp/gui/foup.wav');
		
		/* GAME */
		game.preload();
	},
	create: function() {
		if (OFFICIAL || !FAST_LOADING) {
			$(loading.epicLoading.element).css({cursor: "pointer"});
			$(loading.epicLoading.element).find("*").css({cursor: "pointer"});
			loading.epicLoading.overbar.innerHTML = "Loading Completed!";
			loading.epicLoading.element.addEventListener("mousedown", function() {
				if (OFFICIAL)
					cinematic.start();
				else
					loading.callback();
			});
		} else {
			loading.callback();
		}
	},
	update: function() {
		boot.resizeCanvas();
	},
	shutdown: function() {
		loading.epicLoading.destroy();
	}
};