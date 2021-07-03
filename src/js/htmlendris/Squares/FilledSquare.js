import {AbstractSquare} from "./AbstractSquare.js";
import {CollisionException} from "/js/htmlendris/Exceptions/CollisionException.js";
import {EmptySquare} from "./EmptySquare.js";

export const FilledSquare = function (color) {
    this._color = color;
};

FilledSquare.prototype = Object.create(AbstractSquare.prototype);

/**
 *
 * @param renderer CanvasRenderer
 * @param colIndex integer
 * @param rowIndex integer
 */
FilledSquare.prototype.render = function(renderer, colIndex, rowIndex) {
    renderer.drawFilledSquare(colIndex, rowIndex, this._color);
};

/**
 *
 * @param otherPiece AbstractSquare
 * @returns {AbstractSquare}
 */
FilledSquare.prototype.resolveCollision = function(otherPiece) {
    if (otherPiece instanceof EmptySquare) {
        return this;
    }

    throw new CollisionException('Collision between two Filled Squares would occur.');
};

FilledSquare.prototype.toString = function() {
    return "x";
}

FilledSquare.prototype.isFilled = function() {
    return true;
};