"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var plateau=[];

    this.Init_plateau_One = function() {
        var array_val_possib =['C1',
            'E2','D2','C2','B2',
            'G3','F3','E3','D3','C3','B3','A3',
            'G4','F4','E4','D4','C4','B4',
            'H5','G5','F5','E5','D5','C5','B5',
            'H6','G6','F6','E6','D6','C6',
            'I7','H7','G7','F7','E7','D7','C7',
            'H8','G8','F8','E8',
            'G9'];
        var lettre = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

        for (var x = 0; x < lettre.length; x++) {
            for (var y = 0; y < 10; y++) {
                if (array_val_possib.indexOf(lettre[x] + y) !== -1) {
                    var Inter = new Lyngk.Intersection(x, y);
                    Inter.poserPiece(Lyngk.Color.BLUE);
                    plateau.push(Inter);
                }
            }
        }
    }

    this.Init_plateau_FULL = function() {
        var array_val_possib =['C1',
            'E2','D2','C2','B2',
            'G3','F3','E3','D3','C3','B3','A3',
            'G4','F4','E4','D4','C4','B4',
            'H5','G5','F5','E5','D5','C5','B5',
            'H6','G6','F6','E6','D6','C6',
            'I7','H7','G7','F7','E7','D7','C7',
            'H8','G8','F8','E8',
            'G9'];
        var lettre = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

        var couleurPos=[Lyngk.Color.IVORY,Lyngk.Color.BLUE,Lyngk.Color.RED,Lyngk.Color.BLACK,Lyngk.Color.GREEN];

        for (var x = 0; x < lettre.length; x++) {
            for (var y = 1; y < 10; y++) {
                if (array_val_possib.indexOf(lettre[x] + y) !== -1) {
                    var Inter = new Lyngk.Intersection(x, y);
                    for(var z=0;z<couleurPos.length;z++) {
                        for(var t=0;t<8;t++) {
                            Inter.poserPiece(couleurPos[z]);
                        }
                    }
                    for(var u=0;u<3;u++){
                        Inter.poserPiece(Lyngk.Color.WHITE);
                    }
                    plateau.push(Inter);
                }
            }
        }

    }

    this.getCouleurFromPieceFromInterS = function (i,j){
        return plateau[i].getPieceColorFromPile(j);
    }

    this.getTaillePileOnInter = function(i){
        return plateau[i].getTaillePile();
    }

    this.getSizePlat = function(){
        return plateau.length;
    }

    this.getPlateauETATindice = function(indice){
        return plateau[indice].getState();
    }
};



