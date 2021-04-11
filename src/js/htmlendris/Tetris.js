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


    const movementOccurred = this._movePieceIfPossible(new Point(0, 1));
    if (!movementOccurred) {
        this._matrix = this._matrix.withPlaygroundPiece(this._playgroundPiece);
        this._loadNextPiece();
    }

    this.redraw();
};

Tetris.prototype.redraw = function() {
    const callback = function() {
        this._renderer.render(
            this._matrix.withPiece(
                this._playgroundPiece.getPosition().getX(),
                this._playgroundPiece.getPosition().getY(),
                this._playgroundPiece.getPiece()
            )
        );
    };
    window.requestAnimationFrame(callback.bind(this));
};

Tetris.prototype.onKeyDown = function(event) {
    const CODE_ARROW_UP = 38;
    const CODE_ARROW_LEFT = 37;
    const CODE_ARROW_RIGHT = 39;
    const CODE_ARROW_DOWN = 40;

    let knownCodes = [CODE_ARROW_UP, CODE_ARROW_LEFT, CODE_ARROW_RIGHT, CODE_ARROW_DOWN];

    if (!knownCodes.includes(event.keyCode)) {
        return;
    }

    event.preventDefault();

    try {
        if (event.keyCode === CODE_ARROW_UP) {
            this._playgroundPiece.getPiece().rotateRight();
            this.redraw();
        } else if (event.keyCode === CODE_ARROW_LEFT) {
            this._movePieceIfPossible(new Point(-1, 0));
            this.redraw();
        } else if (event.keyCode === CODE_ARROW_RIGHT) {
            this._movePieceIfPossible(new Point(1, 0));
            this.redraw();
        } else if (event.keyCode === CODE_ARROW_DOWN) {
            this._movePieceIfPossible(new Point(0, 1));
            this.redraw();
        }
    } catch (exception) {
        if (!exception instanceof CollisionException) {
            throw exception;
        }
    }
};

/**
 * Moves current piece by given vector, if possible. If not, nothing happens. Returns true if movement occured.
 * @param vector Point
 * @returns {boolean}
 * @private
 */
Tetris.prototype._movePieceIfPossible = function(vector) {
    const movedPiece = this._playgroundPiece.move(vector);
    if (this._matrix.playgroundPieceFits(movedPiece)) {
        this._playgroundPiece = movedPiece;
        return true;
    }

    return false;
}

Tetris.prototype._ensurePlaygroundPiece = function() {
    if (this._playgroundPiece !== null) {
        return;
    }

    this._loadNextPiece();
};

Tetris.prototype._loadNextPiece = function() {
    this._playgroundPiece = new PlaygroundPiece(new Point(this._width / 2, 0), this._createNextPiece());
};

Tetris.prototype._createNextPiece = function() {

    const colors = [];
    colors.push('red');
    colors.push('green');
    colors.push('yellow');
    colors.push('pink');
    colors.push('violet');
    colors.push('white');

    const generators = [];
    generators.push((color) => new PieceI('red'));
    generators.push((color) => new PieceJ('green'));
    generators.push((color) => new PieceL('yellow'));
    generators.push((color) => new PieceO('white'));
    generators.push((color) => new PieceS('pink'));
    generators.push((color) => new PieceT('orange'));
    generators.push((color) => new PieceZ('brown'));

    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    return generators[Math.floor(Math.random() * generators.length)](chosenColor);
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