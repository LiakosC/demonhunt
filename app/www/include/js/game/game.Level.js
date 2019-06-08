game.Level = function() {
	this.getTotalGold = function() {
		return this.totalGold;
	}
	this.totalGold = 0; // saved after init()
	this.init = function() {} // lambda
}