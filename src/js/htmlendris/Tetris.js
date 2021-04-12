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
    this._currentState = new PausedState(this._renderer);

    this._pieceProvider = pieceProvider;

    this._break = false;
};

Tetris.prototype.start = function() {
    requestAnimationFrame(this.tick.bind(this));
};

Tetris.prototype.tick = function(timestamp) {
    if (this._break) {
        requestAnimationFrame(this.tick.bind(this));
        return;
    }

    console.log('Entry step', this._currentState);
    try {
        const stepResult = this._currentState.tick(timestamp, this._matrix, this._playgroundPiece, this._pieceProvider, this._renderer);
        console.log('Step result', stepResult);
        this._currentState = stepResult.getState();
        this._matrix = stepResult.getMatrix();
        this._playgroundPiece = stepResult.getCurrentPiece();

        if (stepResult.shouldRedraw()) {
            this.redraw();
        }
    } catch (exception) {
        debugger;
        throw exception;
    }

    console.log('Step finished', this._currentState);
    console.log(this);
    requestAnimationFrame(this.tick.bind(this));
};

Tetris.prototype.redraw = function() {
    const callback = function() {
        this._renderer.render(
            this._matrix.withForcedPiece(
                this._playgroundPiece.getPosition().getX(),
                this._playgroundPiece.getPosition().getY(),
                this._playgroundPiece.getShape()
            )
        );
    };
    window.requestAnimationFrame(callback.bind(this));
};

Tetris.prototype.onKeyDown = function(event) {
    // letter 'p'
    if (event.keyCode === 80) {
        this._break = !this._break;
        console.log('Inner pause: ', this._break);
        event.preventDefault();
    }

    const result = this._currentState.onKeyPress(event, this._matrix, this._playgroundPiece, this._pieceProvider, this._renderer);
    this._matrix = result.getMatrix();
    this._currentState = result.getState();
    this._playgroundPiece = result.getCurrentPiece();

    if (result.shouldRedraw()) {
        this.redraw();
    }

    if (result.shouldReset()) {
        this.reset();
    }
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