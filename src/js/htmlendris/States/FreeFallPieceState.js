const FreeFallPieceState = function() {
    this._STEP_DURATION = 100;
    this._previousTime = 0;
};

FreeFallPieceState.prototype = Object.create(AbstractState.prototype);

/**
 *
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
FreeFallPieceState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (time - this._previousTime < this._STEP_DURATION) {
        return new StepResult(currentPlayground, this, currentPiece, false);
    } else {
        this._previousTime = time;
    }

    const movedPiece = currentPiece.move(new Point(0, 1));
    if (currentPlayground.playgroundPieceFits(movedPiece)) {
        return new StepResult(currentPlayground, this, movedPiece, true);
    } else {
        return new StepResult(currentPlayground, new RotatableStepAfterFreeFall(time), currentPiece, true);
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
