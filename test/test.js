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
    console.log(compteur);
    assertEquals(compteur,43);
}

/*
LyngkTestCase.prototype.testC = function(){
    var c = new Lyngk.Coordinates("B",4);
    assertFalse(c.CoordinRepresentation());
}
    */