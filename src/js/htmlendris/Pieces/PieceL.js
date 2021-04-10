const PieceL = function() {

};

PieceL.prototype = Object.create(AbstractPiece.prototype);

PieceL.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new FilledSquare(), new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new FilledSquare(), new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);
};