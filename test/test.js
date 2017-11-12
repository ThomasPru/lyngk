"use strict";

Math.seedrandom("1234");

var LyngkTestCase = TestCase("LyngkTestCase");


LyngkTestCase.prototype.testA = function () {
    var c = new Lyngk.Coordinates("A", 1);
    assertFalse(c.valid());
};

LyngkTestCase.prototype.testB = function () {
    var counter = 0;
    var co;
    var index;
    var inter;
    for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
        co=Lyngk.BOARD_GAME[index];
        inter = new Lyngk.Coordinates(co[0], co[1]);
        if (inter.valid()) {
            counter += 1;
        }
    }
    assertEquals(counter, 43);
};


LyngkTestCase.prototype.testC = function () {
    var c = new Lyngk.Coordinates("B", 4);
    assertTrue(c.toString() === "B4");
};

LyngkTestCase.prototype.testD = function () {
    var c = new Lyngk.Coordinates("A", 1);
    assertTrue(c.toString() === "invalid");
};

LyngkTestCase.prototype.testE = function () {
    var c = new Lyngk.Coordinates("B", 4);
    assertEquals(c.toString(), c.clone().toString());
};

LyngkTestCase.prototype.testHist6 = function () {
    var c = new Lyngk.Coordinates("B", 4);
    var hash = c.hash();
    assertEquals(hash, 24);
};

LyngkTestCase.prototype.testHist7 = function () {
    var c = new Lyngk.Intersection();
    assertEquals(c.getState(), Lyngk.State.VACANT);

};

LyngkTestCase.prototype.testHist8 = function () {
    var inter = new Lyngk.Intersection("B", 2);
    inter.poserPiece(Lyngk.Color.BLUE);
    assertTrue(inter.getState() === Lyngk.State.ONE_PIECE &&
        inter.getColorAssociated() === Lyngk.Color.BLUE);
};


LyngkTestCase.prototype.testHist9 = function () {
    var inter = new Lyngk.Intersection("B", 2);
    inter.poserPiece(Lyngk.Color.BLUE);
    inter.poserPiece(Lyngk.Color.RED);
    assertTrue(inter.getState() === Lyngk.State.STACK &&
        inter.getColorAssociated() === Lyngk.Color.RED);
};

LyngkTestCase.prototype.testHist10 = function () {
    var inter = new Lyngk.Intersection("B", 2);
    inter.poserPiece(Lyngk.Color.BLUE);
    inter.poserPiece(Lyngk.Color.RED);
    inter.poserPiece(Lyngk.Color.GREEN);
    inter.poserPiece(Lyngk.Color.GREEN);
    inter.poserPiece(Lyngk.Color.GREEN);
    assertTrue(inter.getState() === Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testHist11 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var cpt_one_piece = 0;

    for (var i = 0; i < jeu.getSizePlat(); i +=1) {
        if (jeu.getPlateauStateCase(i) === Lyngk.State.ONE_PIECE) {
            cpt_one_piece += 1;
        }
    }
    assertEquals(cpt_one_piece, 43);
};

LyngkTestCase.prototype.testHist12 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    var cpt=[0,0,0,0,0,0];

    for (var i = 0; i < jeu.getSizePlat(); i++) {
        //BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5
        cpt[jeu.getColorOfInter(i)]++;
    }
    assertTrue(cpt[0] === 8 && cpt[1] === 8 && cpt[2] === 8 && cpt[3] === 8 && cpt[4] === 8 && cpt[5] === 3);
};


LyngkTestCase.prototype.testHist13 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One ();
    var cpt_valid_size_inter = 0;
    for (var i = 0; i < jeu.getSizePlat(); i++) {
        if (jeu.getSizePileOnInter(i) === 1) {
            cpt_valid_size_inter++;
        }
    }
    assertEquals(cpt_valid_size_inter, jeu.getSizePlat());
};

LyngkTestCase.prototype.testHist14 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_One();
    var cpt_intersection_non_empty = 0;
    var cpt_ColorAssociated_intersection_valid = 0;
    for (var i = 0; i < jeu.getSizePlat(); i++) {
        if (jeu.getSizePileOnInter(i) >= 1) {
            cpt_intersection_non_empty++;
            if (jeu.getColorOfInter(i) === jeu.getColorFromPieceFromInterS(i, jeu.getSizePileOnInter(i) - 1)) {
                cpt_ColorAssociated_intersection_valid++;
            }
        }
    }
    assertTrue(cpt_intersection_non_empty === jeu.getSizePlat() &&
        cpt_ColorAssociated_intersection_valid === jeu.getSizePlat());
};

LyngkTestCase.prototype.testHist15 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var colorSourceBeforeDep = jeu.getCoordinateCase("A3").getColorAssociated();
    jeu.moveTo("A3", "B3");
    assertTrue(jeu.getPlateauStateCase("A3") === Lyngk.State.VACANT &&
        jeu.getCoordinateCase("B3").getColorAssociated() === colorSourceBeforeDep);
};

