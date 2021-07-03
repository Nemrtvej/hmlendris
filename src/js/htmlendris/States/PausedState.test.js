import {PausedState} from "./PausedState.js";
import {matrixFromSquares} from "/js/htmlendris/Utils/Matrix.js";
import {NullPiece} from "/js/htmlendris/Pieces/NullPiece.js";
import {PieceProvider} from "/js/htmlendris/Utils/PieceProvider.js";
import {NullRenderer} from "/js/htmlendris/Utils/Renderer/NullRenderer.js";
import {GenerateInitialPiecesState} from "/js/htmlendris/States/GenerateInitialPiecesState.js";

describe('PausedState', function() {

    describe('#tick()', function () {

        it('should return another PausedState on every tick', function() {
            const instance = new PausedState();

            const time = 42;
            const currentPlayground = matrixFromSquares([[]]);
            const currentPiece = new NullPiece();
            const pieceProvider = new PieceProvider(0, 0);
            const renderer = new NullRenderer();

            const result = instance.tick(time, currentPlayground, currentPiece, pieceProvider, renderer);

            chai.expect(result.getState()).to.be.an.instanceof(PausedState);
        });
    });


    describe('#onKeyPress()', function () {

        it('should return another PausedState on other keyPress than spacebar', function() {
            const instance = new PausedState();

            const currentPlayground = matrixFromSquares([[]]);
            const currentPiece = new NullPiece();
            const pieceProvider = new PieceProvider(0, 0);
            const renderer = new NullRenderer();
            const event = {keyCode: 32 + 5}; // spacebar key code = 32

            const result = instance.onKeyPress(event, currentPlayground, currentPiece, pieceProvider, renderer);

            chai.expect(result.getState()).to.be.an.instanceof(PausedState);
        });

        it('should return another GenerateInitialPiecesState on spacebar keypress', function() {
            const instance = new PausedState();

            const currentPlayground = matrixFromSquares([[]]);
            const currentPiece = new NullPiece();
            const pieceProvider = new PieceProvider(0, 0);
            const renderer = new NullRenderer();
            const event = {keyCode: 32, preventDefault: function() {}}; // spacebar key code = 32

            const result = instance.onKeyPress(event, currentPlayground, currentPiece, pieceProvider, renderer);

            chai.expect(result.getState()).to.be.an.instanceof(GenerateInitialPiecesState);
        });
    });
});
