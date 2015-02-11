var canvas;
var stage;

// Game Objects
var game;
var background;
var spinButton;
var resetButton;
var bet1Button;
var bet5Button;
var bet10Button;
var resetBetButton;
var bettingAmount;

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

function buttonOut(button) {
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

function buttonOver(button) {
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
    //add the code to spin reels
}

function resetGame() {
}

function betting(ammount) {
}

function createUi() {
    //instantate the background
    background = new createjs.Bitmap("assets/images/background-slot.png");
    game.addChild(background);

    //instatite the spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 456;
    spinButton.y = 537;
    game.addChild(spinButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", function () {
        buttonOver("spinButton");
    });
    spinButton.addEventListener("mouseout", function () {
        buttonOut("spinButton");
    });

    //instatite the reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 61;
    resetButton.y = 537;
    game.addChild(resetButton);

    resetButton.addEventListener("click", resetGame);
    resetButton.addEventListener("mouseover", function () {
        buttonOver("resetButton");
    });
    resetButton.addEventListener("mouseout", function () {
        buttonOut("resetButton");
    });

    //instatite the bet 1 button
    bet1Button = new createjs.Bitmap("assets/images/bet1.png");
    bet1Button.x = 148;
    bet1Button.y = 537;
    game.addChild(bet1Button);

    bet1Button.addEventListener("click", function () {
        betting(1);
    });
    bet1Button.addEventListener("mouseover", function () {
        buttonOver("bet1Button");
    });
    bet1Button.addEventListener("mouseout", function () {
        buttonOut("bet1Button");
    });

    //instatite the bet 5 button
    bet5Button = new createjs.Bitmap("assets/images/bet5.png");
    bet5Button.x = 222;
    bet5Button.y = 537;
    game.addChild(bet5Button);

    bet5Button.addEventListener("click", function () {
        betting(5);
    });
    bet5Button.addEventListener("mouseover", function () {
        buttonOver("bet5Button");
    });
    bet5Button.addEventListener("mouseout", function () {
        buttonOut("bet5Button");
    });

    //instatite the bet 10 button
    bet10Button = new createjs.Bitmap("assets/images/bet10.png");
    348, 537;
    bet10Button.x = 293;
    bet10Button.y = 537;
    game.addChild(bet10Button);

    bet10Button.addEventListener("click", function () {
        betting(10);
    });
    bet10Button.addEventListener("mouseover", function () {
        buttonOver("bet10Button");
    });
    bet10Button.addEventListener("mouseout", function () {
        buttonOut("bet10Button");
    });

    //instatite the reset bet button
    resetBetButton = new createjs.Bitmap("assets/images/resetBet.png");
    resetBetButton.x = 366;
    resetBetButton.y = 537;
    game.addChild(resetBetButton);

    resetBetButton.addEventListener("click", function () {
        betting(null);
    });
    resetBetButton.addEventListener("mouseover", function () {
        buttonOver("resetBetButton");
    });
    resetBetButton.addEventListener("mouseout", function () {
        buttonOut("resetBetButton");
    });
}

// Our Game Kicks off in here
function main() {
    //instantiate the game container
    game = new createjs.Container();

    //get the slots ui
    createUi();

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
