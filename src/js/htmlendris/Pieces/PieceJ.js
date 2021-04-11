const PieceJ = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceJ.prototype = Object.create(AbstractPiece.prototype);

PieceJ.prototype.getShape = function() {
    if (this.getOrientation() === 0) {
        return matrixFromSquares([
            [new EmptySquare(),             new FilledSquare(this._color)],
            [new EmptySquare(),             new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else if (this.getOrientation() === 1) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new EmptySquare(),             new EmptySquare()],
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else if (this.getOrientation() === 2) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new EmptySquare()],
            [new FilledSquare(this._color), new EmptySquare()],
        ]);
    } else if (this.getOrientation() === 3) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
            [new EmptySquare(),            new EmptySquare(),              new FilledSquare(this._color)],
        ]);
    }
};