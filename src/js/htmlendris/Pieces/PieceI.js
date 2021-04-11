const PieceI = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceI.prototype = Object.create(AbstractPiece.prototype);

PieceI.prototype.getShape = function() {

    if (this.getOrientation() % 2 === 0) {
        return matrixFromSquares([
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
        ]);
    } else {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color), ],
        ]);
    }

};