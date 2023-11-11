const buttonColor = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
   console.log("succes")
  
if(userClickedPattern.length === gamePattern.length){
  setTimeout(function () {
    nextSequence();
  }, 1000);
}
  }else{
    playSound("wrong")
    addErrorColor()
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }

}
function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4); //save a random number between 1 and 3
  let randomChosenColor = buttonColor[randomNumber];//assign to the button a random number
  gamePattern.push(randomChosenColor);//adding to the array the chosenColor
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  
  
  playSound(randomChosenColor);
}

function addErrorColor(){
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
level = 0
gamePattern = []
gameStarted = false
}

