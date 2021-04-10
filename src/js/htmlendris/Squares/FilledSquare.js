const FilledSquare = function () {

};

FilledSquare.prototype = Object.create(AbstractSquare.prototype);

/**
 *
 * @param renderer CanvasRenderer
 * @param colIndex integer
 * @param rowIndex integer
 */
FilledSquare.prototype.render = function(renderer, colIndex, rowIndex) {
    renderer.drawFilledSquare(colIndex, rowIndex);
};

/**
 *
 * @param otherPiece AbstractSquare
 * @returns {AbstractSquare}
 */
FilledSquare.prototype.resolveCollision = function(otherPiece) {
    console.log(this);
    if (otherPiece instanceof EmptySquare) {
        return this;
    }

    throw new Exception('Collision between two Filled Squares may not occur');
};


FilledSquare.prototype.toString = function() {
    return "x";
}