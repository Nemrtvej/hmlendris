/**
 *
 * @param matrix Matrix
 * @param removedRow AbstractSquare[]
 */
export const RemoveRowResponse = function(matrix, removedRow) {
    this._matrix = matrix;
    this._removedRow = removedRow;
};

RemoveRowResponse.prototype.getMatrix = function() {
    return this._matrix;
};

RemoveRowResponse.prototype.getRemovedRow = function() {
    return this._removedRow;
};
