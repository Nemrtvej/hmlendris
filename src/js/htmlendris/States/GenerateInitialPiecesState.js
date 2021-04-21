const GenerateInitialPiecesState = function(initialTime = 0) {
    this._previousTime = initialTime;
};

GenerateInitialPiecesState.prototype = Object.create(AbstractState.prototype);

/**
 * @param time double
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 *
 * @returns {StepResult}
 */
GenerateInitialPiecesState.prototype.tick = function(time, currentPlayground, currentPiece, pieceProvider, renderer) {
    const filledMatrix = this._fillMatrix(currentPlayground.getCols(), currentPlayground.getRows());

    return new StepResult(filledMatrix, new FallingPieceState(this._previousTime), currentPiece, true);
};


/**
 * @param event
 * @param currentPlayground Matrix
 * @param currentPiece PlaygroundPiece
 * @param pieceProvider PieceProvider
 * @param renderer CanvasRenderer
 * @return {KeyPressResult}
 */
GenerateInitialPiecesState.prototype.onKeyPress = function(event, currentPlayground, currentPiece, pieceProvider, renderer) {
    const delegate = new FallingPieceState();
    const stateFromFallingPiece = delegate.onKeyPress(event, currentPlayground, currentPiece, renderer);
    return new KeyPressResult(
        stateFromFallingPiece.getMatrix(),
        this,
        stateFromFallingPiece.getCurrentPiece(),
        true,
        false
    );
};

/**
 *
 * @param cols integer
 * @param rows integer
 * @returns {Matrix}
 * @private
 */
GenerateInitialPiecesState.prototype._fillMatrix = function(cols, rows) {
    const solidPieceGenerators = [];
    solidPieceGenerators.push((color) => new FilledSquare(color));

    const colors = [];
    colors.push('red');
    colors.push('green');
    colors.push('yellow');
    colors.push('pink');
    colors.push('violet');
    colors.push('white');

    let newMatrix = new Matrix(cols, rows);

    for (let rowIndex = Math.ceil(rows / 2); rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            const shouldFill = Math.random() > 0.1;
            if (!shouldFill) {
                continue;
            }
            let pieceColor = colors[Math.floor(Math.random() * colors.length)];
            newMatrix = newMatrix.withSquare(
                rowIndex,
                colIndex,
                solidPieceGenerators[Math.floor(Math.random() * solidPieceGenerators.length)](pieceColor)
            );
        }
    }

    return newMatrix;
};