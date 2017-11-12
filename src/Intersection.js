"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (x, y) {
    var state = Lyngk.State.VACANT;
    var colorId;
    var pile = [];
    var coordinate = new Lyngk.Coordinates(x, y);

    this.getX = function () {
        return coordinate.getX();
    };

    this.getY = function () {
        return coordinate.getY();
    };

    this.getHashCoordinate = function () {
        return coordinate.hash();
    };

    this.getCoordinate = function () {
        return coordinate;
    };

    this.getState = function () {
        return state;
    };

    this.getColorPieceFromPile = function (j) {
        return pile[j].getColor();
    };

    this.getColorAssociated = function () {
        return colorId;
    };

    this.getSizeStack = function () {
        return pile.length;
    };

    this.poserPiece = function (Color) {
        var piece = new Lyngk.Piece(Color);
        pile.push(piece);
        colorId = piece.getColor();
        if (this.getSizeStack() === 1) {
            state = Lyngk.State.ONE_PIECE;
        } else {
            if (this.getSizeStack() > 1 && this.getSizeStack() < 5) {
                state = Lyngk.State.STACK;
            } else {
                state = Lyngk.State.FULL_STACK;
            }
        }
    };

    this.removePiece = function () {
        pile.pop();
        if (this.getSizeStack() === 0) {
            state = Lyngk.State.VACANT;
            colorId = null;
        } else {
            colorId = this.getColorPieceFromPile(this.getSizeStack() - 1);
            if (this.getSizeStack() === 1) {
                state = Lyngk.State.ONE_PIECE;
            } else {
                state = Lyngk.State.STACK;
            }
        }
    };
};
