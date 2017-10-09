"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var State= Lyngk.State.VACANT;
    var Couleur_Inter = c;

    if(c==Lyngk.Color.BLUE){
        State= Lyngk.State.ONE_PIECE;
    }

    this.getState = function () {
        return State;
    }

    this.getCouleurInt = function (){
        return Couleur_Inter;
    }


};
