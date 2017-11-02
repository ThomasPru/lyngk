"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

/**
 * @return {boolean}
 */
Lyngk.Engine = function () {
    var plateau=[];
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
        if(this.check_deplacement(source,dest)===true) {
            if (dest.getTaillePile() > 0) {
                var pile_tempoA = new Lyngk.Intersection(0, 0);
                while (source.getTaillePile() > 0) {
                    pile_tempoA.poserPiece(source.getCouleurAssociee());
                    source.retirerPiece();
                }
                while (pile_tempoA.getTaillePile() > 0) {
                    dest.poserPiece(pile_tempoA.getCouleurAssociee());
                    pile_tempoA.retirerPiece();
                }
            }
        }
    };


    this.getPlateauEtatCase= function(co){
        var inters = this.getCoordonCase(co);
        return inters.getState();
    };

    this.getPlateauETATindice = function(indice){
        return plateau[indice].getState();
    };


    this.getTaillePileOnInterCO = function(co){
        var inters = this.getCoordonCase(co);
        return inters.getTaillePile();
    };

    this.getTaillePileOnInter = function(i){
        return plateau[i].getTaillePile();
    };



    this.getCouleurAssoOfInter=function(i){
        return plateau[i].getCouleurAssociee();
    };

    this.getCouleurFromPieceFromInterS=function(i,j){
        return plateau[i].getCouleurPieceFromPile(j);
    };


    this.getSizePlat = function(){
        return plateau.length;
    };


    this.check_deplacement=function(source,dest) {
        var check;
        check = checkLegalLigne(source, dest);
        //AFFICHER LES CASES DU TAB VALIDES
        if (check === true) {
            check=this.checkSourceToDest(source,dest);
            if(this.getSizePileSom(source,dest)>5){
                check=false;
            }
            if(check===true){
                check=this.comparePile(source,dest);
            }
        }
        return check;
    };

    this.comparePile=function(source,dest){
        return !(this.getTaillePileOnInterCO(source.getX() + source.getY()) === 1 && this.getTaillePileOnInterCO(dest.getX() + dest.getY()) > 1);

    };

    this.getSizePileSom=function(source,dest){
        return this.getTaillePileOnInterCO(source.getX()+source.getY())+this.getTaillePileOnInterCO(dest.getX()+dest.getY());
    };

    this.checkSourceToDest=function(source,dest) {
        if (source.getX() === dest.getX()) {
            if (source.getY() < dest.getY()) {
                for (var x = source.getY() + 1; x < dest.getY(); x++) {
                    var tempo_int = source.getX() + x;
                    tempo_int = tempo_int.toString();
                    if (this.getTaillePileOnInterCO(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                        return false;
                    }
                }
            }
            else {
                for (var x = source.getY() - 1; x > dest.getY(); x--) {
                    var tempo_int = source.getX() + x;
                    tempo_int = tempo_int.toString();
                    if (this.getTaillePileOnInterCO(tempo_int).getTaillePile() > 0) {
                        return false;
                    }
                }
            }
        }
        else {
            if (source.getY() === dest.getY()) {
                if (source.getX() < dest.getX()) {
                    for (var x = source.getX().charCodeAt() - 64 + 1; x < dest.getX().charCodeAt() - 64; x++) {
                        var tempo_int = String.fromCharCode(x + 64) + source.getY();
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInterCO(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
                else {
                    for (var x = source.getX().charCodeAt() - 64 - 1; x > dest.getX().charCodeAt() - 64; x--) {
                        var tempo_int = String.fromCharCode(x + 64) + source.getY();
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInterCO(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
            }
            else {
                if ((source.getX().charCodeAt() - 64) * 10 + source.getY() < (dest.getX().charCodeAt() - 64) * 10 + dest.getY()) {
                    for (var x = source.getY() + 1; x < dest.getY(); x++) {
                        var tempo_int = String.fromCharCode(source.getX().charCodeAt() + (x - source.getY())) + x;
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInterCO(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
                else {
                    for (var x = source.getY() - 1; x > dest.getY(); x--) {
                        var tempo_int = String.fromCharCode(source.getX().charCodeAt() + (x - source.getY())) + x;
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInterCO(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    function checkLegalLigne(source,dest){
        if (source.getX() === dest.getX()) {
            for (var x = source.getY() - 9; x < 9; x++) {
                if (source.getHashedCoor() === dest.getHashedCoor() + x && x!==0) {
                    return true;
                }
            }
        }
        if (source.getY() === dest.getY()) {
            for (var x = source.getY() - 9; x < 9; x++) {
                if (source.getHashedCoor() === dest.getHashedCoor() + 10*x && x!==0) {
                    return true;
                }
            }
        }
        for (var x = source.getY() - 9; x < 9; x++) {
            if (source.getHashedCoor() === dest.getHashedCoor() + 11*x && x!==0) {
                return true;
            }
        }
        return false;
    }

};



