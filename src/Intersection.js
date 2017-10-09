"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var State= Lyngk.State.VACANT;
    var piece;
    var couleurAssociee;

    this.getState = function () {
        return State;
    }

    this.getPiece = function(){
        return piece;
    }

    this.getCouleurAssociee = function(){
        return couleurAssociee;
    }

    this.poserPiece = function(c){
        piece = new Lyngk.Piece(c);
        if(c==Lyngk.Color.BLUE) {
            couleurAssociee=c;
            State = Lyngk.State.ONE_PIECE;
        }
    }

};
