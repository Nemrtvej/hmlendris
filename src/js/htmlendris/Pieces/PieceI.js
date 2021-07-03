import {AbstractPiece} from './AbstractPiece.js'
import {FilledSquare} from "/js/htmlendris/Squares/FilledSquare.js";
import {matrixFromSquares} from "/js/htmlendris/Utils/Matrix.js";

export const PieceI = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceI.prototype = Object.create(AbstractPiece.prototype);

PieceI.prototype.getShape = function(orientation) {

    if (orientation % 2 === 0) {
        return matrixFromSquares([
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
            [new FilledSquare(this._color)],
        ]);
    } else {
        return matrixFromSquares([
            [new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color), new FilledSquare(this._color), ],
        ]);
    }

};
