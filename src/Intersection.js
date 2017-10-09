"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var State= Lyngk.State.VACANT;
    var piece;
    var couleurAssociee;

    var pile = [];

    this.getState = function () {
        return State;
    }

    this.getPiece = function(){
        return piece;
    }

    this.getCouleurAssociee = function(){
        return couleurAssociee;
    }


    this.poserPiece = function(couleur){
        piece = new Lyngk.Piece(couleur);
        pile.push(couleur);
        if(couleur==Lyngk.Color.BLUE) {
            couleurAssociee = couleur;
            State = Lyngk.State.ONE_PIECE;
        }
        else{
            if(couleur==Lyngk.Color.RED) {
                couleurAssociee = couleur;
                State = Lyngk.State.STACK;
            }
        }

    }

};
