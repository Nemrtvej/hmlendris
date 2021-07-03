import {AbstractState} from "./AbstractState.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";
import {PausedState} from "./PausedState.js";
import {StepResult} from "./StateResult/StepResult.js";

export const GameOverState = function() {
};

GameOverState.prototype = Object.create(AbstractState.prototype);


/**
 * @param {number} time
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/StepResult').StepResult}
 */
GameOverState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    renderer.drawGameOverScreen();
    return new StepResult(currentPlayground, this, pieceProvider.getNullPiece(), false);
};

/**
 * @param {Event} event
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/KeyPressResult').KeyPressResult}
 */
GameOverState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    const delegate = new PausedState();
    return delegate.onKeyPress(event, currentPlayground, currentPiece, pieceProvider, renderer);
};
