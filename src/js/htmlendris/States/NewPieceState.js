const NewPieceState = function() {
};

NewPieceState.prototype = Object.create(AbstractState.prototype);

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
NewPieceState.prototype.step = function(currentPlayground, currentPiece, pieceProvider, renderer) {
    if (currentPlayground.playgroundPieceFits(currentPiece)) {
        const delegate = new FallingPieceState();
        return delegate.step(currentPlayground, currentPiece, pieceProvider, renderer);
    } else {
        const delegate = new GameOverState();
        return delegate.step(currentPlayground, currentPiece, pieceProvider, renderer);
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