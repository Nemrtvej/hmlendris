const PieceL = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceL.prototype = Object.create(AbstractPiece.prototype);

PieceL.prototype.getShape = function() {
    if (this.getOrientation() === 0) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new EmptySquare(),],
            [new FilledSquare(this._color), new EmptySquare(),],
            [new FilledSquare(this._color), new FilledSquare(this._color),],
        ]);
    } else if (this.getOrientation() === 1) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new EmptySquare(),  new EmptySquare()],
        ]);
    } else if (this.getOrientation() === 2) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new EmptySquare(),  new FilledSquare(this._color)],
            [new EmptySquare(),  new FilledSquare(this._color)],
        ]);
    } else if (this.getOrientation() === 3) {
        return matrixFromSquares([
            [new EmptySquare(),  new EmptySquare(),  new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    }
};