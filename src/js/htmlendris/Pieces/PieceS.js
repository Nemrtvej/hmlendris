const PieceS = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceS.prototype = Object.create(AbstractPiece.prototype);

PieceS.prototype.getShape = function(orientation) {
    if (orientation % 2 === 0) {
        return matrixFromSquares([
            [new EmptySquare(),             new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color), new EmptySquare()],
        ]);
    } else {
        return matrixFromSquares([
            [new FilledSquare(this._color), new EmptySquare()],
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new EmptySquare(),             new FilledSquare(this._color)],
        ]);
    }
};