'use strict';

Math.seedrandom('1234');

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testA = function(){
    var c = new Lyngk.Coordinates("A",1);
    assertFalse(c.valid());
};

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
};


LyngkTestCase.prototype.testC = function(){
    var c = new Lyngk.Coordinates('B',4);
    assertTrue(c.toString()==='B4');
};

LyngkTestCase.prototype.testD = function(){
    var c = new Lyngk.Coordinates('A',1);
    assertTrue(c.toString()==="invalid");
};

LyngkTestCase.prototype.testE = function(){
    var c = new Lyngk.Coordinates('B',4);
    assertEquals(c.toString(), c.clone().toString());
};

LyngkTestCase.prototype.testHist6 = function(){
    var c = new Lyngk.Coordinates('B',4);
    var hash= c.hash();
    assertEquals(hash,24);
};

LyngkTestCase.prototype.testHist7 = function(){
    var c = new Lyngk.Intersection();
    assertEquals(c.getState(),Lyngk.State.VACANT);

};

LyngkTestCase.prototype.testHist8 = function(){
    var inter = new Lyngk.Intersection('B',2);
    inter.poserPiece(Lyngk.Color.BLUE);
    assertTrue(inter.getState() === Lyngk.State.ONE_PIECE && inter.getCouleurAssociee()===Lyngk.Color.BLUE );
};


LyngkTestCase.prototype.testHist9 = function(){
    var inter = new Lyngk.Intersection('B',2);
    inter.poserPiece(Lyngk.Color.BLUE);
    inter.poserPiece(Lyngk.Color.RED);
    assertTrue(inter.getState() === Lyngk.State.STACK && inter.getCouleurAssociee()===Lyngk.Color.RED );
};

LyngkTestCase.prototype.testHist10 = function(){
    var inter = new Lyngk.Intersection('B',2);
    inter.poserPiece(Lyngk.Color.BLUE);
    inter.poserPiece(Lyngk.Color.RED);
    inter.poserPiece(Lyngk.Color.GREEN);
    inter.poserPiece(Lyngk.Color.GREEN);
    inter.poserPiece(Lyngk.Color.GREEN);
    assertTrue(inter.getState() === Lyngk.State.FULL_STACK);
};

//histoire 11
LyngkTestCase.prototype.testHist11 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var compteur_one_piece=0;

    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getPlateauEtatCase(i)=== Lyngk.State.ONE_PIECE) {
            compteur_one_piece++;
        }
    }
    assertEquals(compteur_one_piece,43);
};

//histoire 12
LyngkTestCase.prototype.testHist12 = function(){
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    var cpt_ivoire=0;
    var cpt_bleu=0;
    var cpt_rouge=0;
    var cpt_noir=0;
    var cpt_vert=0;
    var cpt_blanc=0;

    for(var i=0;i<jeu.getSizePlat();i++){
        //BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.IVORY){
            cpt_ivoire++;
        }
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.BLUE){
            cpt_bleu++;
        }
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.RED){
            cpt_rouge++;
        }
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.BLACK){
            cpt_noir++;
        }
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.GREEN){
            cpt_vert++;
        }
        if(jeu.getCouleurAssoOfInter(i) === Lyngk.Color.WHITE){
            cpt_blanc++;
        }
    }
    assertTrue(cpt_ivoire===8 && cpt_bleu===8 && cpt_rouge===8 && cpt_noir===8 && cpt_vert===8 && cpt_blanc===3);
};


LyngkTestCase.prototype.testHist13 = function(){
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var cpt_valid_taillle_inter=0;
    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getTaillePileOnInter(i)===1){
            cpt_valid_taillle_inter++;
        }
    }
    assertEquals(cpt_valid_taillle_inter ,jeu.getSizePlat());
};

LyngkTestCase.prototype.testHist14 = function(){
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var cpt_intersection_non_vide=0;
    var cpt_couleurAssocie_intersec_valide=0;
    var Identificateur_pile=0;
    for(var i=0;i<jeu.getSizePlat();i++){
        if(jeu.getTaillePileOnInter(i)>=1){
            cpt_intersection_non_vide++;
            if(jeu.getCouleurAssoOfInter(i) === jeu.getCouleurFromPieceFromInterS(i,jeu.getTaillePileOnInter(i)-1)){
                cpt_couleurAssocie_intersec_valide++;
            }
        }
    }
    assertTrue(cpt_intersection_non_vide===jeu.getSizePlat() && cpt_couleurAssocie_intersec_valide===jeu.getSizePlat() && Identificateur_pile===0);
};

LyngkTestCase.prototype.testHist15 = function() {
    console.log("Test15");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var colorSourceAvantDep=jeu.getCoordonCase("A3").getCouleurAssociee();
    jeu.DeplacerVers("A3","B3");
    //verifier que A3 soit vide (vacant)  && B3 couleur assosier = piece qui etait sur A3)
    assertTrue(jeu.getPlateauEtatCase("A3")===Lyngk.State.VACANT && jeu.getCoordonCase("B3").getCouleurAssociee() === colorSourceAvantDep);
};

