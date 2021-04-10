const PieceJ = function() {

};

PieceJ.prototype = Object.create(AbstractPiece.prototype);

PieceJ.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new EmptySquare(),  new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);
};