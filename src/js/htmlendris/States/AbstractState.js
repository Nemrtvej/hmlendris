const AbstractState = function() {

};

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 *
 * @return {StepResult}
 */
AbstractState.prototype.step = function(currentPlayground, currentPiece, pieceProvider) {
    throw new Exception('step must be implemented');
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @return {KeyPressResult}
 */
AbstractState.prototype.onKeyPress = function(event, currentPlayground, currentPiece) {
    throw new Exception('onKeyPress must be implemented');
};