LyngkTestCase.prototype.testHist16 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.moveTo("A3", "B3");
    var colorSourceBeforeDep = jeu.getCoordinateCase("B3").getColorAssociated();
    jeu.moveTo("B3", "B2");
    assertTrue(jeu.getPlateauStateCase("B3") === Lyngk.State.VACANT &&
        jeu.getCoordinateCase("B2").getColorAssociated() === colorSourceBeforeDep);
};

LyngkTestCase.prototype.testHist17 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.moveTo("B2", "B3");
    var ColorB3 = jeu.getCoordinateCase("B3").getColorAssociated();
    jeu.moveTo("B3", "B2");
    assertTrue(jeu.getPlateauStateCase("B3") !== Lyngk.State.VACANT &&
        ColorB3 === jeu.getCoordinateCase("B3").getColorAssociated());
};

LyngkTestCase.prototype.testHist18 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var ColorB3 = jeu.getCoordinateCase("B3").getColorAssociated();
    jeu.moveTo("B3", "C2");
    assertTrue(jeu.getPlateauStateCase("B3") !== Lyngk.State.VACANT &&
        ColorB3 === jeu.getCoordinateCase("B3").getColorAssociated());
};


LyngkTestCase.prototype.testHist19 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var ColorH5 = jeu.getCoordinateCase("H5").getColorAssociated();
    jeu.moveTo("H5", "H8");
    assertTrue(jeu.getPlateauStateCase("H5") !== Lyngk.State.VACANT &&
        ColorH5 === jeu.getCoordinateCase("H5").getColorAssociated());
};


LyngkTestCase.prototype.testHist20 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    jeu.moveTo("E3", "E4");
    jeu.moveTo("E4", "E5");
    jeu.moveTo("E5", "E6");
    jeu.moveTo("E6", "F7");

    var ColorSav = jeu.getCoordinateCase("F7").getColorAssociated();
    jeu.moveTo("F7", "G7");

    assertTrue(jeu.getPlateauStateCase("F7") === Lyngk.State.FULL_STACK &&
        ColorSav === jeu.getCoordinateCase("F7").getColorAssociated());
};

LyngkTestCase.prototype.testHist21 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.moveTo("A3", "B3");

    var ColorSav = jeu.getCoordinateCase("C3").getColorAssociated();
    jeu.moveTo("C3", "B3");

    assertTrue(jeu.getPlateauStateCase("C3") !== Lyngk.State.VACANT &&
        ColorSav === jeu.getCoordinateCase("C3").getColorAssociated());

};

LyngkTestCase.prototype.testHist22 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.moveTo("E3", "E4");
    var ColorSav = jeu.getCoordinateCase("E5").getColorAssociated();
    //impossible car la pile en E4 > la pile en E5
    jeu.moveTo("E5", "E4");

    assertTrue(jeu.getPlateauStateCase("E5") !== Lyngk.State.VACANT &&
        ColorSav === jeu.getCoordinateCase("E5").getColorAssociated());
};

LyngkTestCase.prototype.testHist23 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var IsColorTwiceInFuturePileC5 = false;

    var counter = [0, 0, 0, 0, 0, 0];

    counter[jeu.getColorOfInter("E4")]++;
    counter[jeu.getColorOfInter("E5")]++;
    counter[jeu.getColorOfInter("E6")]++;
    counter[jeu.getColorOfInter("D5")]++;
    counter[jeu.getColorOfInter("C5")]++;

    for (var i = 0; i < 5; i++) {
        if (counter[i] > 1) {
            IsColorTwiceInFuturePileC5 = true;
        }
    }
    jeu.moveTo("E4", "E5");
    jeu.moveTo("E5", "E6");
    jeu.moveTo("E6", "D5");
    jeu.moveTo("D5", "C5");

    assertTrue((jeu.getPlateauStateCase("C5") !== Lyngk.State.FULL_STACK && IsColorTwiceInFuturePileC5 === true) ||
        (jeu.getPlateauStateCase("C5") === Lyngk.State.FULL_STACK && IsColorTwiceInFuturePileC5 === false));
};

LyngkTestCase.prototype.testHist24 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    assertTrue(jeu.getActivePlayer() === Lyngk.Players.playerOne);
};


LyngkTestCase.prototype.testHist25 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    //player 1
    jeu.moveTo("E4", "E5");

    assertTrue(jeu.getActivePlayer() === Lyngk.Players.playerTwo);
};

LyngkTestCase.prototype.testHist26 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    jeu.claimColor(Lyngk.Color.RED);
    jeu.moveTo("A3", "B3");
    jeu.claimColor(Lyngk.Color.GREEN);

    assertTrue(jeu.getPlayerColor(Lyngk.Players.playerOne, 0) === Lyngk.Color.RED &&
        jeu.getPlayerColor(Lyngk.Players.playerTwo, 0) === Lyngk.Color.GREEN);
};

