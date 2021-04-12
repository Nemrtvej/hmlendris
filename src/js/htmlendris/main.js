
$(document).ready(function() {
    main();
});


function main() {
    const COLS = 14;
    const ROWS = 22;
    const BLOCK_SIZE = 10;

    const wallCanvas = document.getElementById('playground-wall');
    const canvasRenderer = new CanvasRenderer(wallCanvas, COLS, ROWS, BLOCK_SIZE);
    const pieceProvider = new PieceProvider(COLS, ROWS);

    const tetris = new Tetris(COLS, ROWS, canvasRenderer, pieceProvider);
    tetris.reset();
    tetris.start();

    document.addEventListener('keydown', tetris.onKeyDown.bind(tetris));
};