LyngkTestCase.prototype.testHist16 = function() {
    console.log("Test16");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.DeplacerVers("A3","B3");
    var colorSourceAvantDep=jeu.getCoordonCase("B3").getCouleurAssociee();
    jeu.DeplacerVers("B3","B2");
    assertTrue(jeu.getPlateauEtatCase("B3") === Lyngk.State.VACANT && jeu.getCoordonCase("B2").getCouleurAssociee() === colorSourceAvantDep);
};

LyngkTestCase.prototype.testHist17 = function () {
    console.log("Test17");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.DeplacerVers("B2","B3");
    var couleurB3=jeu.getCoordonCase("B3").getCouleurAssociee();
    jeu.DeplacerVers("B3","B2");
    assertTrue(jeu.getPlateauEtatCase("B3") !== Lyngk.State.VACANT && couleurB3===jeu.getCoordonCase("B3").getCouleurAssociee());
};

LyngkTestCase.prototype.testHist18 = function () {
    console.log("Test18");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var couleurB3=jeu.getCoordonCase("B3").getCouleurAssociee();
    jeu.DeplacerVers("B3","C2");
    assertTrue(jeu.getPlateauEtatCase("B3") !== Lyngk.State.VACANT && couleurB3===jeu.getCoordonCase("B3").getCouleurAssociee());
};


LyngkTestCase.prototype.testHist19 = function () {
    console.log("Test19");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    var couleurH5=jeu.getCoordonCase("H5").getCouleurAssociee();

    jeu.DeplacerVers("H5","H8");

    assertTrue(jeu.getPlateauEtatCase("H5") !==Lyngk.State.VACANT && couleurH5===jeu.getCoordonCase("H5").getCouleurAssociee());
};


LyngkTestCase.prototype.testHist20 = function () {
    console.log("Test20");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    jeu.DeplacerVers("E3","E4");
    jeu.DeplacerVers("E4","E5");
    jeu.DeplacerVers("E5","E6");
    jeu.DeplacerVers("E6","F7");

    var taillePileF7=jeu.getTaillePileOnInter("F7");
    var couleurSav=jeu.getCoordonCase("F7").getCouleurAssociee();

    jeu.DeplacerVers("F7","G7");

    assertTrue(jeu.getPlateauEtatCase("F7") ===Lyngk.State.FULL_STACK
        && couleurSav===jeu.getCoordonCase("F7").getCouleurAssociee());
};

LyngkTestCase.prototype.testHist21 = function () {
    console.log("Test21");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.DeplacerVers("A3","B3");

    var couleurSav=jeu.getCoordonCase("C3").getCouleurAssociee();
    jeu.DeplacerVers("C3","B3");

    assertTrue(jeu.getPlateauEtatCase("C3") !==Lyngk.State.VACANT && couleurSav===jeu.getCoordonCase("C3").getCouleurAssociee());

};

LyngkTestCase.prototype.testHist22 = function () {
    console.log("Test22");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    jeu.DeplacerVers("E3","E4");


    var couleurSav=jeu.getCoordonCase("E5").getCouleurAssociee();
    //impossible car la pile en E4 > la pile en E5
    jeu.DeplacerVers("E5","E4");

    assertTrue(jeu.getPlateauEtatCase("E5") !==Lyngk.State.VACANT && couleurSav===jeu.getCoordonCase("E5").getCouleurAssociee());

};

LyngkTestCase.prototype.testHist23 = function () {
    console.log("Test23");
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var IsColorTwiceInFuturePileC5=false;

    var compteur=[0,0,0,0,0,0];

    compteur[jeu.getCouleurAssoOfInter("E4")]++;
    compteur[jeu.getCouleurAssoOfInter("E5")]++;
    compteur[jeu.getCouleurAssoOfInter("E6")]++;
    compteur[jeu.getCouleurAssoOfInter("D5")]++;
    compteur[jeu.getCouleurAssoOfInter("C5")]++;

    for (var i=0;i<5;i++){
        if(compteur[i]>1){
            IsColorTwiceInFuturePileC5=true;
        }
    }
    jeu.DeplacerVers("E4","E5");
    jeu.DeplacerVers("E5","E6");
    jeu.DeplacerVers("E6","D5");
    jeu.DeplacerVers("D5","C5");

    assertTrue((jeu.getPlateauEtatCase("C5") !==Lyngk.State.FULL_STACK && IsColorTwiceInFuturePileC5===true) ||
        (jeu.getPlateauEtatCase("C5") ===Lyngk.State.FULL_STACK && IsColorTwiceInFuturePileC5===false));
};

LyngkTestCase.prototype.testHist24 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    //joueur 1 = 0    et joueur 2 = 1
    assertTrue(jeu.getActivePlayer()===0);
};