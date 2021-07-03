import {AbstractState} from "./AbstractState.js";
import {GenerateInitialPiecesState} from "./GenerateInitialPiecesState.js";
import {StepResult} from "./StateResult/StepResult.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";

export const PausedState = function() {
    this._currentTime = 0;
};

PausedState.prototype = Object.create(AbstractState.prototype);

/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer AbstractRenderer
 *
 * @return {StepResult}
 */
PausedState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    renderer.drawPausedScreen();
    this._currentTime = time;
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
PausedState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {

    const CODE_SPACE_BAR = 32;

    let knownCodes = [CODE_SPACE_BAR];

    if (!knownCodes.includes(event.keyCode)) {
        return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
    }

    event.preventDefault();

    if (event.keyCode === CODE_SPACE_BAR) {
        return new KeyPressResult(currentPlayground, new GenerateInitialPiecesState(this._currentTime), pieceProvider.getNextPiece(), true, true);
    }

    return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
};
