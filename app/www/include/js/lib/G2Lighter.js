class G2_Phaser_Lighter {
    constructor(phaserGame) {
        this._ph = phaserGame;
        this._gr = phaserGame.add.graphics();
        this._lastColor = 0xffffff;
    }
    Clear() {
        this._gr.clear();
    }
    SetColor(color) {
        this._lastColor = color;
        return this;
    }
    DrawRect(g2Rect) {
        this._gr.beginFill(this._lastColor);
        this._gr.drawRect(g2Rect.left(), g2Rect.top(), g2Rect.w(), g2Rect.h());
    }
    DrawCircle(g2Circle) {
        this._gr.beginFill(this._lastColor);
        this._gr.drawCircle(g2Circle.x(), g2Circle.y(), g2Circle.d());
        //console.log("drawing circle", g2Circle);
    }
    End() {
        this._gr.endFill();
    }
}