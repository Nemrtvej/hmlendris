import {CollisionException} from "/js/htmlendris/Exceptions/CollisionException.js";
import {EmptySquare} from "/js/htmlendris/Squares/EmptySquare.js";
import {OutOfBoundsException} from "/js/htmlendris/Exceptions/OutOfBoundsException.js";
import {RemoveRowResponse} from "/js/htmlendris/Utils/Matrix/RemoveRowResponse.js";

export const matrixFromSquares = function(squares) {
    let rows = squares.length;
    let cols = rows > 0 ? squares[0].length: 0;

    const newMatrix = new Matrix(cols, rows);
    newMatrix._setSquares(squares);

    return newMatrix;
}

export const Matrix = function(cols, rows) {
    this._cols = cols;
    this._rows = rows;

    this._squares = this._generateSquares(cols, rows);
};


/**
 * @param colIndex integer
 * @param rowIndex integer
 * @param pieceShape Matrix
 * @returns {Matrix}
 */
Matrix.prototype.withPiece = function(colIndex, rowIndex, pieceShape) {
    const shapeRows = pieceShape.getRows();
    const shapeCols = pieceShape.getCols();

    let copy = this.withSquare(0, 0, this.getSquare(0, 0));
    for (let heightIndex = 0; heightIndex < shapeRows; heightIndex++) {
        for (let widthIndex = 0; widthIndex < shapeCols; widthIndex++) {
            try {
                const currentSquare = this.getSquare(heightIndex + rowIndex, widthIndex + colIndex);
                const newSquare = pieceShape.getSquare(heightIndex, widthIndex);
                copy = copy.withSquare(heightIndex + rowIndex, widthIndex + colIndex, currentSquare.resolveCollision(newSquare));
            } catch (exception) {
                if (exception instanceof OutOfBoundsException) {
                    throw new CollisionException();
                } else {
                    throw exception;
                }
            }
        }
    }

    return copy;
}

/**
 * @param colIndex integer
 * @param rowIndex integer
 * @param pieceShape Matrix
 * @returns {Matrix}
 */
Matrix.prototype.withForcedPiece = function(colIndex, rowIndex, pieceShape) {
    const shapeRows = pieceShape.getRows();
    const shapeCols = pieceShape.getCols();

    let copy = this.withSquare(0, 0, this.getSquare(0, 0));
    for (let heightIndex = 0; heightIndex < shapeRows; heightIndex++) {
        for (let widthIndex = 0; widthIndex < shapeCols; widthIndex++) {
            try {
                const newSquare = pieceShape.getSquare(heightIndex, widthIndex);
                const currentSquare = this.getSquare(heightIndex + rowIndex, widthIndex + colIndex);
                try {
                    copy = copy.withSquare(heightIndex + rowIndex, widthIndex + colIndex, currentSquare.resolveCollision(newSquare));
                } catch (exception) {
                    if (exception instanceof CollisionException) {
                        copy = copy.withSquare(heightIndex + rowIndex, widthIndex + colIndex, newSquare);
                    }
                }
            } catch (exception) {
                if (exception instanceof OutOfBoundsException) {
                    throw new CollisionException();
                } else {
                    throw exception;
                }
            }
        }
    }

    return copy;
}

/**
 *
 * @param playgroundPiece PlaygroundPiece
 * @returns {Matrix}
 */
Matrix.prototype.withPlaygroundPiece = function(playgroundPiece) {
    return this.withPiece(
        playgroundPiece.getPosition().getX(),
        playgroundPiece.getPosition().getY(),
        playgroundPiece.getShape()
    );
};

/**
 *
 * @param playgroundPiece PlaygroundPiece
 * @returns {boolean}
 */
Matrix.prototype.playgroundPieceFits = function(playgroundPiece) {
    try {
        this.withPiece(
            playgroundPiece.getPosition().getX(),
            playgroundPiece.getPosition().getY(),
            playgroundPiece.getShape()
        );
        return true;
    } catch (exception) {
        return !exception instanceof CollisionException;
    }
};

/**
 * @returns int
 */
Matrix.prototype.getCols = function() {
    if (this.getRows() === 0) {
        return 0;
    }

    return this._squares[0].length;
}

/**
 *
 * @returns int
 */
Matrix.prototype.getRows = function() {
    return this._squares.length;
}

/**
 *
 * @param row integer
 * @param column integer
 * @returns {AbstractSquare}
 */
Matrix.prototype.getSquare = function(row, column) {
    if (row < 0 || column < 0 || row >= this.getRows() || column >= this.getCols()) {
        throw new OutOfBoundsException(`Matrix coordinate [${column}, ${row}] is out of bounds.`);
    }

    return this._squares[row][column];
}


/**
 *
 * @param row integer
 * @param column integer
 * @param square AbstractSquare
 * @private
 */
Matrix.prototype.withSquare = function(row, column, square) {
    let copy = [];

    for (let rowIndex = 0; rowIndex < this.getRows(); rowIndex++) {
        copy[rowIndex] = [];
        for (let colIndex = 0; colIndex < this.getCols(); colIndex++) {
            if (row === rowIndex && column === colIndex) {
                copy[rowIndex][colIndex] = square;
            } else {
                copy[rowIndex][colIndex] = this.getSquare(rowIndex, colIndex);
            }
        }
    }

    return matrixFromSquares(copy);
}

/**
 * @param rowToRemove integer
 * @returns {RemoveRowResponse}
 */
Matrix.prototype.removeRow = function(rowToRemove) {

    let newMatrix = new Matrix(this._cols, this._rows);
    const removedData = this._getRow(rowToRemove);

    for (let currentRow = this._rows -1; currentRow >= 0; currentRow--) {
        if (currentRow === 0) {
            newMatrix._setRow(currentRow, this._generateSquares(this._cols, 1)[0]);
        } else if (currentRow > rowToRemove) {
            newMatrix._setRow(currentRow, this._getRow(currentRow));
        } else if (currentRow <= rowToRemove) {
            newMatrix._setRow(currentRow, this._getRow(currentRow-1));
        }
    }

    return new RemoveRowResponse(newMatrix, removedData);
};

/**
 * @param rowIndex integer
 * @param squares AbstractSquare[]
 * @private
 */
Matrix.prototype._setRow = function(rowIndex, squares) {
    this._squares[rowIndex] = squares;
};

/**
 * @param rowIndex integer
 * @return AbstractSquare[]
 * @private
 */
Matrix.prototype._getRow = function(rowIndex) {
    /* suggestion: maybe clone this one day? */
    return this._squares[rowIndex];
};

/**
 * @param cols integer
 * @param rows integer
 * @returns list[list[AbstractSquare]]
 * @private
 */
Matrix.prototype._generateSquares = function(cols, rows) {
    let data = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let generatedRow = [];
        for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
            generatedRow.push(new EmptySquare());
        }
        data.push(generatedRow);
    }

    return data;
};

/**
 * @param squares list[list[AbstractSquare]]
 * @private
 */
Matrix.prototype._setSquares = function(squares) {
    this._squares = squares;
}
