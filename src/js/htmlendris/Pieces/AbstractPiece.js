const AbstractPiece = function() {

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