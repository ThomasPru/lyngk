"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var plateau=[];
    //var array_val_possib= [[3,3],[2,5],[1,7],[2,7],[2,8],[3,8],[3,9],[5,8],[7,7]];
    var array_val_possib= ["A3",
        "B2","B3","B4","B5",
        "C1","C2","C3","C4","C5","C6","C7",
        "D2","D3","D4","D5","D6","D7",
        "E2","E3","E4","E5","E6","E7","E8",
        "F3","F4","F5","F6","F7","F8",
        "G3","G4","G5","G6","G7","G8","G9",
        "H5","H6","H7","H8",
            "I7"];

    var lettre = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    this.Init_plateau_One = function() {
        for (var x = 0; x < lettre.length; x++) {
            for (var y = 0; y < 10; y++) {
                if (array_val_possib.indexOf(lettre[x] + y) !== -1) {
                    var inter = new Lyngk.Intersection(x, y);

                    inter.poserPiece(Lyngk.Color.BLUE);
                    plateau.push(inter);
                }
            }
        }
    };

    this.Init_plateau_FULL = function() {
        var cptColor=[0,0,0,0,0,0];
        for (var x = 0; x < lettre.length; x++) {
            for (var y = 1; y < 10; y++) {
                if (array_val_possib.indexOf(lettre[x] + y) !== -1) {
                    var inter = new Lyngk.Intersection(lettre[x], y);
                    var rng;
                    do{
                      rng  = Math.floor(Math.random()*6);
                    }
                    while((cptColor[rng]===8 && rng!==Lyngk.Color.WHITE)|| (cptColor[rng]===3 && rng===Lyngk.Color.WHITE));
                    inter.poserPiece(rng);
                    plateau.push(inter);
                    cptColor[rng]++;
                }
            }
        }
    };

    this.getCoordonCase=function(c){
        for(var x in plateau){
            if(plateau[x].getCoord().toString()===c){
                return plateau[x];
            }
        }
    };

    this.DeplacerVers=function(origin,destination){
        var source=this.getCoordonCase(origin);
        var dest=this.getCoordonCase(destination);

        dest.poserPiece(source.getCouleurAssociee());

        source.retirerPiece();
    };


    this.getPlateauEtatCase= function(co){
        var inters = this.getCoordonCase(co);
        return inters.getState();
    };




    this.getCouleurAssoOfInter=function(i){
        return plateau[i].getCouleurAssociee();
    };


    this.getCouleurFromPieceFromInterS=function(i,j){
        return plateau[i].getCouleurPieceFromPile(j);
    };

    this.getTaillePileOnInter = function(i){
        return plateau[i].getTaillePile();
    };

    this.getSizePlat = function(){
        return plateau.length;
    };

    this.getPlateauETATindice = function(indice){
        return plateau[indice].getState();
    };
};



