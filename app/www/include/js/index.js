

const OFFICIAL = true;
const FAST_LOADING = false;
const LOAD_CINEMATIC = true;
const GRAVITY = 1650;
const JUMP_SPEED = 600;
const Y_TO_DIE = 2000;
const MENU_MUSIC = true;
const GOD_MODE = true;
const WIDTH = 800;//nw.Window.get().window.innerWidth;
const HEIGHT = 600; //nw.Window.get().window.innerHeight;
const FPS = 60;
const GRAPHICS_ROOT = "include/graphics";
const AUDIO_ROOT = "include/audio";

let win = new FlexibleWindow(null, 800, 600);
var gamebox = $("<div>").prop("id", "gamebox").appendTo(win.element).css({
	position: "absolute",
	left: "0%", top: "0%", width: "100%", height: "100%"
})[0];
var htmlbox = $("<div>").prop("id", "htmlbox").appendTo(win.element).css({
	position: "absolute",
	left: "0%", top: "0%", width: "100%", height: "100%"
})[0];


function exit() {
	console.log("Exiting.. Electron??");	
}




var ph = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, gamebox);
ph.state.add("boot", boot.state);
ph.state.add("loading", loading.state);
ph.state.add("cinematic", cinematic.state);
ph.state.add("menu", menu.state);
ph.state.add("game", game.state);
ph.state.add("victory", victory.state);






var memory = new JSONMemory("demonhunt_data");
//memory.logEnabled = true;
var memoryStruct_level 		= function() {return {completed: false, gold: 0, goldMax: 0};};
var memoryStruct_profile	= function() {
	return {
			episodes: {
			"1": {
				levels: {
					"1": memoryStruct_level(),
					"2": memoryStruct_level(),
					"3": memoryStruct_level(),
					"4": memoryStruct_level(),
					"5": memoryStruct_level()
				},
				artifacts: {
					"Mask of the Demon Hunter": false
				}
			},
			"2": {
				levels: {
					"1": memoryStruct_level(),
					"2": memoryStruct_level(),
					"3": memoryStruct_level(),
					"4": memoryStruct_level(),
					"5": memoryStruct_level(),
					"6": memoryStruct_level()
				},
				artifacts: {
					metallion: false,
					blade_of_souls: false,
					diamond: false
				}
			}
		}
	};
}
memory.Init({
	profiles: {
		"Default Player": memoryStruct_profile()
	}, options: {}
});
//memory.Report();










//function go() {
//	menu.callback = function() {
//		menu.BK.start("profiles"); // OFFICIAL
//		boot.SetProfile("Default Player");
//		//menu.StartPage_levels(1); // (episodeKey)
//		boot.StartLevel(1, 1);
//		//victory.start();
//	};
//}



//function official() {
//	menu.callback = function() {
//		menu.BK.start("main");
//	};
//}
//boot.SetProfile("Default Player");
//boot.StartLevel(1, 2);
//if (OFFICIAL) {
//	official();
//} else {
//	official();
//}

//loading.callback = function() {menu.start();};

ph.state.start("boot");

var purgeButton = $("<button>").html("Purge Memory").click(function() {
	memory.Purge();
}).appendTo(document.body);