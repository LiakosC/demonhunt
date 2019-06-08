/*
- pointSprite
	- textureSprite
	- highlightGraphic
*/

game.Entity = class {
	
	constructor() {
		this.x = 0; // RO
		this.y = 0; // RO
	
		this.room = null;
	
		this.sprite = ph.add.sprite(0, 0, null); // used for collisions
		ph.physics.enable(this.sprite);
		//ph.physics.enable(this.textureSprite);
		//this.sprite.addChild(this.textureSprite);
		//this.pointSprite.addChild(this.highlightGraphic);
		//console.log("entity", this.pointSprite, this.textureSprite);


	}

	_GetMovingSprite() { // overwrite this in derived classes
		return this.sprite;
	}
	GetBodySprite() { // public used for phaser collision
		return this.sprite;
	}
	_GetTextureSprite() { // used to change direction
		return this.sprite;
	}
	G2Point() {
		return g2.Point(this.GetBodySprite().x, this.GetBodySprite().y);
	}
	G2Rect() {
		//return g2.Rect_CS(this.G2Point(), this.GetBodySprite().width, this.GetBodySprite().height);
		var body = this.GetBodySprite().body;
		return g2.Rect(body.position.x, body.position.y, body.width, body.height);
	}
	SetPosition(x, y) {
		this._GetMovingSprite().x = x;
		this._GetMovingSprite().y = y;
	}
	SetScale(x01, y01) {
		this.GetBodySprite().scale.setTo(x01, y01);
	}
	SetDirection(direction /* -1 or +1 */) {
		var absScale = Math.abs(this._GetTextureSprite().scale.x);
		this._GetTextureSprite().scale.x = absScale * direction;
	}
	GetDirection() {
		if (this._GetTextureSprite().scale.x > 0) {
			return 1;
		} else return -1;
	}
	SetVelocity(velocityX, velocityY) {
		this.GetBodySprite().body.velocity.x = velocityX;
		this.GetBodySprite().body.velocity.y = velocityY;
	}
	SetBodySize(width, height) {
		var sprite = this.GetBodySprite();
		//sprite.width = width;
		//sprite.height = height;
		sprite.body.setSize(width, height);
		//this.GetBodySprite().setFrame(new Phaser.Frame(0, 0, width, height));
	}
	CenterTexture() {
		var body = this.GetBodySprite().body;
		//this._GetTextureSprite().position.setTo(body.position.x + body.width/2, body.position.y + body.height/2);
		this._GetTextureSprite().position.setTo(body.width/2, body.height/2);
	}
	SetGravity(gravityValue) {
		this.GetBodySprite().body.gravity.y = gravityValue;
	}
	CenterBodyToSprite() {
		//var sprite = this._GetTextureSprite();
		var sprite = this.GetBodySprite();
		var body = sprite.body;
		console.log(sprite, body);
		body.offset.x = (sprite.width - body.width) * 0.5 * sprite.scale.x; //;
		body.offset.y = (sprite.height - body.height) * 0.5 * sprite.scale.y; //;
		//console.log("offset", body.offset.x, body.offset.y);
	}
	HighlightBody() { // pointSprite acts as body for collisions because children can't do that (or so i think)
		//this.highlightGraphic.clear();
		//this.highlightGraphic.lineStyle(2, 0x0000FF, 2);
		//var sprite = this.pointSprite;
		//this.highlightGraphic.drawRect(0-sprite.body.width*sprite.anchor.x, 0-sprite.body.height*sprite.anchor.y, sprite.body.width, sprite.body.height);
	}
	Highlight() {
		this.HighlightBody();
		//console.log("Highlight() textureSprite");
	}
	Destroy() {
		this.highlightGraphic.destroy();
	}
	Update(ms) {
		this.Highlight();
	}
	UpdateAnimation() {

	}
}


game.RectEntity = class extends game.Entity {
	constructor() {
		super();
	}
	SetSize(width, height) {
		this.textureSprite.body.setSize(width, height);
	}

}