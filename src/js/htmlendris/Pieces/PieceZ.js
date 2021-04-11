const PieceZ = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceZ.prototype = Object.create(AbstractPiece.prototype);

PieceZ.prototype.getShape = function() {
    if (this.getOrientation() % 2 === 0) {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new EmptySquare()],
            [new EmptySquare(),  new FilledSquare(this._color), new FilledSquare(this._color)],
        ]);
    } else {
        return matrixFromSquares([
            [new EmptySquare(),  new FilledSquare(this._color)],
            [new FilledSquare(this._color), new FilledSquare(this._color)],
            [new FilledSquare(this._color), new EmptySquare()],
        ]);
    }
};