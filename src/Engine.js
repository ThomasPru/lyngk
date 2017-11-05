"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Players = {playerOne: 0, playerTwo: 1};

/**
 * @return {boolean}
 */
Lyngk.Engine = function () {
    var plateau=[];

    var activePlayer;

    var claimedColor=[null,null];
    var scorePlayer=[0,0];

    var nbPossibilities=[40,40];

    this.getScore=function(player){
        return scorePlayer[player];
    };

    this.getActivePlayer=function(){
        return activePlayer;
    };

    this.getPlayerColor=function(no){
        return claimedColor[no];
    };

    this.getNbCoupPosForPlayer=function(player){
        return nbPossibilities[player];
    };

    this.getDirecPossibOfInters=function(origin){
        var deep=0;
        var inters=this.getCoordonCase(origin);
        var desti;

        var nbDirecPos=0;

        if(array_val_possib.indexOf(origin[0] + (parseInt(origin[1])+1+deep) !== -1)) {
            desti=this.getCoordonCase(origin[0] + (parseInt(origin[1])+1+deep));
            //pour le deplacement meme X  avec Y qui monte
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((parseInt(origin[1])+1+deep)>=10) {
                    break;
                }
                desti = this.getCoordonCase(origin[0] + (parseInt(origin[1]) + 1 + deep));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }

        deep=0;
        if(array_val_possib.indexOf(  origin[0] +      (parseInt(origin[1])-1-deep)        )       !== -1) {
            desti = this.getCoordonCase(origin[0] + (parseInt(origin[1])-1-deep));
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((parseInt(origin[1])-1-deep)<=0) {
                    break;
                }
                desti = this.getCoordonCase(origin[0] + (parseInt(origin[1])-1-deep));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }

        deep=0;
        if(array_val_possib.indexOf(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + parseInt(origin[1]))!==-1){
            desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + parseInt(origin[1]));
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((origin[0]).charCodeAt()+1+deep>=75) {
                    break;
                }
                desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + parseInt(origin[1]));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }

        deep=0;
        if(array_val_possib.indexOf(String.fromCharCode((origin[0]).charCodeAt()-1-deep) + parseInt(origin[1]))!==-1){
            desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()-1-deep) + parseInt(origin[1]));
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((origin[0]).charCodeAt()-1-deep<65) {
                    break;
                }
                desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()-1-deep) + parseInt(origin[1]));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }

        deep=0;
        if(array_val_possib.indexOf(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + (parseInt(origin[1])+1))!==-1){
            desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + (parseInt(origin[1])+1+deep));
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((origin[0]).charCodeAt()+1+deep>=75 || parseInt(origin[1])+1+deep>=10) {
                    break;
                }
                desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()+1+deep) + (parseInt(origin[1])+1+deep));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }
        
        deep=0;
        if(array_val_possib.indexOf(String.fromCharCode((origin[0]).charCodeAt()-1-deep) + (parseInt(origin[1])-1))!==-1){
            desti = this.getCoordonCase(String.fromCharCode((origin[0]).charCodeAt()-1-deep) + (parseInt(origin[1])-1));
            while ((array_val_possib.indexOf(desti) !== -1) && (this.getTaillePileOnInter(desti) === 0)) {
                deep++;
                if((origin[0]).charCodeAt()-1-deep<65 || parseInt(origin[1])-1-deep<=0) {
                    break;
                }
                desti = this.getCoordonCase(String.fromCharCode(((origin[0]).charCodeAt())-1-deep) + (parseInt(origin[1])-1-deep));

            }
            if (array_val_possib.indexOf(desti.getX() + desti.getY()) !== -1) {
                if (this.check_deplacement(inters, desti)) {
                    nbDirecPos++;
                }
            }
        }
        return nbDirecPos;
    };

    this.countPossibilities=function(){
        var possibilities=0;
        for(var x=0;x<array_val_possib.length;x++){
            if(( this.getCouleurAssoOfInter(array_val_possib[x])!==null)
                &&(this.getCouleurAssoOfInter(array_val_possib[x])===this.getPlayerColor(this.getActivePlayer() )
                || (this.getPlayerColor(this.getActivePlayer())===null && this.getCouleurAssoOfInter(array_val_possib[x])!==Lyngk.Color.WHITE ))){
                possibilities++;
            }
        }
        if(this.getPlayerColor((this.getActivePlayer()+1)%2)!==null && this.getPlayerColor(this.getActivePlayer())===null){
            possibilities-=8;
        }
        nbPossibilities[this.getActivePlayer()]=possibilities;
    };

    this.claimColor=function(player,color){
        if((player===Lyngk.Players.playerOne && color!==Lyngk.Players.playerTwo) ||
            (player===Lyngk.Players.playerTwo && color!==Lyngk.Players.playerOne)){
            claimedColor[player]=color;
        }
        this.countPossibilities();
    };


    this.nbPiecesRes=function(){
        var nbPieces=0;
        for (var x = 0; x < array_val_possib.length; x++) {
            nbPieces+=this.getTaillePileOnInter(array_val_possib[x]);
        }
        return nbPieces;
    };

    var array_val_possib= ["A3",
        "B2","B3","B4","B5",
        "C1","C2","C3","C4","C5","C6","C7",
        "D2","D3","D4","D5","D6","D7",
        "E2","E3","E4","E5","E6","E7","E8",
        "F3","F4","F5","F6","F7","F8",
        "G3","G4","G5","G6","G7","G8","G9",
        "H5","H6","H7","H8",
            "I7"];

    var lettre = ['A','B','C','D','E','F','G','H','I'];

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
        scorePlayer=[0,0];
        var cptColor=[0,0,0,0,0,0];
        activePlayer=Lyngk.Players.playerOne;
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

    this.checkGetOnePoint=function(activePlayer,dest){
        return dest.getTaillePile() === 5 && dest.getCouleurAssociee() === this.getPlayerColor(activePlayer);
    };

    this.DeplacerVers=function(origin,destination){
        var source=this.getCoordonCase(origin);
        var dest=this.getCoordonCase(destination);
        var deplacementValide=this.check_deplacement(source,dest);
        if(deplacementValide===true) {
            if (dest.getTaillePile() > 0) {
                var pile_tempoA = [];
                while (source.getTaillePile() > 0) {
                    pile_tempoA.push(source.getCouleurAssociee());
                    source.retirerPiece();
                }
                while (pile_tempoA.length > 0) {
                    dest.poserPiece(pile_tempoA[pile_tempoA.length-1]);
                    pile_tempoA.pop();
                }
            }
            if(this.checkGetOnePoint(this.getActivePlayer(),dest)){
                scorePlayer[this.getActivePlayer()]++;
                while (dest.getTaillePile() > 0) {
                    dest.retirerPiece();
                }
            }

            if(activePlayer===Lyngk.Players.playerOne){
                activePlayer=Lyngk.Players.playerTwo;
            }
            else{
                activePlayer=Lyngk.Players.playerOne;
            }
            this.countPossibilities();
        }
        return deplacementValide;
    };


    this.getPlateauEtatCase= function(co){
        if(typeof co === 'number'){
            return plateau[co].getState();
        }
        var inters = this.getCoordonCase(co);
        return inters.getState();
    };

    this.getTaillePileOnInter = function(co){
        if(typeof co === 'number'){
            return plateau[co].getTaillePile();
        }
        var inters = this.getCoordonCase(co);
        return inters.getTaillePile();

    };

    this.getCouleurAssoOfInter=function(i){
        if(typeof i === 'number'){
            return plateau[i].getCouleurAssociee();
        }
        var inters = this.getCoordonCase(i);
        return inters.getCouleurAssociee();
    };


    this.getCouleurFromPieceFromInterS=function(i,j){
        if(typeof i === 'number'){
            return plateau[i].getCouleurPieceFromPile(j);
        }
        var inters = this.getCoordonCase(i);
        return inters.getCouleurPieceFromPile(j);
    };


    this.getSizePlat = function(){
        return plateau.length;
    };

    this.checkColorClaimOponent=function(source,activePlayer){
        return source.getCouleurAssociee() !== this.getPlayerColor((activePlayer + 1) % 2);
    };

    this.check_deplacement=function(source,dest) {
        var check;
        check = checkLegalLigne(source, dest);
        //AFFICHER LES CASES DU TAB VALIDES
        if (check) {
            check=this.checkSourceToDest(source,dest);
            if(this.getSizePileSom(source,dest)>5){
                check=false;
            }
            if(check){
                check=this.comparePile(source,dest);
                if(check){
                    check = !this.compareIsDoubleColor(source,dest);
                    if(check){
                        check=this.checkColorClaimOponent(source,this.getActivePlayer());
                    }
                }
            }
        }
        return check;
    };

    this.compareIsDoubleColor=function(source,dest){
        var cptColor=[0,0,0,0,0,0];

        for(var y=0;y<source.getTaillePile();y++){
            cptColor[source.getCouleurPieceFromPile(y)]++;
        }

        for(var z=0;z<dest.getTaillePile();z++){
            cptColor[dest.getCouleurPieceFromPile(z)]++;
        }
        for(var x=0;x<5;x++){
            if(cptColor[x]>1){
                //console.log("PROBLEME : couleur en double sur la pile / joueur :" + this.getActivePlayer());
                return true;
            }
        }
        return false;
    };

    this.comparePile=function(source,dest){
        if(this.getTaillePileOnInter(source.getX() + source.getY()) < this.getTaillePileOnInter(dest.getX() + dest.getY())) {
            //console.log("PROBLEME : ajout sur une plus grande pile");
        }
        return this.getTaillePileOnInter(source.getX() + source.getY()) >= this.getTaillePileOnInter(dest.getX() + dest.getY());

    };

    this.getSizePileSom=function(source,dest){
        if((this.getTaillePileOnInter(source.getX()+source.getY())+this.getTaillePileOnInter(dest.getX()+dest.getY()))>5){
            //console.log("PROBLEME : somme des piles plus grande que 5");
        }
        return this.getTaillePileOnInter(source.getX()+source.getY())+this.getTaillePileOnInter(dest.getX()+dest.getY());
    };

    this.checkSourceToDest=function(source,dest) {
        if (source.getX() === dest.getX()) {
            if (source.getY() < dest.getY()) {
                for (var x = source.getY() + 1; x < dest.getY(); x++) {
                    var tempo_int = source.getX() + x;
                    tempo_int = tempo_int.toString();
                    if (this.getTaillePileOnInter(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                        return false;
                    }
                }
            }
            else {
                for (var x = source.getY() - 1; x > dest.getY(); x--) {
                    var tempo_int = source.getX() + x;
                    tempo_int = tempo_int.toString();
                    if (this.getTaillePileOnInter(tempo_int).getTaillePile() > 0) {
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
                        if (this.getTaillePileOnInter(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
                else {
                    for (var x = source.getX().charCodeAt() - 64 - 1; x > dest.getX().charCodeAt() - 64; x--) {
                        var tempo_int = String.fromCharCode(x + 64) + source.getY();
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInter(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
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
                        if (this.getTaillePileOnInter(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
                            return false;
                        }
                    }
                }
                else {
                    for (var x = source.getY() - 1; x > dest.getY(); x--) {
                        var tempo_int = String.fromCharCode(source.getX().charCodeAt() + (x - source.getY())) + x;
                        tempo_int = tempo_int.toString();
                        if (this.getTaillePileOnInter(tempo_int) > 0) {//taille de la pile des intersections sur la ligne >0
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



