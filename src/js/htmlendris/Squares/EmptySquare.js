const EmptySquare = function () {

};

EmptySquare.prototype = Object.create(AbstractSquare.prototype);

/**
 *
 * @param renderer CanvasRenderer
 * @param colIndex integer
 * @param rowIndex integer
 */
EmptySquare.prototype.render = function(renderer, colIndex, rowIndex) {
    renderer.drawEmptySquare(colIndex, rowIndex);
};

/**
 *
 * @param otherPiece AbstractSquare
 * @returns {AbstractSquare}
 */
EmptySquare.prototype.resolveCollision = function(otherPiece) {
    return otherPiece;
};

EmptySquare.prototype.toString = function() {
    return "-";
}

EmptySquare.prototype.isFilled = function() {
    return false;
};