LyngkTestCase.prototype.testHist27 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    //player1
    jeu.claimColor(Lyngk.Color.GREEN);
    jeu.moveTo("E3", "E4");

    //player2
    jeu.claimColor(Lyngk.Color.RED);
    jeu.moveTo("C3", "C4");

    //player1
    jeu.moveTo("E4", "E5");

    //player2
    jeu.moveTo("C4", "C5");

    //player1
    jeu.moveTo("E5", "D4");

    //player2
    jeu.moveTo("G5", "G6");

    //player1, marque un point
    jeu.moveTo("D4", "D5");

    //player2
    jeu.moveTo("C6", "C7");

    assertTrue(jeu.getScore(Lyngk.Players.playerOne, 4) === 1 &&
        jeu.nbPiecesRes() === 38);
};

LyngkTestCase.prototype.testHist28 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.claimColor(Lyngk.Color.GREEN);
    jeu.moveTo("E3", "E4");

    //player 2 ( impossible move because color claimed by 1)
    jeu.claimColor(Lyngk.Color.RED);

    var sizeE4 = jeu.getSizePileOnInter("E4");
    var SizeE5 = jeu.getSizePileOnInter("E5");
    jeu.moveTo("E4", "E5");

    assertTrue(sizeE4 === jeu.getSizePileOnInter("E4") &&
        SizeE5 === jeu.getSizePileOnInter("E5"));
};

LyngkTestCase.prototype.testHist29 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    assertTrue(jeu.getNbCoupPosForPlayer(jeu.getActivePlayer()) === 40);
};


LyngkTestCase.prototype.testHist30 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    jeu.claimColor(Lyngk.Color.BLACK);
    jeu.moveTo("B3", "B4");

    assertTrue(jeu.getNbCoupPosForPlayer(Lyngk.Players.playerTwo) === 32);
};

LyngkTestCase.prototype.testHist31 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();
    var directionPossibleC1 = jeu.getDirectionValidOfInters("C1");
    var directionPossibleG5 = jeu.getDirectionValidOfInters("G5");

    assertTrue(directionPossibleC1 === 2 && directionPossibleG5 === 3);
};


LyngkTestCase.prototype.testHist32 = function () {
    var jeu = new Lyngk.Engine();
    jeu.Init_plateau_FULL();

    //player1
    jeu.claimColor(Lyngk.Color.GREEN);
    jeu.moveTo("E3", "E4");

    //player2
    jeu.claimColor(Lyngk.Color.RED);
    jeu.moveTo("C2", "C3");

    //player1
    jeu.claimColor(Lyngk.Color.BLUE);
    jeu.moveTo("E4", "E5");

    //player2
    jeu.claimColor(Lyngk.Color.BLACK);
    jeu.moveTo("C3", "B3");

    //player1
    jeu.moveTo("F4", "F5");

    //player2
    jeu.moveTo("B3", "D3");

    //player1
    jeu.moveTo("F5", "F6");

    //player2
    jeu.moveTo("B4", "C5");

    //player1
    jeu.moveTo("F6", "G6");

    //player2
    jeu.moveTo("C5", "D6");

    //player1
    jeu.moveTo("G6", "H7");

    //player2
    jeu.moveTo("D6", "D7");

    //player1
    jeu.moveTo("C1", "D2");

    //player2
    jeu.moveTo("D7", "C7");

    //player1
    jeu.moveTo("D2", "B2");

    //player2
    jeu.moveTo("E7", "F8");


    //player1
    jeu.moveTo("B5", "C6");

    //player2
    jeu.moveTo("G8", "H8");


    //player1
    jeu.moveTo("G7", "G5");

    //player2
    jeu.moveTo("G4", "G3");

    //player1
    jeu.moveTo("B2", "D4");

    //player2
    jeu.moveTo("F3", "H5");

    //player1
    jeu.moveTo("D4", "D5");

    //player2
    jeu.moveTo("E6", "C4");

    //player1
    jeu.moveTo("I7", "H6");

    //player2
    jeu.moveTo("F8", "G9");

    //player1
    jeu.moveTo("H6", "C6");

    //player2
    jeu.moveTo("H5", "E2");

    console.log("---------------------");
    console.log("Current player : " + jeu.getActivePlayer());
    console.log("Current player's color : " + jeu.getPlayerColor(jeu.getActivePlayer(), 0) + " , " + jeu.getPlayerColor(jeu.getActivePlayer(), 1));
    jeu.findColor(jeu.getPlayerColor(jeu.getActivePlayer(), 0));
    console.log("------");
    jeu.findColor(jeu.getPlayerColor(jeu.getActivePlayer(), 1));

    assertTrue(jeu.getGameState() === Lyngk.GameEtat.OVER && jeu.getWinner() === Lyngk.Players.playerOne);
};