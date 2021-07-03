export const AbstractSquare = function() {

};

/**
 *
 * @param renderer CanvasRenderer
 * @param colIndex integer
 * @param rowIndex integer
 */
AbstractSquare.prototype.render = function(renderer, colIndex, rowIndex) {
    throw new Exception('render must be implemented');
};

/**
 *
 * @param otherPiece AbstractSquare
 * @returns {AbstractSquare}
 */
AbstractSquare.prototype.resolveCollision = function(otherPiece) {
    throw new Exception('resolveCollision must be implemented');
};


AbstractSquare.prototype.toString = function() {
    throw new Exception('toString must be implemented');
}

AbstractSquare.prototype.isFilled = function() {
    throw new Exception('isFilled must be implemented');
};