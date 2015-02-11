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

function spinButtonOut() {
    spinButton.alpha = 1.0;
}

function spinButtonOver() {
    spinButton.alpha = 0.7;
}

function spinReels() {
    //add the code to spin reels
}

function createUi() {
    //instantate the background
    background = new createjs.Bitmap("assets/images/background-slot.png");
    game.addChild(background);

    //instatite the spin button
    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x = 456;
    spinButton.y = 535;
    game.addChild(spinButton);

    //instatite the reset button
    resetButton = new createjs.Bitmap("assets/images/reset.png");
    resetButton.x = 61;
    resetButton.y = 539;
    game.addChild(resetButton);

    //instatite the bet 1 button
    bet1Button = new createjs.Bitmap("assets/images/bet1.png");
    bet1Button.x = 143;
    bet1Button.y = 538;
    game.addChild(bet1Button);

    //instatite the bet 5 button
    bet5Button = new createjs.Bitmap("assets/images/spin.png");
    bet5Button.x = 217;
    bet5Button.y = 537;
    game.addChild(bet5Button);

    //instatite the bet 10 button
    bet10Button = new createjs.Bitmap("assets/images/spin.png");
    348, 537;
    bet10Button.x = 288;
    bet10Button.y = 535;
    game.addChild(bet10Button);

    //instatite the bet 10 button
    resetBetButton = new createjs.Bitmap("assets/images/spin.png");
    resetBetButton.x = 361;
    resetBetButton.y = 535;
    game.addChild(resetBetButton);

    spinButton.addEventListener("click", spinReels);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);
}

// Our Game Kicks off in here
function main() {
    //instantiate the game container
    game = new createjs.Container();

    //get the slots ui
    createUi;

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
