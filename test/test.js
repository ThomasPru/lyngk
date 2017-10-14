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
    var compteur_one_piece=0;
    for(var i=0;i<jeu.plateau.size();i++) {
        jeu.plateau[i].poserPiece(Lyngk.Color.BLUE);
        if (jeu.plateau[i].getState() == Lyngk.State.ONE_PIECE){
            compteur_one_piece++;
        }
    }
    assertTrue(compteur_one_piece===43);
}
