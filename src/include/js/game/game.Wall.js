game.Wall = class extends game.Entity {
	constructor(x, y, w, h, texture) {
		super();
		game.wallsGroup.add(this.sprite);
		this.SetPosition(x, y);
		this.SetBodySize(w, h);
		this.textureSprite = ph.add.tileSprite(0, 0, w, h, texture); // x,y = 0,0 because it's child of this.sprite
		game.tilesGroup.add(this.textureSprite);
		this.groundDetectorSprite = ph.add.sprite(0, -3, null);
		ph.physics.enable(this.groundDetectorSprite);
		this.groundDetectorSprite.body.setSize(w, 3);
		this.sprite.addChild(this.textureSprite);
		this.sprite.addChild(this.groundDetectorSprite);
		this.canCollideUnits = false; // collision flag
	}

	G2Rect() {
		return g2.Rect(this.GetBodySprite().x, this.GetBodySprite().y, this.GetBodySprite().body.width, this.GetBodySprite().body.height);
	}
	
	SetTexture(texture) {
		this.textureSprite.loadTexture(texture);
	}
	EnableCollider() {
		this.canCollideUnits = true;
		this.GetBodySprite().body.immovable = true;
	}
	MovingWall(area, duration, to_object, callback) { // G2.RectTLS(G2.P(r0.x+700, r0.y+200), 50, 50)
		var THIS = this;
		this.mw_sound = ph.add.audio("wallmove");
		this.mw_tween = ph.add.tween(THIS.GetBodySprite()).to(to_object, duration, null);
		this.onMove = new Phaser.Signal(); // when player moves the wall
		this.mw_moveCB = function() {
			if (g2.RectOverRect(game.me.G2Rect(), area)) {
				THIS.mw_sound.play();
				ph.time.events.add(duration, function() {THIS.mw_sound.stop();});
				THIS.mw_tween.start();
				game.me.onAction.remove(THIS.mw_moveCB);
				if (callback !== undefined) {THIS.onMove.add(callback);}
				THIS.onMove.dispatch();
			}
		}
		game.me.onAction.add(this.mw_moveCB);	
	}
}