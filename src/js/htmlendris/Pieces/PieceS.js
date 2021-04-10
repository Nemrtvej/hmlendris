const PieceS = function() {

};

PieceS.prototype = Object.create(AbstractPiece.prototype);

PieceS.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new EmptySquare(),  new FilledSquare(), new FilledSquare()],
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);};