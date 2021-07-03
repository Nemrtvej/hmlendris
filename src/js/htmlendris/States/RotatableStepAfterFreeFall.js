import {AbstractState} from "./AbstractState.js";
import {CheckFilledRowState} from "./CheckFilledRowState.js";
import {CollisionException} from "/js/htmlendris/Exceptions/CollisionException.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";
import {FallingPieceState} from "./FallingPieceState.js";
import {Point} from '/js/htmlendris/Utils/Point.js';
import {StepResult} from "./StateResult/StepResult.js";

export const RotatableStepAfterFreeFall = function(time) {
    this._STEP_DURATION = 500;
    this._previousTime = time;
};

RotatableStepAfterFreeFall.prototype = Object.create(AbstractState.prototype);

/**
 * @param {number} time
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/StepResult').StepResult}
 */
RotatableStepAfterFreeFall.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (time - this._previousTime < this._STEP_DURATION) {
        return new StepResult(currentPlayground, this, currentPiece, false);
    }

    const movedPiece = currentPiece.move(new Point(0, 1));
    if (currentPlayground.playgroundPieceFits(movedPiece)) {
        return new StepResult(currentPlayground, new FallingPieceState(time), currentPiece, true);
    } else {
        return new StepResult(currentPlayground.withPlaygroundPiece(currentPiece), new CheckFilledRowState(time), pieceProvider.getNextPiece(), true);
    }
};


/**
 * @param {Event} event
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/KeyPressResult').KeyPressResult}
 */
RotatableStepAfterFreeFall.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    const CODE_ARROW_UP = 38;
    const CODE_ARROW_LEFT = 37;
    const CODE_ARROW_RIGHT = 39;

    let knownCodes = [CODE_ARROW_UP, CODE_ARROW_LEFT, CODE_ARROW_RIGHT];

    if (!knownCodes.includes(event.keyCode)) {
        return new KeyPressResult(currentPlayground, this, currentPiece, true, false);
    }

    event.preventDefault();

    try {
        if (event.keyCode === CODE_ARROW_UP) {
            const movedPiece = currentPiece.rotate(1);
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_ARROW_LEFT) {
            const movedPiece = currentPiece.move(new Point(-1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        } else if (event.keyCode === CODE_ARROW_RIGHT) {
            const movedPiece = currentPiece.move(new Point(1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, this, movedPiece, true, false);
            }
        }

        return new KeyPressResult(currentPlayground, this, currentPiece, true, false);
    } catch (exception) {
        if (!exception instanceof CollisionException) {
            throw exception;
        }
    }
};
