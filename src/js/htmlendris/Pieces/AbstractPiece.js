const AbstractPiece = function() {

};

/**
 * Orientation:
 *  - 0 = top
 *  - 1 = right
 *  - 2 = bottom
 *  - 3 = left
 *
 * @param orientation integer
 * @returns {(AbstractSquare[])[]}
 */
AbstractPiece.prototype.getShape = function(orientation) {
    throw new Exception('getShape must be implemented');
};

/**
 *
 * @returns {number}
 */
AbstractPiece.prototype.getPieceCost = function() {
  return 1;
};
