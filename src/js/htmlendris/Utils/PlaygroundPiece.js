import {Point} from '/js/htmlendris/Utils/Point.js';

/**
 *
 * @param initialPosition Point
 * @param piece AbstractPiece
 * @param orientation integer
 * @constructor
 */
export const PlaygroundPiece = function(initialPosition, piece, orientation) {
    this._position = initialPosition;
    this._piece = piece;
    this._orientation = orientation;
};

/**
 *
 * @param vector Point
 * @returns {PlaygroundPiece}
 */
PlaygroundPiece.prototype.move = function(vector) {
    const newPosition = new Point(this.getPosition().getX() + vector.getX(), this.getPosition().getY() + vector.getY());

    return new PlaygroundPiece(newPosition, this._piece, this._orientation);
};

/**
 *
 * @param rotation integer
 * @returns {PlaygroundPiece}
 */
PlaygroundPiece.prototype.rotate = function(rotation) {
    return new PlaygroundPiece(this.getPosition(), this._piece, (this._orientation + rotation) % 4);
}

/**
 * @returns Point
 */
PlaygroundPiece.prototype.getPosition = function() {
    return this._position;
};

PlaygroundPiece.prototype.getShape = function() {
    return this._piece.getShape(this._orientation);
};