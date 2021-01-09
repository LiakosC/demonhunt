var menu = {};
menu.callback = function() {};
menu.start = function(cb) {
	ph.state.start("menu");
	if (cb != null) menu.callback = cb;
}
menu.state = {
	create: function() {
		//boot.createKeys();
		ph.add.sprite(0, 0, "menu-image");
		menu.buttonHoverSound = ph.add.audio("button-hover");
		if (MENU_MUSIC) {
			menu.music = ph.add.audio("menu-music", 1, true);
			menu.music.play();
		}
		
		menu.box = $("<div>").addClass("menuBox").appendTo(htmlbox)[0];
		//menu.box.innerHTML = '<div id="innerDiv"></div>';
		
		menu.BK = new Book();
		menu.BK.pageStart("main", function() {
			console.log("book main");
			$(menu.box).addClass("main").html('\
				<button>Profiles</button>\
				<button>Options</button>\
				<button>Cinematic</button>\
				<button>Exit</button>\
			');
			$(menu.box).find("button").eq(0).on("click", function() {menu.BK.start("profiles");});
			$(menu.box).find("button").eq(1).on("click", function() {menu.BK.start("options");});
			$(menu.box).find("button").eq(2).on("click", function() {cinematic.start();});
			$(menu.box).find("button").eq(3).on("click", function() {exit();});
			$(menu.box).find("button").on("mouseover", function() {menu.buttonHoverSound.play();});
			menu.BK.pageEnd("main", function() {
				$(menu.box).removeClass("main").html('');
			});
		});
		
		// PROFILES
		menu.BK.pageStart("profiles", function() {
			$(menu.box).addClass("profiles").html('\
			<div class="list">\
				<div></div>\
			</div>\
			<div class="buttons">\
				<div>\
					<button>Load</button>\
					<button disabled>New</button>\
					<button disabled>Delete</button>\
				</div>\
			</div>\
			<div class="back">\
				<button>Back</button>\
			</div>\
			');
			var list = $(menu.box).find(".list > div")[0];
			var insertProfile = function(name) {
				var prof = $("<div>").addClass("profile").html(name).on("mousedown", function() {
					var profiles = list.querySelectorAll(".profile");
					for (var i=0; i<profiles.length; i++) {
						profiles[i].classList.remove("selected");
					}
					prof.classList.add("selected");
				}).appendTo(list)[0];
			}
			for (var profileName in memory.data.profiles) {
				insertProfile(profileName);
				//console.log(prof);
			}
			
			// Load button
			$(menu.box).find(".buttons button").eq(0).on("click", function() {
				var selected = list.querySelector(".selected");
				if (selected != null) {
					var profileName = selected.innerHTML;
					boot.SetProfile(profileName);
					//memory.profile = profileName;
					console.log("Profile selected: ", boot.profileMemoryData);
					menu.BK.start("episodes");
				}
			});
			$(menu.box).find(".back button").on("click", function() {menu.BK.start("main");});
			menu.BK.pageEnd("profiles", function() {
				$(menu.box).removeClass("profiles").html('');
			});
		});
		
		menu.BK.pageStart("options", function() {
			$(menu.box).addClass("options").html('\
				<div>\
					Try to collect everything. Find the special item.\
				</div></br>\
				<div>\
					Movement: A / D</br>\
					Attack: Left / Right</br>\
					Jump: W</br>Action: Spacebar</br>\
					Speak: Enter\
				</div>\
				<div class="back"><button>Back</button></div>\
			');
			$(menu.box).find("button").eq(0).on("click", function() {menu.BK.start("main");});
			$(menu.box).find("button").on("mouseover", function() {menu.buttonHoverSound.play();});
			menu.BK.pageEnd("options", function() {
				$(menu.box).removeClass("options").html('');
			});
		});
		

		// EPISODES
		var choose_episode = -1;
		menu.BK.pageStart("episodes", function() {
			// before it starts, the profile data must be saved in boot.profileMemoryData (string). boot.SetProfile(profileName)
			$(menu.box).addClass("episodes").html('\
				<div><button>Trapped in Darkness</button></div>\
				<div><button disabled="true">Blade of Souls</button></div>\
				<div><button disabled="true">Archangel Betrayal</button></div>\
				<div><button disabled="true">Apocalypse of the One</button></div>\
				<div class="back"><button>Back</button></div>\
			');
			$(menu.box).find("button").eq(0).on("click", function() { // ep 1
				menu.StartPage_levels(1);
			});
			$(menu.box).find("button").eq(-1).on("click", function() { // back
				menu.BK.start("profiles");
			});
			menu.BK.pageEnd("episodes", function() {
				$(menu.box).removeClass("episodes").html('');
			});
		});
		
		menu.BK.pageStart("levels", function() {
			// befure it starts, var choose_episode is edited (first is 1)
			// knows about choose_episode
			$(menu.box).addClass("levels").html('\
				<div class="choosealevel">\
					<div class="artifacts"></div>\
					<div class="levels"></div>\
				</div>\
				<div class="back"><button>Back</button></div>\
			');
			$(menu.box).find("button").eq(-1).on("click", function() {menu.BK.start("episodes");});
			
			var choose_episode = menu.chosenEpisode;
			var profileData = boot.profileMemoryData;
			var episodeData = profileData.episodes[choose_episode]; // episode
			
			/* artifacts div */
			
			var ar_box = $(menu.box).find(".choosealevel .artifacts")[0];
			var ar_count = 0; for (var artifactKey in episodeData["artifacts"]) {ar_count++;}
			//console.log("artifacts count", ar_count);
			var dx = ar_box.offsetWidth / (ar_count + 1);
			var h = ar_box.offsetHeight;
			var innerH = h * 0.9;
			var y = (h - innerH) / 2;
			var top = y;
			var size = innerH;
			console.log(episodeData);
			var artifactsScan_i = 0;
			for (var artifactName in episodeData.artifacts) {
			//for (var i=0; i<episodeData.artifacts.length; i++) {
				console.log("artifactName", artifactName);
				if (episodeData.artifacts[artifactName] == true) {
					var file = artifactName;
				} else {
					var file = "unknown";
				}
				var left = dx*(artifactsScan_i+1) - size/2;
				//console.log(left, top, dx);
				var div = $("<div>").addClass("artifact").css({
					position:"absolute",
					left: left/ar_box.offsetWidth*100+"%",
					top: top/ar_box.offsetHeight*100+"%",
					width: size/ar_box.offsetWidth*100+"%",
					height: size/ar_box.offsetHeight*100+"%",
					background: "1cyan"
				}).appendTo(ar_box)[0];
				var img = document.createElement("img");
				img.FUCK_artifactName = file;
				img.src = GRAPHICS_ROOT+'/artifacts/'+file+'.png';
				var artifactMouse = function(img, name) {
					img.addEventListener("mouseover", function() {
						var info = $(menu.box).find(".choosealevel .artifact_info").show()[0];
						info.innerHTML = name; // artifact name
					});
					img.addEventListener("mouseout", function() {
						var info = $(menu.box).find(".choosealevel .artifact_info").hide()[0];
					});
				}
				if (episodeData.artifacts[artifactName] == true) {
					img.classList.add("taken");
					artifactMouse(img, artifactName);
				}
				div.appendChild(img);
				//html_artifacts += '<td><img src="'+GRAPHICS_ROOT+'/artifacts/'+file+'.png"/></td>';
				//console.log(ar);
				artifactsScan_i++;
			}
			//html_artifacts += '</tr></table>';
			//$(menu.box).find(".choosealevel .artifacts")[0].innerHTML = html_artifacts;
			
			/* levels buttons div */
			
			var levelsCount;
			for (var levelKey in episodeData.levels) {levelsCount++;}
			
			// Grid IDEA!!!
			var createLevelButton = function(parent, levelKey) {
				var parentWidth = parent.offsetWidth;
				var parentHeight = parent.offsetHeight;
				var maxCols = 4;
				var size = parentWidth*0.85 / maxCols;
				var space_wall = 10;
				var spaceX = (parent.offsetWidth - size*maxCols - 2*space_wall) / (maxCols-1);
				var spaceY = 10;
				//console.log(parentWidth, parentHeight);
				var n = levelKey - 1;
				var j = parseInt(n/maxCols); // j: [0,1,2..)
				var i = n - j*maxCols;
				var x = space_wall + (spaceX * i) + i*size;
				var y = space_wall + (spaceY * j) + j* size;
				//console.log(levelKey);
				//console.log(n, i, j, x, y);
				
				var btn = $("<button>").html(levelKey).addClass("level").css({
					position: "absolute",
					left: x / parentWidth * 100 + "%",
					top: y / parentHeight * 100 + "%",
					width: size / parentWidth * 100 + "%",
					height: size / parentHeight * 100 + "%",
					margin: "0px",
				})[0];
				
				//position:"absolute",
				//left: left/ar_box.offsetWidth*100+"%",
				//top: top/ar_box.offsetHeight*100+"%",
				//width: size/ar_box.offsetWidth*100+"%",
				//height: size/ar_box.offsetHeight*100+"%",
				//background:"1cyan"
				
				
				var previousLevelData = profileData["episodes"][choose_episode]["levels"][levelKey-1]; // or null
				var currentLevelData = profileData["episodes"][choose_episode]["levels"][levelKey]; // or null

				if (levelKey == 1) {
					btn.disabled = false;
				} else if (levelKey > 1) {
					if (previousLevelData.completed == true)
						btn.disabled = false;
					else if (previousLevelData.completed == false)
						btn.disabled = true;
				}
				
				btn.addEventListener("click", function() {
					menu.runGame(choose_episode, levelKey);
				});
				btn.addEventListener("mouseover", function() {
					if (currentLevelData.completed) {
						var info = $(menu.box).find(".choosealevel .info").show()[0];
						var goldElement = info.querySelector(".text");
						//var goldMax = boot.episodes[choose_episode]["levels"][levelKey].getTotalGold();
						goldMax = boot.profileMemoryData.episodes[choose_episode].levels[levelKey].goldMax;
						goldElement.innerHTML = currentLevelData["gold"] + " / " + goldMax;
					}
				});
				btn.addEventListener("mouseout", function() {
					$(menu.box).find(".choosealevel .info").hide();
				});
				
				parent.appendChild(btn);
				return btn;
			}
			
			var box = $(menu.box).find(".choosealevel .levels")[0];
			for (var levelKey in episodeData.levels) {
				var btn = createLevelButton(box, levelKey);
			}
			
			/* hover */
			var gold = $("<div>").addClass("info").html('\
				<div class="image"><img src="'+GRAPHICS_ROOT+'/gold.png"/></div>\
				<div class="text">0/25</div>\
			').hide().appendTo(box);
			
			var artifact_info = $("<div>").addClass("artifact_info").html('\
				\
			').hide().appendTo(box);
			
			
			
			menu.BK.pageEnd("levels", function() {
				$(menu.box).removeClass("levels").html('');
			});
		});
		
		menu.callback();
	},
	update: function() {
		boot.resizeCanvas();
	},
	shutdown: function() {
		if (menu.music != null) {
			menu.music.destroy();
			menu.music = null;
		}
		menu.BK.end();
		menu.box.parentNode.removeChild(menu.box);
	}
};

menu.StartPage_levels = function(episodeKey) {
	if (episodeKey == undefined) throw "episodeKey " + episodeKey;
	menu.chosenEpisode = 1;
	menu.BK.start("levels");
}

menu.chosenEpisode = 0; // set here before loading the levels page


menu.runGame = function(episode, level) {
	var episode = Number(episode); // somehow something is saved as string
	var level = Number(level);
	game.start(episode, level);
	//console.log(episode, level);
}

