
$(document).ready(function() {
    main();
});


function main() {
    const COLS = 14;
    const ROWS = 22;
    const BLOCK_SIZE = 10;

    const wallCanvas = document.getElementById('playground-wall');
    const canvasRenderer = new CanvasRenderer(wallCanvas, COLS, ROWS, BLOCK_SIZE);

    const tetris = new Tetris(COLS, ROWS, canvasRenderer);
    tetris.reset();

    setInterval(tetris.step.bind(tetris), 1000);
    document.addEventListener('keydown', tetris.onKeyDown.bind(tetris));

    return;
    const testPiece = new PieceL();
    const matrixWithPiece = tetris.showPiece(0, 0, testPiece);

    // canvasRenderer.render(matrixWithPiece);
};