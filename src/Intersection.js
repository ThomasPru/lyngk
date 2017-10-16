"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state= Lyngk.State.VACANT;
    var couleurAssociee;
    var pile=[];

    this.getState = function () {
        return state;
    };

    this.getCouleurPieceFromPile=function(j){
        return pile[j-1].getCouleur();
    };

    this.getCouleurAssociee = function(){
        return couleurAssociee;
    };

    this.getTaillePile = function(){
        return pile.length;
    };

    this.poserPiece = function(couleur){
        var piece = new Lyngk.Piece(couleur);
        pile.push(piece);
        couleurAssociee = piece.getCouleur();
        if(pile.length===1){
            state = Lyngk.State.ONE_PIECE;
        }
        else{
            if(pile.length>1 && pile.length<5) {
                state = Lyngk.State.STACK;
            }
            else{
                if(pile.length>=5){
                    state = Lyngk.State.FULL_STACK;
                }
            }
        }

    };
};
