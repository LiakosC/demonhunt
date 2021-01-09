var Speaker = function(parent) {
	var THIS = this;
	
	this.element = $("<div>").appendTo(parent).html('\
		<table>\
			<tr>\
				<td><img src="include/images/speak.png"/></td>\
				<td><input/></td>\
			</tr>\
		</table>\
	').addClass("Speaker").css({
		
	}).appendTo(parent)[0];
	
	var isOpen = function() {
		return $(THIS.element).is(":visible");
	}
	var inputValue = function() {
		return $(THIS.element).find("input")[0].value;	
	}
	var cast_talk = function() {
		if (isOpen()) {
			THIS.lastTalk = inputValue();
			THIS.onSpeak.dispatch();
		}
		THIS.toggle();
	}
	
	this.toggle = function(flag) {
		if (flag != null) {
			if (flag == true) {
				$(this.element).show();
				$(this.element).find("input")[0].focus();
				this.onOpen.dispatch();
			} else {
				$(this.element).find("input")[0].value = "";
				$(this.element).hide();
				this.onClose.dispatch();
			}
		} else {
			var f = isOpen();
			this.toggle(!f);
		}
	}
	
	this.onOpen = new Phaser.Signal();
	this.onClose = new Phaser.Signal();
	this.lastTalk = "";
	this.onSpeak = new Phaser.Signal();
	
	
	var keydown = function(e) {
		//console.log("keydown", e);
		if (e.key == "Enter") {
			cast_talk();	
		}
	}
	window.addEventListener("keydown", keydown);
	
	this.destroy = function() {
		this.element.parentNode.removeChild(this.element);
		this.onOpen.dispose();
		this.onClose.dispose();
		window.removeEventListener("keydown", keydown);
	}
};

