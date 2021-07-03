import {AbstractState} from "./AbstractState.js";
import {GameOverState} from "./GameOverState.js";
import {FallingPieceState} from "./FallingPieceState.js";
import {StepResult} from "./StateResult/StepResult.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";


export const NewPieceState = function(initialTime = 0) {
    this._STEP_DURATION = 1000;
    this._previousTime = initialTime;
};

NewPieceState.prototype = Object.create(AbstractState.prototype);


/**
 * @param {number} time
 * @param {import('/js/htmlendris/Utils/Matrix').Matrix} currentPlayground
 * @param {import('/js/htmlendris/Pieces/AbstractPiece').AbstractPiece} currentPiece
 * @param {import('/js/htmlendris/Utils/PieceProvider').PieceProvider} pieceProvider
 * @param {import('/js/htmlendris/Utils/Renderer/AbstractRenderer').AbstractRenderer} renderer
 * @return {import('./StateResult/StepResult').StepResult}
 */
NewPieceState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (time - this._previousTime < this._STEP_DURATION) {
        return new StepResult(currentPlayground, this, currentPiece, false);
    } else {
        this._previousTime = time;
    }

    if (currentPlayground.playgroundPieceFits(currentPiece)) {
        const delegate = new FallingPieceState();
        return delegate.tick(time, currentPlayground, currentPiece, pieceProvider, renderer);
    } else {
        const delegate = new GameOverState();
        return delegate.tick(time, currentPlayground, currentPiece, pieceProvider, renderer);
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
