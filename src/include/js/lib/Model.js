var Model = function(phaser) {
	var THIS = this;
	this.ph = phaser;
	
	this.pointSprite = this.ph.add.sprite(0, 0, null);
	this.textureSprite = this.ph.add.sprite(0, 0, null);
	this.pointSprite.addChild(this.textureSprite);
	this.direction = 0; // RO
	this.updateScale = function() {
		this.textureSprite.scale.x = this.direction; // a * b * c * ..
	}
	
	/* PUBLIC */
	
	this.xy = function(x, y) {
		this.pointSprite.x = x;
		this.pointSprite.y = y;
	}
	this.setDirection = function(d) { // -1 or +1
		if (d == 1) {this.direction = 1;} else if (d == -1) {this.direction = -1;}
		this.updateScale();
	}
	this.lockCamera = function() {
		this.ph.camera.follow(this.pointSprite);
	}
	this.loadTexture = function(texture) {
		this.textureSprite.loadTexture(texture);
	}
}

var UnitModel = function(phaser) {
	Model.call(this, phaser);
	this.pointSprite.anchor.setTo(0.5, 0.5);
	this.textureSprite.anchor.setTo(0.5, 0.5);
}
UnitModel.prototype = Object.create(Model.prototype);
UnitModel.prototype.constructor = UnitModel;

var HeroUnitModel = function(phaser) {
	UnitModel.call(this, phaser);
	this.loadTexture("hero");
	game.meGroup.add(this.pointSprite);
	//phaser.physics.arcade.enable(this.pointSprite);
}
HeroUnitModel.prototype = Object.create(UnitModel.prototype);
HeroUnitModel.prototype.constructor = HeroUnitModel;

var WallModel = function(phaser) {
	Model.call(this, phaser);
}
WallModel.prototype = Object.create(Model.prototype);
WallModel.prototype.constructor = WallModel;