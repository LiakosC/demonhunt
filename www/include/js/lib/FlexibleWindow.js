/*

28/1/18

var win = new FlexibleWindow(element-or-null, width, height);
all elements inside win.element should have % size / coords if you want them to be scaled up
put phaser canvas inside win.element or another child, and it will be automatically scaled/modified by phaser engine

win.element : the div element

win.fullscreen(); //toggle
win.fullscreen(true); // on
win.fullscreen(false); // off

win.mouseX, win.mouseY | read only. It's the same whatever the scale.

win.xtocX() // px to % on x axis
win.xtocY() // px to % on y axis
win.ctoxY() // % to px on x axis
win.ctoxY() // % to px on y axis


EXAMPLE



var win = new FlexibleWindow(null, 700, 300);
win.element.style.backgroundColor = "grey";
win.element.style.userSelect = "none";

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
		win.setScale(win.getScreenScale());
	} else {
		if (typeof require !== 'undefined') { // electron
			win.setScale(win.getWindowScale());
		} else { // browser
			win.setScale(1);
		}
	}
};
*/
var FlexibleWindow = function(divElement, width, height) {
	var THIS = this;
	
	
	
	this.width = width; // RO
	this.height = height; // RO
	this.ratio = width / height; // RO
	
	if (divElement != null) {
		this.element = divElement;
	} else {
		this.element = document.createElement("div");
		document.body.appendChild(this.element);
	}
	this.element.style.position = "absolute";
	this.element.style.overflow = "hidden";
	this.element.style.left = "0px";
	this.element.style.top = "0px";
	this.element.style.right = "0px";
	this.element.style.bottom = "0px";
	this.element.style.margin = "auto";
	this.element.style.width = width + "px";
	this.element.style.height = height + "px";
	
	this.current_width = function() {return Number(this.element.style.width.split("px")[0]);}
	this.current_height = function() {return Number(this.element.style.height.split("px")[0]);}
	this.current_scaleX = function() {return this.current_width() / this.width;}
	this.current_scaleY = function() {return this.current_height() / this.height;}
	
	
	
	this.mouseX = 0;
	this.mouseY = 0;
	window.addEventListener("mousemove", function(e) {
		THIS.mouseX = (e.clientX - THIS.element.offsetLeft) / THIS.scale;
		if (THIS.mouseX < 0) THIS.mouseX = 0; else if (THIS.mouseX > THIS.width) THIS.mouseX = THIS.width;
		THIS.mouseY = (e.clientY - THIS.element.offsetTop) / THIS.scale;
		if (THIS.mouseY < 0) THIS.mouseY = 0; else if (THIS.mouseY > THIS.height) THIS.mouseY = THIS.height;
		//console.log(THIS.mouseX, THIS.mouseY);
	});
	
	
	
	this.setScale = function(scaleX, scaleY) {
		if (scaleY == null) scaleY = scaleX;
		//console.log("setting scale", scale);
		this.element.style.width =  this.width * scaleX + "px";
		this.element.style.height = this.height * scaleY + "px";
		//this.element.style.fontSize = scale * 100 + "%";
		this.element.style.fontSize = scaleX * 100 + "%";
	}
	//this.center = function() { no need. margin auto will do the work
	//	this.element.style.left = (window.innerWidth - this.getCurrentWidth())/2 + "px";
	//	this.element.style.top = (window.innerHeight - this.getCurrentHeight())/2 + "px";
	//}
	this.getWindowScale = function() {
		var boxRatio = window.innerWidth / window.innerHeight;
		if (boxRatio > this.ratio) { // box too much width
			return window.innerHeight / this.height;
		} else { // box too much height
			return window.innerWidth / this.width;
		}
	}
	this.getScreenScale = function() {
		var boxRatio = screen.width / screen.height;
		if (boxRatio > this.ratio) { // box too much width
			return screen.height / this.height;
		} else { // box too much height
			return screen.width / this.width;
		}
	}
	
	
	
	var FULLSCREEN_INTERVAL = 80;
	var fullscreenTarget = this.element;
	if (fullscreenTarget.webkitRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.webkitRequestFullScreen();}
		this.cancelFullScreen = function() {document.webkitCancelFullScreen();}
	} else if (fullscreenTarget.mozRequestFullScreen != null) {
		this.requestFullScreen = function() {fullscreenTarget.mozRequestFullScreen();}
		this.cancelFullScreen = function() {document.mozCancelFullScreen();}
	} else {
		this.requestFullScreen = fullscreenTarget.requestFullScreen;
		this.cancelFullScreen = fullscreenTarget.cancelFullScreen;
	}
	this.isFullscreen = false;
	this.fullscreen = function(toggle) {
		if (toggle != undefined) {
			if (toggle) {
				this.requestFullScreen();
				this.isFullscreen = true;
			} else {
				this.cancelFullScreen();
				this.isFullscreen = false;
			}
		} else { // toggle not set
			this.fullscreen(!this.isFullscreen);
		}
	}
	var ar = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"];
	ar.forEach(
		eventType => document.addEventListener(eventType, function() {
			THIS.onFullscreen(THIS.isFullscreen);
		}, false)
	);
	
	this.onFullscreen = function(itis) {} // OR
	
	
	/*
	this.resizeNWWindow = function(width, height) {
		var nwgui = (typeof require !== 'undefined') ? require("nw.gui") : null;
		nwgui.Window.get().width = width;
		nwgui.Window.get().height = height;
		if (true) { // fix an error to nwgui until it's patched
			var error_dx = window.innerWidth - nwgui.Window.get().width;
			var error_dy = window.innerHeight - nwgui.Window.get().height;
		}
		nwgui.Window.get().width = width - parseInt(error_dx);
		nwgui.Window.get().height = height - parseInt(error_dy);
	}
	*/
	
	
	
	this.xtocX = function(px) {return px * 100 / THIS.width;};
	this.xtocY = function(px) {return px * 100 / THIS.height;};
	this.ctoxX = function(percent) {return parseInt(percent / 100 * THIS.width);};
	this.ctoxY = function(percent) {return parseInt(percent / 100 * THIS.height);};
}





