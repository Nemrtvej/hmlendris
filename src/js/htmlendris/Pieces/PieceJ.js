const PieceJ = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceJ.prototype = Object.create(AbstractPiece.prototype);

PieceJ.prototype.getShape = function(orientation) {
    if (orientation === 0) {
        return matrixFromSquares([
            [new EmptySquare(),             new FilledSquare(this._color)],
            [new EmptySquare(),             new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else if (orientation === 1) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new EmptySquare(),             new EmptySquare()],
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else if (orientation === 2) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new EmptySquare()],
            [new FilledSquare(this._color), new EmptySquare()],
        ]);
    } else if (orientation === 3) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
            [new EmptySquare(),            new EmptySquare(),              new FilledSquare(this._color)],
        ]);
    }
};