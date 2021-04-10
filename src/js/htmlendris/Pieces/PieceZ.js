const PieceZ = function() {

};

PieceZ.prototype = Object.create(AbstractPiece.prototype);

PieceZ.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new FilledSquare(), new FilledSquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);
};