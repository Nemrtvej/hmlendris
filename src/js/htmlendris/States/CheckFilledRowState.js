const CheckFilledRowState = function(initialTime = 0) {
    this._time = initialTime;
};

CheckFilledRowState.prototype = Object.create(AbstractState.prototype);


/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
CheckFilledRowState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {

    for (let currentRow = currentPlayground.getRows() - 1; currentRow >= 0; currentRow--) {
        if (this._isRowFilled(currentRow, currentPlayground)) {
            currentPlayground = currentPlayground.removeRow(currentRow).getMatrix();
            currentRow++; // make sure to recheck the row we just sent down in case it is filled to
        }
    }

    return new StepResult(currentPlayground, new NewPieceState(this._time), currentPiece, true);
};

/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
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
