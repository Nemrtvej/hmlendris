const FreeFallPieceState = function() {
    this._handler = null;
    this._currentPlayground = null;
    this._currentPiece = null;
    this._renderer = null;
    this._running = true;
};

FreeFallPieceState.prototype = Object.create(AbstractState.prototype);

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
FreeFallPieceState.prototype.step = function(currentPlayground, currentPiece, pieceProvider, renderer) {
    if (this._running) {
        return new StepResult(this._currentPlayground, this, this._currentPiece, false);
    } else {
        return new StepResult(this._currentPlayground.withPlaygroundPiece(this._currentPiece), new NewPieceState(), pieceProvider.getNextPiece(), false);
    }
};


/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 * @return {KeyPressResult}
 */
FreeFallPieceState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
};

FreeFallPieceState.prototype.run = function() {
    const movedPiece = this._currentPiece.move(new Point(0, 1));

    if (this._currentPlayground.playgroundPieceFits(movedPiece)) {
        this._currentPiece = movedPiece;
        const callback = function() {
            console.log(this._renderer);
            this._renderer.render(
                this._currentPlayground.withForcedPiece(
                    this._currentPiece.getPosition().getX(),
                    this._currentPiece.getPosition().getY(),
                    this._currentPiece.getShape()
                )
            );
        };
        window.requestAnimationFrame(callback.bind(this));
    } else {
        this._running = false;
        clearInterval(this._handler);
    }
};

FreeFallPieceState.prototype.setHandler = function(handler) {
    this._handler = handler;
}

FreeFallPieceState.prototype.setRunParameters = function(currentPlayground, currentPiece, renderer) {
    this._currentPlayground = currentPlayground;
    this._currentPiece = currentPiece;
    this._renderer = renderer;
};