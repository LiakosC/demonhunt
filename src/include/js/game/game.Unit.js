game.Unit = class extends game.Entity {
	constructor() {
		super();
		var THIS = this;
		this.GetBodySprite().anchor.setTo(0.5, 0.5);
		ph.physics.enable(this.GetBodySprite());
		this.textureSprite = ph.add.sprite(0, 0, null);
		this.textureSprite.anchor.setTo(0.5, 0.5);
		this.GetBodySprite().addChild(this.textureSprite);
		this.SetGravity(GRAVITY);
		this.alive = true;
		this.hp = 100;
		this.hpMax = 100;
		this.speed = 170;
		this.jumpSpeed = JUMP_SPEED;
		this.isJumping = false; // if unit touches the ground. updated in room.updateUnitPhysics
		this.movingDirection = 0; // -1 | 0 | +1
		this.onMove = new Phaser.Signal();
		this.onLand = new Phaser.Signal();
		this.onLand.add(function() {
			THIS.isJumping = false;
		})
		this.onDeath = new Phaser.Signal();
		this.onDamaged = new Phaser.Signal();
		this.onUpdate = new Phaser.Signal();
	}
	_GetTextureSprite() {
		return this.textureSprite;
	}

	CastDirectionAttack(direction) { // -1 | +1
		if (this.CanDirectionAttack()) {
			this.DirectionAttack(direction);
		}
	}
	CastDirectionMove(delta) { // -1, 0, +1
		if (this.CanDirectionMove()) {
			this.DirectionMove(delta);
		}
	}
	CastJump() {
		console.log("unit CastJump()");
		if (this.CanJump()) {
			console.log("unit trying to Jump()");
			this.Jump();
		}
	}

	
	CanDirectionAttack() {
		return this.alive;
	}
	CanDirectionMove() {
		return this.alive;
	}
	CanJump() {
		return this.alive && !this.isJumping;
	}
	CanGetDamaged() {
		return this.alive;
	}
	CanDie() {
		return this.alive;
	}
	/* old
	this.createBody = function(width, height, gravity) {
		this.sprite.body.setSize(width, height);
		this.sprite.body.gravity.y = gravity || 0;
	}
	this.getRect = function() {return G2.RectCS(G2.P(THIS.sprite.x, THIS.sprite.y), THIS.sprite.body.width, THIS.sprite.body.height);}
	this.getUnitRange = function(unit) {return ph.math.distance(unit.sprite.x, unit.sprite.y, this.sprite.x, this.sprite.y);}
	*/
	
	StopMoving() {
		this.GetBodySprite().body.velocity.x = 0;
		this.GetBodySprite().body.velocity.y = 0;
	}
	DirectionAttack(direction) { // -1 | +1
		//console.log("directionattack");
	}
	DirectionMove(direction) { // -1 | 0 | +1
		//console.log("direction move", direction);
		this.movingDirection = direction;
		if (direction != 0) {this.SetDirection(direction);}
		this.onMove.dispatch();
	}
	GetMovingDirection() {
		var dir;
		var body = this.GetBodySprite().body;
		if (body.velocity.x > 0) {dir = +1;}
		else if (body.velocity.x < 0) {dir = -1;}
		else {dir = 0;}
		console.log("GetMovingDirection()", dir);
		return dir;
	}
	Jump() {
		//console.log("unit jump");
		this.GetBodySprite().body.velocity.y = -this.jumpSpeed;
		this.isJumping = true;
	}
	GetDamaged(dmg) {
		this.hp -= dmg;
		if (this.hp <= 0) {
			this.Die(); // death makes hp=0
		}
		this.onDamaged.dispatch();
	}
	Die() {
		this.alive = false;
		this.hp = 0;
		this.movingDirection = 0;
		this.isMoving = false;
		this.onDeath.dispatch();
		console.log("unit die");
	}
	Update(ms) {
		super.Update(ms);
		this.GetBodySprite().body.velocity.x = this.movingDirection*this.speed;
		this.onUpdate.dispatch();
	}
	
	
	
	remove() {
		this.sprite.destroy();
		//game.units.splice(game.units.indexOf(this), 1);
	}
};