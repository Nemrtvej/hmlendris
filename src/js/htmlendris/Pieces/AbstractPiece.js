const AbstractPiece = function() {
    /*
     * 0 = top
     * 1 = right
     * 2 = bottom
     * 3 = left
     * */
    this._orientation = 0;
};

/**
 * @returns {(AbstractSquare[])[]}
 */
AbstractPiece.prototype.getShape = function() {
    throw new Exception('getShape must be implemented');
};

/**
 *
 * @returns {number}
 */
AbstractPiece.prototype.getPieceCost = function() {
  return 1;
};

/**
 * @returns {number}
 */
AbstractPiece.prototype.getOrientation = function() {
    return this._orientation;
}

AbstractPiece.prototype.rotateRight = function() {
    this._orientation = (this._orientation + 1) % 4;
};

AbstractPiece.prototype.rotateLeft = function() {
    this._orientation = (this._orientation + 1) % 4;
}
