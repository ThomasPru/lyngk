"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (x,y) {
    var state= Lyngk.State.VACANT;
    var couleurAssociee;
    var pile=[];
    var coor=new Lyngk.Coordinates(x, y);

    this.getX=function(){
        return coor.getX();
    };

    this.getY=function(){
        return coor.getY();
    };

    this.getHashedCoor=function(){
        return coor.hash();
    };

    this.getCoord = function(){
        return coor;
    };

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
        if(this.getTaillePile()===1){
            state = Lyngk.State.ONE_PIECE;
        }
        else{
            if(this.getTaillePile()>1 && this.getTaillePile()<5) {
                state = Lyngk.State.STACK;
            }
            else{
                if(this.getTaillePile()>=5){
                    state = Lyngk.State.FULL_STACK;
                }
            }
        }

    };

    this.retirerPiece = function(){
        if(this.getTaillePile()>=1) {
            pile.pop();
            if(this.getTaillePile()===0){
                state = Lyngk.State.VACANT;
            }
            else if (this.getTaillePile() === 1) {
                state = Lyngk.State.ONE_PIECE;
            }
            else if (this.getTaillePile() > 1 && this.getTaillePile() < 5) {
                state = Lyngk.State.STACK;
            }
            else if (this.getTaillePile() >= 5) {
                state = Lyngk.State.FULL_STACK;
            }

        }
    }
};
