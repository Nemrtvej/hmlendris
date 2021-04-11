
$(document).ready(function() {
    main();
});


function main() {
    //const COLS = 14;
    //const ROWS = 22;
    const BLOCK_SIZE = 10;

    const COLS = 5;
    const ROWS = 5;

    const wallCanvas = document.getElementById('playground-wall');
    const canvasRenderer = new CanvasRenderer(wallCanvas, COLS, ROWS, BLOCK_SIZE);
    const pieceProvider = new PieceProvider(COLS, ROWS);

    const tetris = new Tetris(COLS, ROWS, canvasRenderer, pieceProvider);
    tetris.reset();

    setInterval(tetris.step.bind(tetris), 1000);
    document.addEventListener('keydown', tetris.onKeyDown.bind(tetris));
};