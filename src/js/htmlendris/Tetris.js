/**
 *
 * @param width integer
 * @param height integer
 * @param renderer CanvasRenderer
 * @param pieceProvider PieceProvider
 * @constructor
 */
const Tetris = function(width, height, renderer, pieceProvider) {
    this._width = width;
    this._height = height;

    this._score = 0;
    this._matrix = null;
    this._renderer = renderer;

    this._nextPieceUI = null;

    /**
     *
     * @type {PlaygroundPiece}
     * @private
     */
    this._playgroundPiece = null;

    /**
     *
     * @type {AbstractState}
     * @private
     */
    this._currentState = new FallingPieceState();

    this._pieceProvider = pieceProvider;
};

Tetris.prototype.step = function() {
    const stepResult = this._currentState.step(this._matrix, this._playgroundPiece, this._pieceProvider);
    this._currentState = stepResult.getState();
    this._matrix = stepResult.getMatrix();
    this._playgroundPiece = stepResult.getCurrentPiece();

    this.redraw();
};

Tetris.prototype.redraw = function() {
    const callback = function() {
        this._renderer.render(
            this._matrix.withPiece(
                this._playgroundPiece.getPosition().getX(),
                this._playgroundPiece.getPosition().getY(),
                this._playgroundPiece.getShape()
            )
        );
    };
    window.requestAnimationFrame(callback.bind(this));
};

Tetris.prototype.onKeyDown = function(event) {
    const result = this._currentState.onKeyPress(event, this._matrix, this._playgroundPiece);
    this._matrix = result.getMatrix();
    this._playgroundPiece = result.getCurrentPiece();

    this.redraw();
};

Tetris.prototype.reset = function () {
    this._score = 0;
    this._matrix = new Matrix(this._width, this._height);

    this._renderer.fillGeneralBackground();
    this._playgroundPiece = this._pieceProvider.getNextPiece();
};

/**
 *
 * @param firstColumnIndex integer
 * @param firstRowIndex integer
 * @param piece AbstractPiece
 * @returns {Matrix}
 */
Tetris.prototype.showPiece = function(firstColumnIndex, firstRowIndex, piece) {
    return this._matrix.withPiece(firstColumnIndex, firstRowIndex, piece.getShape());
}