const PieceO = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceO.prototype = Object.create(AbstractPiece.prototype);

PieceO.prototype.getShape = function() {
    return matrixFromSquares([
        [new FilledSquare(this._color), new FilledSquare(this._color)],
        [new FilledSquare(this._color), new FilledSquare(this._color)],
    ]);
};