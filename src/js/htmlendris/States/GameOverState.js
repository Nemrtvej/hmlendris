import {AbstractState} from "./AbstractState.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";
import {PausedState} from "./PausedState.js";
import {StepResult} from "./StateResult/StepResult.js";

export const GameOverState = function() {
};

GameOverState.prototype = Object.create(AbstractState.prototype);

/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer AbstractRenderer
 *
 * @return {StepResult}
 */
GameOverState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    renderer.drawGameOverScreen();
    return new StepResult(currentPlayground, this, pieceProvider.getNullPiece(), false);
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer AbstractRenderer
 * @return {KeyPressResult}
 */
GameOverState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    const delegate = new PausedState();
    return delegate.onKeyPress(event, currentPlayground, currentPiece, pieceProvider, renderer);
};
