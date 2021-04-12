const NewPieceState = function(currentTime) {
    this._STEP_DURATION = 1000;
    this._previousTime = currentTime;
};

NewPieceState.prototype = Object.create(AbstractState.prototype);

/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
NewPieceState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (time - this._previousTime < this._STEP_DURATION) {
        return new StepResult(currentPlayground, this, currentPiece, false);
    } else {
        this._previousTime = time;
    }

    if (currentPlayground.playgroundPieceFits(currentPiece)) {
        const delegate = new FallingPieceState();
        return delegate.tick(time, currentPlayground, currentPiece, pieceProvider, renderer);
    } else {
        const delegate = new GameOverState();
        return delegate.tick(time, currentPlayground, currentPiece, pieceProvider, renderer);
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
NewPieceState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    const delegate = new FallingPieceState();
    const stateFromFallingPiece = delegate.onKeyPress(event, currentPlayground, currentPiece, renderer);
    return new KeyPressResult(
        stateFromFallingPiece.getMatrix(),
        this,
        stateFromFallingPiece.getCurrentPiece(),
        true,
        false
    );
};