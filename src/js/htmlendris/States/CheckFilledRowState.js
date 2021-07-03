import {AbstractState} from "./AbstractState.js";
import {NewPieceState} from "./NewPieceState.js";
import {StepResult} from "./StateResult/StepResult.js";
import {KeyPressResult} from "./StateResult/KeyPressResult.js";

export const CheckFilledRowState = function(initialTime = 0) {
    this._time = initialTime;
    this._previouslyProcessedRow = null;
};

CheckFilledRowState.prototype = Object.create(AbstractState.prototype);


/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer AbstractRenderer
 *
 * @returns {StepResult}
 */
CheckFilledRowState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    if (this._previouslyProcessedRow === null) {
        this._previouslyProcessedRow = currentPlayground.getRows();
    }
    const currentRow = this._previouslyProcessedRow - 1;

    if (this._previouslyProcessedRow >= 0) {
        if (this._isRowFilled(currentRow, currentPlayground)) {
            currentPlayground = currentPlayground.removeRow(currentRow).getMatrix();
        } else {
            this._previouslyProcessedRow = currentRow;
        }
    }

    if (this._previouslyProcessedRow === 0) {
        return new StepResult(currentPlayground, new NewPieceState(this._time), currentPiece, true);
    } else {
        return new StepResult(currentPlayground, this, currentPiece, true);
    }
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer AbstractRenderer
 * @return {KeyPressResult}
 */
CheckFilledRowState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    return new KeyPressResult(currentPlayground, this, currentPiece, false, false);
};


/**
 *
 * @param rowIndex integer
 * @param playground Matrix
 * @returns {boolean}
 * @private
 */
CheckFilledRowState.prototype._isRowFilled = function(rowIndex, playground) {
    let isRowFilled = true;
    console.log(playground);
    for (let columnIndex = 0; columnIndex < playground.getCols(); columnIndex++) {
        console.log(rowIndex, columnIndex);
        isRowFilled = isRowFilled && playground.getSquare(rowIndex, columnIndex).isFilled();
    }

    return isRowFilled;
};
