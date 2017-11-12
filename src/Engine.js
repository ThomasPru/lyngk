"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Players = {playerOne: 0, playerTwo: 1};

Lyngk.GameEtat = {PLAY: 0, OVER: 1};

/**
 * @return {boolean}
 */
Lyngk.Engine = function () {

    this.findColor = function (color) {
        var possibilities = 0;
        var index;
        var co;
        for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
            co = Lyngk.BOARD_GAME[index];
            if (this.getColorOfInter(co) === color) {
                possibilities += this.getDirectionValidOfInters(co) > 0;
            }
        }
        return possibilities;
    };

    var winner=null;

    this.getWinner = function () {
        return winner;
    };

    var plateau = [];

    var activePlayer;

    var gameState = Lyngk.GameEtat.PLAY;

    this.getGameState = function () {
        return gameState;
    };

    var claimedColor = [[null, null], [null, null]];
    var scorePlayer = [0, 0];

    var nbPossibilities = [40, 40];


    this.getScore = function (player) {
        return scorePlayer[player];
    };

    this.getActivePlayer = function () {
        return activePlayer;
    };

    this.getPlayerColor = function (player, no) {
        return claimedColor[player][no];
    };

    this.claimColor = function (color) {
        if (color !== claimedColor[(this.getActivePlayer() + 1) % 2][0] &&
            color !== claimedColor[(this.getActivePlayer() + 1) % 2][1]) {
            if (claimedColor[this.getActivePlayer()][0] !== null) {
                claimedColor[this.getActivePlayer()][1] = color;
            }
            else {
                claimedColor[this.getActivePlayer()][0] = color;
            }
        }

        this.countPossibilities();
    };

    this.getNbCoupPosForPlayer = function (player) {
        return nbPossibilities[player];
    };

    this.evolveDirection = function (origin, AscentLetter, AscentNumb) {
        var inters = this.getCoordinateCase(origin);
        var deep = 0;
        var next = String.fromCharCode((origin[0]).charCodeAt(0) + AscentLetter + deep) + (parseInt(origin[1]) + AscentNumb + deep);
        while (Lyngk.BOARD_GAME.indexOf(next) !== -1) {
            if (this.getSizePileOnInter(next) === 0) {
                deep +=1;
                next = String.fromCharCode((origin[0]).charCodeAt(0) + AscentLetter + deep) + (parseInt(origin[1]) + AscentNumb + deep);
            }
            else {
                next = this.getCoordinateCase(next);
                return Number(this.checkMove(inters, next));
            }
        }
        return 0;
    };

    this.getDirectionValidOfInters = function (origin) {
        var nbWayPossible = 0;
        nbWayPossible += this.evolveDirection(origin,1,0);
        nbWayPossible += this.evolveDirection(origin,-1,0);
        nbWayPossible += this.evolveDirection(origin,0,1);
        nbWayPossible += this.evolveDirection(origin,0,-1);
        nbWayPossible += this.evolveDirection(origin,1,1);
        nbWayPossible += this.evolveDirection(origin,-1,-1);

        return nbWayPossible;
    };

    this.countPossibilities = function () {
        var possibilities = 0;
        var index;
        for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
            if (( this.getColorOfInter(Lyngk.BOARD_GAME[index]) !== null) &&
                ( this.getColorOfInter(Lyngk.BOARD_GAME[index]) === this.getPlayerColor(this.getActivePlayer(), 0) ||
                    this.getColorOfInter(Lyngk.BOARD_GAME[index]) === this.getPlayerColor(this.getActivePlayer(), 1) ||
                    (this.getPlayerColor(this.getActivePlayer(), 0) === null &&
                        this.getColorOfInter(Lyngk.BOARD_GAME[index]) !== Lyngk.Color.WHITE )
                )) {
                possibilities +=1;
            }
        }

        if (this.getPlayerColor((this.getActivePlayer() + 1) % 2) !== null &&
            this.getPlayerColor(this.getActivePlayer(), 0) === null) {
            possibilities -= 8;
        }
        nbPossibilities[this.getActivePlayer()] = possibilities;
    };

    this.nbPiecesRes = function () {
        var nbPieces = 0;
        var index;
        for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
            nbPieces += this.getSizePileOnInter(Lyngk.BOARD_GAME[index]);
        }
        return nbPieces;
    };

    this.Init_plateau_One = function () {
        var co;
        var index;
        var inter;
        for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
            co=Lyngk.BOARD_GAME[index];
            inter = new Lyngk.Intersection(co[0], co[1]);
            inter.poserPiece(Lyngk.Color.BLUE);
            plateau.push(inter);
        }
    };

    this.Init_plateau_FULL = function () {
        scorePlayer = [0, 0];
        var cptColor = [0, 0, 0, 0, 0, 0];
        activePlayer = Lyngk.Players.playerOne;
        var coordinate;
        var index;
        var inter;
        var rng;
        for (index = 0; index < Lyngk.BOARD_GAME.length; index += 1) {
            coordinate=Lyngk.BOARD_GAME[index];
            inter = new Lyngk.Intersection(coordinate[0], coordinate[1]);
            do {
                rng = Math.floor(Math.random() * 6);
            }
            while ((cptColor[rng] === 8 && rng !== Lyngk.Color.WHITE) ||
            (cptColor[rng] === 3 && rng === Lyngk.Color.WHITE));
            inter.poserPiece(rng);
            plateau.push(inter);
            cptColor[rng] +=1;
        }
        /*
        var letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        for (var x = 0; x < letter.length; x++) {
            for (var y = 1; y < 10; y++) {
                if (Lyngk.BOARD_GAME.indexOf(letter[x] + y) !== -1) {
                    var inter = new Lyngk.Intersection(letter[x], y);
                    var rng;
                    do {
                        rng = Math.floor(Math.random() * 6);
                    }
                    while ((cptColor[rng] === 8 && rng !== Lyngk.Color.WHITE) || (cptColor[rng] === 3 && rng === Lyngk.Color.WHITE));
                    inter.poserPiece(rng);
                    plateau.push(inter);
                    cptColor[rng] +=1;
                }
            }
        }
        */
    };

    this.getCoordinateCase = function (c) {
        var index;
        for (index in plateau) {
            if (plateau[index].getCoordinate().toString() === c) {
                return plateau[index];
            }
        }
    };

    this.checkGetOnePoint = function (activePlayer, next) {
        return (next.getSizeStack() === 5 &&
        (next.getColorAssociated() === this.getPlayerColor(activePlayer, 0) ||
            next.getColorAssociated() === this.getPlayerColor(activePlayer, 1)));
    };

    this.moveTo = function (origin, destination) {
        var moveValid = false;
        if (this.getGameState() === Lyngk.GameEtat.OVER) {
            console.log("END OF GAME");
        }
        else {
            var source = this.getCoordinateCase(origin);
            var next = this.getCoordinateCase(destination);
            moveValid = this.checkMove(source, next);
            if (moveValid === true) {
                var pile_tempoA = [];
                while (source.getSizeStack() > 0) {
                    pile_tempoA.push(source.getColorAssociated());
                    source.removePiece();
                }
                while (pile_tempoA.length > 0) {
                    next.poserPiece(pile_tempoA[pile_tempoA.length - 1]);
                    pile_tempoA.pop();
                }
                if (this.checkGetOnePoint(this.getActivePlayer(), next)) {
                    console.log("1 pt for player : " + this.getActivePlayer());
                    scorePlayer[this.getActivePlayer()]++;
                    while (next.getSizeStack() > 0) {
                        next.removePiece();
                    }
                }
                activePlayer=(this.getActivePlayer()+1)%2;
                this.countPossibilities();
                if (this.getPlayerColor(this.getActivePlayer(), 0) !== null &&
                    this.getPlayerColor((this.getActivePlayer() + 1) % 2, 0) !== null) {
                    if (this.findColor(this.getPlayerColor(this.getActivePlayer(), 0)) === 0 &&
                        (this.findColor(this.getPlayerColor(this.getActivePlayer(), 1)) === 0)) {
                        gameState = Lyngk.GameEtat.OVER;
                        this.callWinner();
                    }
                }
            }
        }
    };

    this.checkSubPile = function (hauteur) {
        var pile_player1 = 0;
        var pile_player2 = 0;
        var intersection;
        for (intersection = 0; intersection < Lyngk.BOARD_GAME.length; intersection++) {
            if (this.getSizePileOnInter(Lyngk.BOARD_GAME[intersection]) === hauteur &&
                (this.getColorOfInter(Lyngk.BOARD_GAME[intersection]) === this.getPlayerColor(Lyngk.Players.playerOne, 0)) ||
                (this.getColorOfInter(Lyngk.BOARD_GAME[intersection]) === this.getPlayerColor(Lyngk.Players.playerOne, 1))) {
                pile_player1++;
            }
            if (this.getSizePileOnInter(Lyngk.BOARD_GAME[intersection]) === hauteur &&
                (this.getColorOfInter(Lyngk.BOARD_GAME[intersection]) === this.getPlayerColor(Lyngk.Players.playerTwo, 0)) ||
                (this.getColorOfInter(Lyngk.BOARD_GAME[intersection]) === this.getPlayerColor(Lyngk.Players.playerTwo, 1))) {
                pile_player2++;
            }
        }
        if (pile_player1 === pile_player2) {
            return null;
        }
        return Number(pile_player1 < pile_player2);
    };


    this.callWinner = function () {
        var scoreP1 = this.getScore(Lyngk.Players.playerOne);
        var scoreP2 = this.getScore(Lyngk.Players.playerTwo);
        if (scoreP1 === scoreP2) {
            var high=4;
            while(winner===null && high>0){
                winner = this.checkSubPile(high);
                high --;
            }
        }
        else {
            winner = Number(scoreP1 < scoreP2);
        }
        console.log(" Winner is player : " + winner);
    };

    this.getPlateauStateCase = function (co) {
        if (typeof co === "number") {
            return plateau[co].getState();
        }
        var inters = this.getCoordinateCase(co);
        return inters.getState();
    };

    this.getSizePileOnInter = function (co) {
        if (typeof co === "number") {
            return plateau[co].getSizeStack();
        }
        var inters = this.getCoordinateCase(co);
        return inters.getSizeStack();

    };

    this.getColorOfInter = function (i) {
        if (typeof i === "number") {
            return plateau[i].getColorAssociated();
        }
        var inters = this.getCoordinateCase(i);
        return inters.getColorAssociated();
    };


    this.getColorFromPieceFromInterS = function (i, j) {
        if (typeof i === "number") {
            return plateau[i].getColorPieceFromPile(j);
        }
        var inters = this.getCoordinateCase(i);
        return inters.getColorPieceFromPile(j);
    };


    this.getSizePlat = function () {
        return plateau.length;
    };

    this.checkColorClaimOpponent = function (source,activePlayer) {
        return (source.getColorAssociated() !== this.getPlayerColor((activePlayer + 1) % 2, 0) &&
        source.getColorAssociated() !== this.getPlayerColor((activePlayer + 1) % 2, 1));
    };

    this.checkMove = function (source, next) {
        var check=[0,0,0,0,0,0,0];
        check[0]+=checkLegalLine(source, next);
        check[1] += source.getSizeStack() !== 0 && next.getSizeStack() !== 0;
        check[2] += this.checkSourceToNext(source, next);
        check[3] += this.getSizePileSom(source, next) <= 5;
        check[4] += this.comparePile(source, next);
        check[5] += !this.compareIsDoubleColor(source, next);
        check[6] += this.checkColorClaimOpponent(source, this.getActivePlayer());

        for(var i=0;i<7;i++){
            if(check[i]===0){
                return false;
            }
        }
        return true;
    };


    this.compareIsDoubleColor = function (source, next) {
        var cptColor = [0, 0, 0, 0, 0, 0];
        var index;
        for (index = 0; index < source.getSizeStack(); index++) {
            cptColor[source.getColorPieceFromPile(index)]++;
        }
        for (index= 0; index< next.getSizeStack(); index++) {
            cptColor[next.getColorPieceFromPile(index)]++;
        }
        for (index = 0; index < 5; index +=1) {
            if (cptColor[index] > 1) {
                return true;
            }
        }
        return false;
    };

    this.comparePile = function (source, next) {
        var pileSource=this.getSizePileOnInter(source.getX() + source.getY());
        var pileNext=this.getSizePileOnInter(next.getX() + next.getY());
        return pileSource >= pileNext;
    };

    this.getSizePileSom = function (source, next) {
        return this.getSizePileOnInter(source.getX() + source.getY()) +
            this.getSizePileOnInter(next.getX() + next.getY());
    };


    this.checkSourceToNext = function (source, next) {
        var index;
        var tempo_int;
        if (source.getX() === next.getX()) {
            if (source.getY() < next.getY()) {
                for (index = source.getY() + 1; index < next.getY(); index +=1) {
                    tempo_int = (source.getX() + index).toString();
                    if (this.getSizePileOnInter(tempo_int) > 0) {
                        return false;
                    }
                }
            }
            else {
                for (index = source.getY() - 1; index > next.getY(); index -=1) {
                    tempo_int = (source.getX() + index).toString();
                    if (this.getSizePileOnInter(tempo_int) > 0) {
                        return false;
                    }
                }
            }
        }
        else {
            if (source.getY() === next.getY()) {
                if (source.getX() < next.getX()) {
                    for (index = source.getX().charCodeAt(0) - 64 + 1; index < next.getX().charCodeAt(0) - 64; index +=1) {
                        tempo_int = (String.fromCharCode(index + 64) + source.getY()).toString();
                        if (this.getSizePileOnInter(tempo_int) > 0) {
                            return false;
                        }
                    }
                }
                else {
                    for (index = source.getX().charCodeAt(0) - 64 - 1; index > next.getX().charCodeAt(0) - 64; index--) {
                        tempo_int = (String.fromCharCode(index + 64) + source.getY()).toString();
                        if (this.getSizePileOnInter(tempo_int) > 0) {
                            return false;
                        }
                    }
                }
            }
            else {
                if ((source.getX().charCodeAt(0) - 64) * 10 + source.getY() < (next.getX().charCodeAt(0) - 64) * 10 + next.getY()) {
                    for (index = source.getY() + 1; index < next.getY(); index++) {
                        tempo_int = (String.fromCharCode(source.getX().charCodeAt(0) + (index - source.getY())) + index).toString();
                        if (this.getSizePileOnInter(tempo_int) > 0) {
                            return false;
                        }
                    }
                }
                else {
                    for (index = source.getY() - 1; index > next.getY(); index--) {
                        tempo_int = (String.fromCharCode(source.getX().charCodeAt(0) + (index - source.getY())) + index).toString();
                        if (this.getSizePileOnInter(tempo_int) > 0) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    function checkLegalLine(source, next) {
        var hSource=source.getHashCoordinate();
        var hNext=next.getHashCoordinate();
        return Math.abs(hSource - hNext) % 11 === 0 ||
            (source.getX() === next.getX()) || (source.getY() === next.getY());
    }
};

