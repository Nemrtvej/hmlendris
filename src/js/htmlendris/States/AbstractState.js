export const AbstractState = function() {

};

/**
 * @param {number} time
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/StepResult').StepResult}
 */
AbstractState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    throw new Exception('tick must be implemented');
};

/**
 * @param {Event} event
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/KeyPressResult').KeyPressResult}
 */
AbstractState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    throw new Exception('onKeyPress must be implemented');
};
