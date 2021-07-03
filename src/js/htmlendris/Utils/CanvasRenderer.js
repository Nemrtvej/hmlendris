const Colors = {
    BACKGROUND_TOP: '#1179A2',
    BACKGROUND_BOTTOM: '#000000',
};



export const CanvasRenderer = function(wallCanvas, cols, rows, blockSize) {
    this._wallCanvas = wallCanvas;
    this._blockSize = blockSize;
    this._cols = cols;
    this._rows = rows;

    this._ctx = this._initialize();

    this._NEXT_PIECE_X = 5;
    this._NEXT_PIECE_Y = 5;
    this._NEXT_PIECE_HEIGHT = 20;
    this._NEXT_PIECE_WIDTH = 10;

    this._GENERAL_WIDTH = 50;
    this._GENERAL_HEIGHT = 50;
};

/**
 *
 * @param matrix Matrix
 */
CanvasRenderer.prototype.render = function(matrix) {
    for (let rowIndex = 0; rowIndex < matrix.getRows(); rowIndex++) {
        for (let colIndex = 0; colIndex < matrix.getCols(); colIndex++) {
            matrix.getSquare(rowIndex, colIndex).render(this, colIndex, rowIndex);
        }
    }
};


/**
 *
 * @param colIndex integer
 * @param rowIndex integer
 * @param color string
 */
CanvasRenderer.prototype.drawFilledSquare = function(colIndex, rowIndex, color) {
    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(colIndex * this._blockSize, rowIndex * this._blockSize, this._blockSize, this._blockSize);
    this._ctx.fillStyle = color;
    let thickness = 0.1;
    this._ctx.fillRect(
        (colIndex * this._blockSize) + thickness,
        (rowIndex * this._blockSize) + thickness,
        this._blockSize - thickness * 2,
        this._blockSize - thickness * 2
    );
    //this._ctx.scale(this._blockSize, this._blockSize);
}


/**
 */
CanvasRenderer.prototype.drawPausedScreen = function() {
    this._ctx.fillStyle = '#00d7d7';
    this._ctx.fillRect(0, 0, this._cols * this._blockSize, this._rows * this._blockSize);
    this._ctx.fillStyle = '#fff';

    const pausedMeasurements = this._ctx.measureText("PAUSED");
    this._ctx.fillText("PAUSED", (this._cols * this._blockSize / 2) - (pausedMeasurements.width /2), this._rows * this._blockSize / 2);
}

CanvasRenderer.prototype.drawGameOverScreen = function() {
    this._ctx.fillStyle = '#00d7d7';
    this._ctx.fillRect(0, 0, this._cols * this._blockSize, this._rows * this._blockSize);
    this._ctx.fillStyle = '#fff';

    const pausedMeasurements = this._ctx.measureText("You lost :(");
    this._ctx.fillText("You lost :(", (this._cols * this._blockSize / 2) - (pausedMeasurements.width /2), this._rows * this._blockSize / 2);
}


CanvasRenderer.prototype.drawEmptySquare = function(colIndex, rowIndex) {

    if (rowIndex < Math.floor(this._rows / 2 )) {
        this._ctx.fillStyle = Colors.BACKGROUND_TOP;
    } else {
        this._ctx.fillStyle = Colors.BACKGROUND_BOTTOM;
    }
    this._ctx.fillRect(colIndex * this._blockSize, rowIndex * this._blockSize, this._blockSize, this._blockSize);
}

CanvasRenderer.prototype.fillGeneralBackground = function() {
    this._ctx.fillStyle = '#00d7d7';
    this._ctx.fillRect(0, 0, this._cols * this._blockSize, this._rows * this._blockSize);
}

CanvasRenderer.prototype.fillNextPieceBackground = function() {
    return;
    this._ctx.fillStyle = '#000000'
    this._ctx.fillRect(this._NEXT_PIECE_X, this._NEXT_PIECE_Y, this._NEXT_PIECE_WIDTH, this._NEXT_PIECE_HEIGHT);
    //this._ctx.font = '12px serif';
    this._ctx.fillStyle = '#dfdf00';
    this._ctx.fillText("NEXT",  this._NEXT_PIECE_X, this._NEXT_PIECE_Y, this._NEXT_PIECE_WIDTH);
    this._ctx.fillText("PIECE",  this._NEXT_PIECE_X, this._NEXT_PIECE_Y + 12, this._NEXT_PIECE_WIDTH);

};

/**
 *
 * @private
 */
CanvasRenderer.prototype._initialize = function() {

    const ctx = this._wallCanvas.getContext('2d');

    ctx.canvas.width = this._cols * this._blockSize;
    ctx.canvas.height = this._rows * this._blockSize;

    //ctx.scale(this._blockSize, this._blockSize);
    // ctx.scale(4, 4);

    return ctx;
};