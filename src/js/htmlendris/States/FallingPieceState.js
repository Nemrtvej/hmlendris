const FallingPieceState = function() {

};

FallingPieceState.prototype = Object.create(AbstractState.prototype);

/**
 *
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 *
 * @returns {StepResult}
 */
FallingPieceState.prototype.step = function(currentPlayground, currentPiece, pieceProvider) {

    const movedPiece = currentPiece.move(new Point(0, 1));

    if (currentPlayground.playgroundPieceFits(movedPiece)) {
        return new StepResult(currentPlayground, this, movedPiece);
    } else {
        return new StepResult(currentPlayground.withPlaygroundPiece(currentPiece), this, pieceProvider.getNextPiece());
    }
};


/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @return {KeyPressResult}
 */
FallingPieceState.prototype.onKeyPress = function(event, currentPlayground, currentPiece) {

    const CODE_ARROW_UP = 38;
    const CODE_ARROW_LEFT = 37;
    const CODE_ARROW_RIGHT = 39;
    const CODE_ARROW_DOWN = 40;

    let knownCodes = [CODE_ARROW_UP, CODE_ARROW_LEFT, CODE_ARROW_RIGHT, CODE_ARROW_DOWN];

    if (!knownCodes.includes(event.keyCode)) {
        return new KeyPressResult(currentPlayground, currentPiece);
    }

    event.preventDefault();

    try {
        if (event.keyCode === CODE_ARROW_UP) {
            const movedPiece = currentPiece.rotate(1);
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, movedPiece);
            }
        } else if (event.keyCode === CODE_ARROW_LEFT) {
            const movedPiece = currentPiece.move(new Point(-1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, movedPiece);
            }
        } else if (event.keyCode === CODE_ARROW_RIGHT) {
            const movedPiece = currentPiece.move(new Point(1, 0));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, movedPiece);
            }
        } else if (event.keyCode === CODE_ARROW_DOWN) {
            const movedPiece = currentPiece.move(new Point(0, 1));
            if (currentPlayground.playgroundPieceFits(movedPiece)) {
                return new KeyPressResult(currentPlayground, movedPiece);
            }
        }

        return new KeyPressResult(currentPlayground, currentPiece);
    } catch (exception) {
        debugger;
        if (!exception instanceof CollisionException) {
            throw exception;
        }
    }
};