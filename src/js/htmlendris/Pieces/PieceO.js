import {AbstractPiece} from './AbstractPiece.js'
import {FilledSquare} from "/js/htmlendris/Squares/FilledSquare.js";
import {matrixFromSquares} from "/js/htmlendris/Utils/Matrix.js";

export const PieceO = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

PieceO.prototype = Object.create(AbstractPiece.prototype);

PieceO.prototype.getShape = function(orientation) {
    return matrixFromSquares([
        [new FilledSquare(this._color), new FilledSquare(this._color)],
        [new FilledSquare(this._color), new FilledSquare(this._color)],
    ]);
};