game.SkeletonUnit = class extends game.Unit {
    constructor() {
        super();
        var THIS = this;
        game.enemiesGroup.add(this.GetBodySprite());
        this.SetBodySize(50, 50);
		this.CenterBodyToSprite();
        this._GetTextureSprite().loadTexture("skeleton_attack");
        this._GetTextureSprite().animations.add("attack");
        this._GetTextureSprite().animations.getAnimation("attack").onComplete.add(function() {
            THIS._GetTextureSprite().loadTexture("skeleton");
        });
        this._GetTextureSprite().loadTexture("skeleton");
        this.onDeath.add(function() {
            THIS._GetTextureSprite().loadTexture("skeleton_dead");
        });
        this.speed = 120;
        this._isPatroling = false;
        this._patrolX1 = this.GetBodySprite().x;
        this._patrolX2 = this.GetBodySprite().y;
        //game.enemiesGroup.add(this._GetTextureSprite());
        
        var attackCdMax = 1200;
        var attackCd = attackCdMax;
        this._heroDetected = false;
        
        this.onUpdate.add(function() {
            var textureSPrite = THIS._GetTextureSprite();
            var bodySprite = THIS.GetBodySprite();
            var heroSprite = game.me.GetBodySprite();
            //console.log(textureSPrite.animations.getAnimation("attack").isPlaying);
            var angleToHero;
            if (THIS.alive) {
                attackCd -= ph.time.physicsElapsedMS;
                if (attackCd <= 0) {
                    THIS.attack();
                    attackCd += attackCdMax;
                }
                if (bodySprite.x > THIS._patrolX2) {THIS.DirectionMove(-1);}
                else if (bodySprite.x < THIS._patrolX1 || (bodySprite.body.velocity.x == 0)) {THIS.DirectionMove(+1);}
                /**/
                if (THIS._heroDetected) {
                    angleToHero = ph.math.angleBetween(bodySprite.x, bodySprite.y, heroSprite.x, heroSprite.y);
                    if (angleToHero > Math.PI/2 || angleToHero < -Math.PI/2) {
                        THIS.SetDirection(-1);
                    } else {
                        THIS.SetDirection(+1);
                    }
                } else {
                    //THIS.SetDirection(THIS.GetMovingDirection());
                }
            }
        });
        this.onDeath.add(function() {
            THIS._GetTextureSprite().loadTexture("skeleton_dead");
        });
        this._HeroDetectionTimeout();
        console.log(this);
    }
    Patrol(x1, x2) {
        this._isPatroling = true;
        this._patrolX1 = this.room.x + x1;
        this._patrolX2 = this.room.x + x2;
    }

    _GetRangeOfUnit(unit) {
        return g2.PointsDistance(this.G2Point(), unit.G2Point());
    }
    
    _HeroDetectionTimeout() {
        var heroDetected = this._heroDetected;
        var THIS = this;
        ph.time.events.add(ph.rnd.integerInRange(1000, 5000), function() {
            if (THIS._GetRangeOfUnit(game.me) < 800) {THIS._heroDetected = true;} else {THIS._heroDetected = false;}
            THIS._HeroDetectionTimeout();
        });
    }

    attack() {
        var THIS = this;
        this._GetTextureSprite().loadTexture("skeleton_attack");
        this._GetTextureSprite().animations.play("attack", 33);
        ph.time.events.add(25/33 * 500, function() {
            if (THIS.alive) {
                if (g2.RectOverRect(game.me.G2Rect(), THIS.getAttackRect())) {
                    game.me.GetDamaged(45);
                }
            }
        });
    }
    getAttackRect() {
        var sprite = this.GetBodySprite();
        var rangeX = 45, topExtend = 20, backExtend = 5, rect;
        var direction = this.GetDirection();
        //console.log("getAttackRect() this.direction", direction);
        if (direction == -1) {
            rect = g2.Rect_PP(
                g2.P(sprite.x-rangeX, sprite.y-sprite.body.height/2-topExtend), 
                g2.P(sprite.x+backExtend, sprite.y+sprite.body.height/2)
            );
        } else if (direction == +1) {
            rect = g2.Rect_PP(
                g2.P(sprite.x-backExtend, sprite.y-sprite.body.height/2-topExtend),
                g2.P(sprite.x+rangeX, sprite.y+sprite.body.height/2)
            );
        } return rect;
    }
    
}