import {AbstractPiece} from './AbstractPiece.js'

export const NullPiece = function(color) {
    this._color = color;
    AbstractPiece.call(this);
};

NullPiece.prototype = Object.create(AbstractPiece.prototype);

NullPiece.prototype.getShape = function(orientation) {
    return [];
};
