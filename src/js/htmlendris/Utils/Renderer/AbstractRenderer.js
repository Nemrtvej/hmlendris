export const AbstractRenderer = function() {

};


AbstractRenderer.prototype.render = function(matrix) {
    throw new Exception('Method render is not implemented');
};

AbstractRenderer.prototype.drawFilledSquare = function(colIndex, rowIndex, color) {
    throw new Exception('Method drawFilledSquare is not implemented');
};

AbstractRenderer.prototype.drawPausedScreen = function() {
    throw new Exception('Method drawPausedScreen is not implemented');
};

AbstractRenderer.prototype.drawGameOverScreen = function() {
    throw new Exception('Method drawGameOverScreen is not implemented');
};

AbstractRenderer.prototype.drawEmptySquare = function(colIndex, rowIndex) {
    throw new Exception('Method drawEmptySquare is not implemented');
};

AbstractRenderer.prototype.fillGeneralBackground = function() {
    throw new Exception('Method fillGeneralBackground is not implemented');
};

AbstractRenderer.prototype.fillNextPieceBackground = function() {
    throw new Exception('Method fillNextPieceBackground is not implemented');
};

