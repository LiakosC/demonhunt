game.Input = class {
    constructor() {
        this._CreateKeys();
        this._ClearCaptures();
    }

    /* ---------------------- LINKS -------------------------- */
    _CastDirectionMove(direction) {
        if (game.me != null) {
            game.me.CastDirectionMove(direction);
            //console.log("move", direction);
        }
    }
    _CastJump() {
        if (game.me != null) {
            game.me.CastJump();
        }
    }
    _CastAttack(direction) { // -1 or +1
        if (game.me != null) {
            game.me.CastDirectionAttack(direction);
        }
    }
    _CastUse() {
        if (game.me != null) {
            game.me.CastUse();
        }
    }
    /* ---------------------- LINKS -------------------------- */

    _ClearCaptures() { // somehow this frees the keyboard and enables it to write in input elements
        ph.input.keyboard.clearCaptures();
    }
    _CreateKeys() {
        this.keys = {};
        this.keys.left = ph.input.keyboard.addKey(Phaser.Keyboard.A);
        this.keys.right = ph.input.keyboard.addKey(Phaser.Keyboard.D);
        this.keys.down = ph.input.keyboard.addKey(Phaser.Keyboard.S);
        this.keys.up = ph.input.keyboard.addKey(Phaser.Keyboard.W);
        this.keys.use = ph.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keys.chat = ph.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.keys.esc = ph.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.keys.attack_left = ph.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.keys.attack_right = ph.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }
    _RemoveKeys() {
        ph.input.keyboard.removeKey(Phaser.Keyboard.A);
        ph.input.keyboard.removeKey(Phaser.Keyboard.D);
        ph.input.keyboard.removeKey(Phaser.Keyboard.S);
        ph.input.keyboard.removeKey(Phaser.Keyboard.W);
        ph.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        ph.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
        ph.input.keyboard.removeKey(Phaser.Keyboard.ESC);
        ph.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
        ph.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
    }
    Toggle(flag) {
        var THIS = this;
        if (flag) {
            this.keys.left.onDown.add(THIS._MoveStateChanged, THIS);
            this.keys.left.onUp.add(THIS._MoveStateChanged, THIS);
            this.keys.right.onDown.add(THIS._MoveStateChanged, THIS);
            this.keys.right.onUp.add(THIS._MoveStateChanged, THIS);
            this.keys.up.onDown.add(function() {THIS._CastJump();});
            this.keys.use.onDown.add(function() {THIS._CastUse();});
            this.keys.attack_left.onDown.add(function() {THIS._CastAttack(-1);});
            this.keys.attack_right.onDown.add(function() {THIS._CastAttack(1);});
        } else {
            this.keys.left.onDown.removeAll();
            this.keys.left.onUp.removeAll();
            this.keys.right.onDown.removeAll();
            this.keys.right.onUp.removeAll();
            this.keys.up.onDown.removeAll();
            this.keys.use.onDown.removeAll();
            this.keys.attack_left.onDown.removeAll();
            this.keys.attack_right.onDown.removeAll();
        }
    }
    
    _MoveStateChanged() {
        if (this.keys.left.isDown && this.keys.right.isDown) {
            this._CastDirectionMove(0);
        } else if (this.keys.left.isDown) {
            this._CastDirectionMove(-1);
        } else if (this.keys.right.isDown) {
            this._CastDirectionMove(+1);
        } else {
            this._CastDirectionMove(0);
        }
    }
        
    Destroy() {
        this._RemoveKeys();
    }
}