import {AbstractRenderer} from "./AbstractRenderer.js";

export const NullRenderer = function() {

};

NullRenderer.prototype = Object.create(AbstractRenderer.prototype);


NullRenderer.prototype.render = function(matrix) {
    // nop
};

NullRenderer.prototype.drawFilledSquare = function(colIndex, rowIndex, color) {
    // nop
};

NullRenderer.prototype.drawPausedScreen = function() {
    // nop
};

NullRenderer.prototype.drawGameOverScreen = function() {
    // nop
};

NullRenderer.prototype.drawEmptySquare = function(colIndex, rowIndex) {
    // nop
};

NullRenderer.prototype.fillGeneralBackground = function() {
    // nop
};

NullRenderer.prototype.fillNextPieceBackground = function() {
    // nop
};

