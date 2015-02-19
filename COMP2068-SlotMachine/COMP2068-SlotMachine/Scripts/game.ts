// Game Objects 
var canvas;
var stage: createjs.Stage;
var game: createjs.Container;
var reelContainer: createjs.Container[] = []; 

var background: createjs.Bitmap;
var spinButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var bet1Button: createjs.Bitmap;
var bet5Button: createjs.Bitmap;
var bet10Button: createjs.Bitmap;
var resetBetButton: createjs.Bitmap;
var reelImgs: createjs.Bitmap[] = []; 

var creditsText: createjs.Text;
var betText: createjs.Text;
var winningsText: createjs.Text;
var jackpotText: createjs.Text;

//game variables
var playerBet: number = 1;
var playerCredits: number = 500;
var lastWinnings: number = 0;
var jackpot: number = 1000;
var grapes: number = 0;
var bananas: number = 0;
var oranges: number = 0;
var cherries: number = 0;
var bars: number = 0;
var bells: number = 0;
var sevens: number = 0;
var blanks: number = 0;
var turn: number = 0;
var spinResult;
var fruits = "";

//reset all the counters to 0
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

//see if the player won the jackpot
function checkJackPot() {
    // compare two random values
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        playerCredits += jackpot;
        jackpot = 1000;
    }
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
    determineWinnings();

    for (var index = 0; index < 3; index++) {

        reelContainer[index].removeAllChildren();
        reelImgs[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelImgs[index].x = 148 + (95 * index);
        reelImgs[index].y = 333;
        
        reelContainer[index].addChild(reelImgs[index]);
    }
}

function resetGame() {
    playerBet = 1;
    playerCredits  = 500;
    lastWinnings = 0;
    jackpot = 1000;

    game.removeAllChildren();
    createUi();
}

//if the player changes their bet amount
function betting(amount: number) {

    //if they chose to reset the amount
    if (amount == null) {
        playerBet = 1;
        betText.text = "" + playerBet;
        betText.regX = betText.getBounds().width;
    }else{
        playerBet += amount;
        betText.text = "" + playerBet;
        betText.regX = betText.getBounds().width;     
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
                betLine[spin] = "grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;

        }
    }
    return betLine;
}

function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            lastWinnings = playerBet * 10;
        }
        else if (bananas == 3) {
            lastWinnings = playerBet * 20;
        }
        else if (oranges == 3) {
            lastWinnings = playerBet * 30;
        }
        else if (cherries == 3) {
            lastWinnings = playerBet * 40;
        }
        else if (bars == 3) {
            lastWinnings = playerBet * 50;
        }
        else if (bells == 3) {
            lastWinnings = playerBet * 75;
        }
        else if (sevens == 3) {
            lastWinnings = playerBet * 100;
        }
        else if (grapes == 2) {
            lastWinnings = playerBet * 2;
        }
        else if (bananas == 2) {
            lastWinnings = playerBet * 2;
        }
        else if (oranges == 2) {
            lastWinnings = playerBet * 3;
        }
        else if (cherries == 2) {
            lastWinnings = playerBet * 4;
        }
        else if (bars == 2) {
            lastWinnings = playerBet * 5;
        }
        else if (bells == 2) {
            lastWinnings = playerBet * 10;
        }
        else if (sevens == 2) {
            lastWinnings = playerBet * 20;
        }
        else if (sevens == 1) {
            lastWinnings = playerBet * 5;
        }
        else {
            lastWinnings = playerBet * 1;
        }

        playerCredits += lastWinnings;

        creditsText.text = "" + playerCredits;
        creditsText.regX = creditsText.getBounds().width;  
         
        winningsText.text = "" + lastWinnings;
        winningsText.regX = winningsText.getBounds().width; 

        checkJackPot(); 
        resetFruitTally(); 
    }
    else {

        playerCredits -= playerBet;

        creditsText.text = "" + playerCredits;
        creditsText.regX = creditsText.getBounds().width;
         
        jackpot += Math.round(playerBet * .5);  
        jackpotText.text = "" + jackpot;
        jackpotText.regX = jackpotText.getBounds().width * .5; 

        if (playerCredits == 0) {
            playerLose();
        }

        resetFruitTally();
    }

}

function playerLose(){
    alert("It seems your all out of money. Please Leave.");
    window.open('', '_parent', '');
    window.close();
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

    //instatite the players total credits
    creditsText = new createjs.Text("" + playerCredits, "40px Comic Sans MS", "#000000");
    creditsText.x = 219;
    creditsText.y = 148;
    creditsText.regX = creditsText.getBounds().width
    game.addChild(creditsText);

    //instatite the players bet
    betText = new createjs.Text("" + playerBet, "40px Comic Sans MS", "#000000");
    betText.x = 325;
    betText.y = 148;
    betText.regX = betText.getBounds().width
    game.addChild(betText);

    //instatite the players last winnings amount
    winningsText = new createjs.Text("" + lastWinnings, "40px Comic Sans MS", "#000000");
    winningsText.x = 466;
    winningsText.y = 148;
    winningsText.regX = betText.getBounds().width
    game.addChild(winningsText);

    //instatite the jackpot amount
    jackpotText = new createjs.Text("" + jackpot, "40px Comic Sans MS", "#000000");
    jackpotText.x = 279;
    jackpotText.y = 79;
    jackpotText.regX = jackpotText.getBounds().width * 0.5
    game.addChild(jackpotText);
}



//start of the game
function main() {
    //instantiate the game container
    game = new createjs.Container();

    //get the slots ui
    createUi();

    //add the containers to the stage
    stage.addChild(game);  
    for (var i = 0; i < 3; i++) {
        reelContainer[i] = new createjs.Container();
        stage.addChild(reelContainer[i]);
    }  
}