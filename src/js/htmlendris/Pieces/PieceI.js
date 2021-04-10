const PieceI = function() {

};

PieceI.prototype = Object.create(AbstractPiece.prototype);

PieceI.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new EmptySquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(), new FilledSquare(), new EmptySquare()],
    ]);
};