import {AbstractState} from "./AbstractState.js";
import {GenerateInitialPiecesState} from "./GenerateInitialPiecesState.js";
import {StepResult} from "./StateResult/StepResult.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";

export const PausedState = function() {
    this._currentTime = 0;
};

PausedState.prototype = Object.create(AbstractState.prototype);


/**
 * @param {number} time
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/StepResult').StepResult}
 */
PausedState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    renderer.drawPausedScreen();
    this._currentTime = time;
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
