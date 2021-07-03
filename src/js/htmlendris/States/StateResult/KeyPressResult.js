/**
 *
 * @param matrix Matrix
 * @param state AbstractState
 * @param currentPiece PlaygroundPiece
 * @param shouldRedraw bool
 * @param shouldReset bool
 * @constructor
 */
export const KeyPressResult = function(matrix, state, currentPiece, shouldRedraw, shouldReset) {
    this._matrix = matrix;
    this._state = state;
    this._currentPiece = currentPiece
    this._shouldRedraw = shouldRedraw;
    this._shouldReset = shouldReset;
};

/**
 *
 * @returns {Matrix}
 */
KeyPressResult.prototype.getMatrix = function() {
    return this._matrix;
};

/**
 *
 * @returns {AbstractState}
 */
KeyPressResult.prototype.getState = function() {
    return this._state;
};

/**
 *
 * @returns {PlaygroundPiece}
 */
KeyPressResult.prototype.getCurrentPiece = function() {
    return this._currentPiece;
};

/**
 *
 * @returns {boolean}
 */
KeyPressResult.prototype.shouldRedraw = function() {
    return this._shouldRedraw;
};

/**
 *
 * @returns {boolean}
 */
KeyPressResult.prototype.shouldReset = function() {
    return this._shouldReset;
};
