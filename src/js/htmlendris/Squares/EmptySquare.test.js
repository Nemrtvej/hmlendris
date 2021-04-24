import EmptySquare from './EmptySquare.js';
import FilledSquare from './FilledSquare.js';


var assert = require('assert');


describe('EptySquare', function() {
    describe('#resolveCollision()', function() {
        it('should return EmptySquare when collides with other EmptySquare', function() {
            const firstSquare = new EmptySquare();
            const secondSquare = new EmptySquare();

            assert.ok(firstSquare.resolveCollision(secondSquare) instanceof EmptySquare);
        });
    });

    describe('#resolveCollision()', function() {
        it('should return FilledSquare when collides with other FilledSquare', function() {
            const firstSquare = new EmptySquare();
            const secondSquare = new FilledSquare();

            assert.ok(firstSquare.resolveCollision(secondSquare) instanceof FilledSquare);
        });
    });
});
