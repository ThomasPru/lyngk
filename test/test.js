'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testA = function(){
    var c = new Lyngk.Coordinates("A",1);
    assertFalse(c.valid());
}

LyngkTestCase.prototype.testB = function(){
    var compteur=0;
    var lettre = ['A','B','C','D','E','F','G','H','I'];

    for(var j=0;j<lettre.length;j++) {
        for (var i = 1; i < 10; i++) {
            var co = new Lyngk.Coordinates(lettre[j],i);
            if(co.valid()){
                compteur++;
            }
        }
    }
    assertEquals(compteur,43);
}


LyngkTestCase.prototype.testC = function(){
    var c = new Lyngk.Coordinates('B',4);
    assertTrue(c.toString()==='B4');
}

LyngkTestCase.prototype.testD = function(){
    var c = new Lyngk.Coordinates('A',1);
    assertTrue(c.toString()==="invalid");
}

LyngkTestCase.prototype.testE = function(){
    var c = new Lyngk.Coordinates('B',4);
    assertEquals(c.toString(), c.clone().toString());
}

LyngkTestCase.prototype.testHist6 = function(){
    var c = new Lyngk.Coordinates('B',4);
    var hash= c.hash();
    assertEquals(hash,24);
}

LyngkTestCase.prototype.testHist7 = function(){
    var c = new Lyngk.Intersection();
    assertEquals(c.getState(),Lyngk.State.VACANT);

}

LyngkTestCase.prototype.testHist8 = function(){
    var Inter = new Lyngk.Intersection('B',2);
    Inter.poserPiece(Lyngk.Color.BLUE);
    assertTrue(Inter.getState() === Lyngk.State.ONE_PIECE && Inter.getCouleurAssociee()===Lyngk.Color.BLUE );

}


LyngkTestCase.prototype.testHist9 = function(){
    var Inter = new Lyngk.Intersection('B',2);
    Inter.poserPiece(Lyngk.Color.BLUE);
    Inter.poserPiece(Lyngk.Color.RED);
    assertTrue(Inter.getState() === Lyngk.State.STACK && Inter.getCouleurAssociee()===Lyngk.Color.RED );
}

LyngkTestCase.prototype.testHist10 = function(){
    var Inter = new Lyngk.Intersection('B',2);
    Inter.poserPiece(Lyngk.Color.BLUE);
    Inter.poserPiece(Lyngk.Color.RED);
    Inter.poserPiece(Lyngk.Color.GREEN);
    Inter.poserPiece(Lyngk.Color.GREEN);
    Inter.poserPiece(Lyngk.Color.GREEN);
    assertTrue(Inter.getState() === Lyngk.State.FULL_STACK);
}

//histoire 11
LyngkTestCase.prototype.testHist11 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var compteur_one_piece=0;

    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getPlateauETATindice(i)=== Lyngk.State.ONE_PIECE) {
            compteur_one_piece++;
        }
    }

    assertEquals(compteur_one_piece,43);
}

//histoire 12
LyngkTestCase.prototype.testHist12 = function(){
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var compteur_taille_inters_juste=0;

    var cpt_ivoire=0;
    var cpt_bleu=0;
    var cpt_rouge=0;
    var cpt_noir=0;
    var cpt_vert=0;

    var cpt_blanc=0;

    var validNbPieceColo=0;
    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getTaillePileOnInter(i)=== 43) {
            compteur_taille_inters_juste++;
        }
        //BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5
        for (var j = 0; j < 43; j++) {
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.IVORY){
                cpt_ivoire++;
            }
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.BLUE){
                cpt_bleu++;
            }
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.RED){
                cpt_rouge++;
            }
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.BLACK){
                cpt_noir++;
            }
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.GREEN){
                cpt_vert++;
            }
            if(jeu.getCouleurFromPieceFromInterS(i,j) == Lyngk.Color.WHITE){
                cpt_blanc++;
            }
        }

        if(cpt_ivoire==8 && cpt_bleu==8 && cpt_rouge==8 && cpt_noir==8 && cpt_vert==8 && cpt_blanc==3){
            validNbPieceColo++;
        }
        cpt_ivoire=0;
        cpt_bleu=0;
        cpt_rouge=0;
        cpt_noir=0;
        cpt_vert=0;
        cpt_blanc=0;
    }
    assertTrue(compteur_taille_inters_juste === 43 && validNbPieceColo===43);
}


LyngkTestCase.prototype.testHist13 = function(){
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var cpt_valid_taillle_inter=0;
    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getTaillePileOnInter(i)==1){
            cpt_valid_taillle_inter++;
        }
    }
    assertEquals(cpt_valid_taillle_inter ,jeu.getSizePlat());
}