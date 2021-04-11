const AbstractState = function() {

};

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @return {StepResult}
 */
AbstractState.prototype.step = function(currentPlayground, currentPiece, pieceProvider, renderer) {
    throw new Exception('step must be implemented');
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 * @return {KeyPressResult}
 */
AbstractState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    throw new Exception('onKeyPress must be implemented');
};