/**
 *
 * @param matrix Matrix
 * @param state AbstractState
 * @param currentPiece PlaygroundPiece
 * @param shouldRedraw boolean
 * @constructor
 */
export const StepResult = function(matrix, state, currentPiece, shouldRedraw) {
    this._matrix = matrix;
    this._state = state;
    this._currentPiece = currentPiece;
    this._shouldRedraw = shouldRedraw;
};

/**
 *
 * @returns {Matrix}
 */
StepResult.prototype.getMatrix = function() {
    return this._matrix;
}

/**
 *
 * @returns {AbstractState}
 */
StepResult.prototype.getState = function() {
    return this._state;
};

/**
 *
 * @returns {PlaygroundPiece}
 */
StepResult.prototype.getCurrentPiece = function() {
    return this._currentPiece;
};

/**
 *
 * @returns {boolean}
 */
StepResult.prototype.shouldRedraw = function() {
    return this._shouldRedraw;
};
