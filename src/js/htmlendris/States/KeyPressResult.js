/**
 *
 * @param matrix Matrix
 * @param currentPiece PlaygroundPiece
 * @constructor
 */
const KeyPressResult = function(matrix, currentPiece) {
    this._matrix = matrix;
    this._currentPiece = currentPiece
};

/**
 *
 * @returns {Matrix}
 */
KeyPressResult.prototype.getMatrix = function() {
    return this._matrix;
}

/**
 *
 * @returns {PlaygroundPiece}
 */
KeyPressResult.prototype.getCurrentPiece = function() {
    return this._currentPiece;
}