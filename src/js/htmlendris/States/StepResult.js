/**
 *
 * @param matrix Matrix
 * @param state AbstractState
 * @param currentPiece PlaygroundPiece
 * @constructor
 */
const StepResult = function(matrix, state, currentPiece) {
    this._matrix = matrix;
    this._state = state;
    this._currentPiece = currentPiece
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
}

/**
 *
 * @returns {PlaygroundPiece}
 */
StepResult.prototype.getCurrentPiece = function() {
    return this._currentPiece;
}