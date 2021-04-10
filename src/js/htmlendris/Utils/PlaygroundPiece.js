/**
 *
 * @param initialPosition Point
 * @param piece AbstractPiece
 * @constructor
 */
const PlaygroundPiece = function(initialPosition, piece) {
    this._position = initialPosition;
    this._piece = piece;
};

/**
 *
 * @param vector Point
 * @returns {PlaygroundPiece}
 */
PlaygroundPiece.prototype.move = function(vector) {
    const newPosition = new Point(this.getPosition().getX() + vector.getX(), this.getPosition().getY() + vector.getY());

    return new PlaygroundPiece(newPosition, this.getPiece());
};

/**
 * @returns Point
 */
PlaygroundPiece.prototype.getPosition = function() {
    return this._position;
};

/**
 * @returns AbstractPiece
 */
PlaygroundPiece.prototype.getPiece = function() {
    return this._piece;
};