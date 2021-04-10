const PieceT = function() {

};

PieceT.prototype = Object.create(AbstractPiece.prototype);

PieceT.prototype.getShape = function() {
    return matrixFromSquares([
        [new EmptySquare(), new FilledSquare(), new FilledSquare(), new FilledSquare()],
        [new EmptySquare(), new EmptySquare(),  new FilledSquare(), new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
        [new EmptySquare(), new EmptySquare(),  new EmptySquare(),  new EmptySquare()],
    ]);};