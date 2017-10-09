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

    this.getTaillePile = function(){
        return pile.length;
    }


    this.poserPiece = function(couleur){
        piece = new Lyngk.Piece(couleur);
        pile.push(couleur);
        couleurAssociee = couleur;
        if(pile.length===1){
            State = Lyngk.State.ONE_PIECE;
        }
        else{
            if(pile.length>1 && pile.length<5) {
                State = Lyngk.State.STACK;
            }
            else{
                if(pile.length>=5){
                    State = Lyngk.State.FULL_STACK;
                }
            }
        }
    }

};
