'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testA = function(){
    var c = new Lyngk.Coordinates("A",3);
    assertFalse(c.valid());
}

LyngkTestCase.prototype.testB = function(){
    var c = new Lyngk.Coordinates();
    assertFalse(c.validNbCasesValid());
}

LyngkTestCase.prototype.testC = function(){
    var c = new Lyngk.Coordinates();
    assertFalse(c.CoordinRepresentation());
}