/*
var loading = new EpicLoading($("#window")[0]);
loading.setProgress(0.5);
loading.setProgress(loading.progress + 0.1);
if (loading.progress == 1) {
	
}
*/



var EpicLoading = function(container) {
	var THIS = this;
	
	var TITLE = "Demon Rush";
	var SUBTITLE = "Liakos Games";
	var OVERBAR = "Loading...";
	var UNDERBAR = "The nightmare begins...";
	
	this.element = $("<div>", {
		html: '\
			<div class="title">' + TITLE + '</div>\
			<div class="subtitle">' + SUBTITLE + '</div>\
			<div class="overbar">' + OVERBAR + '</div>\
			<div class="bar">\
				<div style="width:0%;"></div>\
			</div>\
			<div class="underbar">' + UNDERBAR + '</div>\
		', class: "EpicLoading"
	}).appendTo(container)[0];
	
	this.title = this.element.querySelector(".title");
	this.subtitle = this.element.querySelector(".subtitle");
	this.overbar = this.element.querySelector(".overbar");
	this.bar = this.element.querySelector(".bar");
	this.progressBar = this.element.querySelector(".bar > div");
	this.underbar = this.element.querySelector(".underbar");
	
	this.progress = 0;
	this.setProgress = function(coef /*0-1*/) {
		if (coef < 0) {coef = 0;} else if (coef > 1) {coef = 1;}
		this.progress = coef;
		this.progressBar.style.width = (coef * 100) + "%";
	};
	
	this.destroy = function() {
		this.element.parentNode.removeChild(this.element);
	}
};

if (typeof module != 'undefined') module.exports = EpicLoading;
