var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence() {
       
        userClickedPattern = [];
        var randSelect = Math.random();
        var randomNumber = Math.floor(randSelect*4);

        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        playSound(randomChosenColour);
        $('#' + randomChosenColour).fadeOut(100);
        $('#' + randomChosenColour).fadeIn(100); 

        level++;
        $("#level-title").text("Level " + level);    
}

// Clicking feature comes here...
$(".btn").click(function () {
        var userChosenColour = this.id; // or you can use the attr() function in jQuery to find attribute values
        userClickedPattern.push(userChosenColour); 

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);

        // // move to next sequence
        // setTimeout(function() {
        //     nextSequence();
        //     }, 1000);
 
        })
        

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}


function animatePress(currentColour) {
        $("." + currentColour).addClass("pressed");

        // console.log($("." + currentColour).attr("class")); -- this is a debug helper to check if pressed is added
        
        setTimeout(function() {
            $("." + currentColour).removeClass("pressed");
            }, 100);
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            // move to next sequence
            setTimeout(function() {
                nextSequence();
                }, 1000);
            }

}  else {

        var error_audio = new Audio("sounds/wrong.mp3");
        error_audio.play(); 
        
        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
            }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");    

        startOver();
 }
}

function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
}
