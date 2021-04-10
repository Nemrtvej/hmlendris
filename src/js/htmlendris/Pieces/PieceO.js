const PieceO = function() {

};

PieceO.prototype = Object.create(AbstractPiece.prototype);

PieceO.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);
};