﻿var canvas;
var stage: createjs.Stage;

// Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var bet1Button: createjs.Bitmap;
var bet5Button: createjs.Bitmap;
var bet10Button: createjs.Bitmap;
var resetBetButton: createjs.Bitmap;
var bettingAmount: number = 1;
var credit: number = 500;
var numberWins: number = 0;
var jackpot: number = 1000;
var creditsText: createjs.Text;
var betText: createjs.Text;
var winsText: createjs.Text;
var jackpotText: createjs.Text;
var reel1Img: createjs.Bitmap;
var reel2Img: createjs.Bitmap;
var reel3Img: createjs.Bitmap;

var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {
    stage.update();
}

function buttonOut(button: string) {
    switch (button) {
        case "spinButton":
            spinButton.alpha = 1.0;
            break;
        case "resetButton":
            resetButton.alpha = 1.0;
            break;
        case "bet1Button":
            bet1Button.alpha = 1.0;
            break;
        case "bet5Button":
            bet5Button.alpha = 1.0;
            break;
        case "bet10Button":
            bet10Button.alpha = 1.0;
            break;
        case "resetBetButton":
            resetBetButton.alpha = 1.0;
            break;
    }
}

function buttonOver(button: string) {

    switch (button) {
        case "spinButton":
            spinButton.alpha = 0.8;
            break;
        case "resetButton":
            resetButton.alpha = 0.8;
            break;
        case "bet1Button":
            bet1Button.alpha = 0.8;
            break;
        case "bet5Button":
            bet5Button.alpha = 0.8;
            break;
        case "bet10Button":
            bet10Button.alpha = 0.8;
            break;
        case "resetBetButton":
            resetBetButton.alpha = 0.8;
            break;
    }
}

function spinReels() {  
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    console.log(fruits);
}

function resetGame() {
    bettingAmount = 1;
    credit  = 200;
    numberWins = 0;
    jackpot = 1000;
}

function betting(amount: number) {

    if (amount == null) {
        bettingAmount = 1;
        console.log("" + bettingAmount);
    }else{
        bettingAmount += amount;
        console.log("" + bettingAmount);
    }
}

function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        //showWinMessage();
    }
    else {
        lossNumber++;
        //showLossMessage();
    }

}

function createUi(): void {

    //instantate the background
    background = new createjs.Bitmap("assets/images/background-slot.png");
    game.addChild(background);

    //instatite the spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 456 // set it to the x coord i got
    spinButton.y = 537 // set it to the y coord i got
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", function () { buttonOver("spinButton"); });
    spinButton.addEventListener("mouseout", function () { buttonOut("spinButton"); });

    //instatite the reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 61 // set it to the x coord i got
    resetButton.y = 537 // set it to the y coord i got
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetGame);
    resetButton.addEventListener("mouseover", function () { buttonOver("resetButton"); });
    resetButton.addEventListener("mouseout", function () { buttonOut("resetButton"); });

    //instatite the bet 1 button
    bet1Button = new createjs.Bitmap("assets/images/bet1.png");
    bet1Button.x = 148 // set it to the x coord i got
    bet1Button.y = 537 // set it to the y coord i got
    game.addChild(bet1Button);

    bet1Button.addEventListener("click", function () { betting(1); });
    bet1Button.addEventListener("mouseover", function () { buttonOver("bet1Button"); });
    bet1Button.addEventListener("mouseout", function () { buttonOut("bet1Button"); });

    //instatite the bet 5 button
    bet5Button = new createjs.Bitmap("assets/images/bet5.png");
    bet5Button.x = 222 // set it to the x coord i got
    bet5Button.y = 537 // set it to the y coord i got
    game.addChild(bet5Button);

    bet5Button.addEventListener("click", function () { betting(5); });
    bet5Button.addEventListener("mouseover", function () { buttonOver("bet5Button"); });
    bet5Button.addEventListener("mouseout", function () { buttonOut("bet5Button"); });

    //instatite the bet 10 button
    bet10Button = new createjs.Bitmap("assets/images/bet10.png"); 348, 537
    bet10Button.x = 293 // set it to the x coord i got
    bet10Button.y = 537 // set it to the y coord i got
    game.addChild(bet10Button);

    bet10Button.addEventListener("click", function () { betting(10); });
    bet10Button.addEventListener("mouseover", function () { buttonOver("bet10Button"); });
    bet10Button.addEventListener("mouseout", function () { buttonOut("bet10Button"); });

    //instatite the reset bet button
    resetBetButton = new createjs.Bitmap("assets/images/resetBet.png");
    resetBetButton.x = 366 // set it to the x coord i got
    resetBetButton.y = 537 // set it to the y coord i got
    game.addChild(resetBetButton);

    resetBetButton.addEventListener("click", function () { betting(null); });
    resetBetButton.addEventListener("mouseover", function () { buttonOver("resetBetButton"); });
    resetBetButton.addEventListener("mouseout", function () { buttonOut("resetBetButton"); });

    //instatite the first reel
    reel1Img = new createjs.Bitmap("assets/images/blank.png");
    reel1Img.x = 148 // set it to the x coord i got
    reel1Img.y = 333 // set it to the y coord i got
    game.addChild(reel1Img);

    //instatite the first reel
    reel2Img = new createjs.Bitmap("assets/images/blank.png");
    reel2Img.x = 242 // set it to the x coord i got
    reel2Img.y = 333 // set it to the y coord i got
    game.addChild(reel2Img);

    //instatite the first reel
    reel3Img = new createjs.Bitmap("assets/images/blank.png");
    reel3Img.x = 337 // set it to the x coord i got
    reel3Img.y = 333 // set it to the y coord i got
    game.addChild(reel3Img);
}



// Our Game Kicks off in here
function main() {
    //instantiate the game container
    game = new createjs.Container();

    //get the slots ui
    createUi();

    stage.addChild(game);    
}