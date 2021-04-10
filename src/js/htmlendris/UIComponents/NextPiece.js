/**
 *
 * @param renderer CanvasRenderer
 * @param origin Point
 * @param width integer
 * @param height integer
 * @param borderWidth integer
 * @constructor
 */
const NextPiece = function(renderer, origin, width, height, borderWidth) {
    this._renderer = renderer;
    this._origin = origin;
    this._width = width;
    this._height = height;
    this._borderWidth = borderWidth;
};

/**
 *
 * @param piece AbstractPiece
 */
NextPiece.prototype.renderPiece = function(piece) {
    const shape = piece.getShape();

    this._renderer.fillNextPieceBackground();
};