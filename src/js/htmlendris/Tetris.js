/**
 *
 * @param width integer
 * @param height integer
 * @param renderer CanvasRenderer
 * @constructor
 */
const Tetris = function(width, height, renderer) {
    this._width = width;
    this._height = height;

    this._score = 0;
    this._status = null;
    this._matrix = null;
    this._renderer = renderer;

    this._nextPieceUI = null;

    this._playgroundPiece = null;
};

Tetris.prototype.step = function() {
    this._ensurePlaygroundPiece();

    if (true /* check collision here */ ) {
        this._playgroundPiece = this._playgroundPiece.move(new Point(0, 1));
        this._renderer.render(
            this._matrix.withPiece(
                this._playgroundPiece.getPosition().getX(),
                this._playgroundPiece.getPosition().getY(),
                this._playgroundPiece.getPiece()
            )
        );
    }
};

Tetris.prototype._ensurePlaygroundPiece = function() {
    if (this._playgroundPiece !== null) {
        return;
    }

    this._playgroundPiece = new PlaygroundPiece(new Point(this._width / 2, 0), new PieceT());
};

Tetris.prototype.reset = function () {
    this._score = 0;
    this._status = null;
    this._matrix = new Matrix(this._width, this._height);

    this._renderer.fillGeneralBackground();
    this._nextPieceUI = new NextPiece(this._renderer, new Point(5, 5), 40, 40, 1);

    this._nextPieceUI.renderPiece(new PieceI());
};

/**
 *
 * @param firstColumnIndex integer
 * @param firstRowIndex integer
 * @param piece AbstractPiece
 * @returns {Matrix}
 */
Tetris.prototype.showPiece = function(firstColumnIndex, firstRowIndex, piece) {
    return this._matrix.withPiece(firstColumnIndex, firstRowIndex, piece);
}