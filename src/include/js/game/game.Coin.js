game.Coin = class extends game.Entity {
	constructor() {
		super();
		this.sprite = ph.add.sprite(0, 0, "gold");
		this.sprite.anchor.setTo(0.5);
		this.sprite.scale.setTo(0.5);
		this.sprite.animations.add(0);
		this.sprite.animations.play(0, 25, true);
		game.goldGroup.add(this.sprite);
		this.sound = ph.add.audio("gold");
		//SetSize(50, 50);
	}
	
	G2Circle() {
		var circle = g2.Circle(this.sprite.x, this.sprite.y, 25);
		return circle;
		//console.log("circle", circle);
	}

	_GetMovingSprite() {
		return this.sprite;
	}
	_GetBodySprite() {
		return this.sprite;
	}
	
	expirationTime(interval) {
		var THIS = this;
		ph.time.events.add(interval, function() {THIS.remove();});
	}
	
	remove() {
		console.log(this);
		this.sprite.destroy();
		this.sound.destroy();
	}
}