const PausedState = function() {
};

PausedState.prototype = Object.create(AbstractState.prototype);

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @return {StepResult}
 */
PausedState.prototype.step = function(currentPlayground, currentPiece, pieceProvider, renderer) {
    renderer.drawPausedScreen();
    return new StepResult(currentPlayground, this, pieceProvider.getNullPiece(), false);
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 * @return {KeyPressResult}
 */
PausedState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {

    const CODE_SPACE_BAR = 32;

    let knownCodes = [CODE_SPACE_BAR];

    if (!knownCodes.includes(event.keyCode)) {
        return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
    }

    event.preventDefault();

    if (event.keyCode === CODE_SPACE_BAR) {
        return new KeyPressResult(currentPlayground, new NewPieceState(), pieceProvider.getNextPiece(), true, true);
    }

    return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
};