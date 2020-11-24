var timer = document.querySelector("#Timer");
var questions = document.querySelector("#Questions");
var highScore = document.querySelector("#highScore");

var userScore = 18;
var time = 2;

//Setting timer for Quiz
var countDown = setInterval(function () {
    time--;
    timer.textContent = "Timer: " + time + " seconds";
    if (time <= 0) {
        time = 0;
        timer.textContent = "Timer: " + time + " seconds";
        formCreator()
        clearInterval(countDown);
        return;
    }
}, 1000)

//create the final form after quiz is concluded
function formCreator() {
    questions.textContent = "All Done!";

    //checking for nodes
    console.log(highScore.childElementCount)
    highScore.innerHTML = "<h3> Your final score is: </h3>";

    var form = document.createElement("form");
    form.textContent = "Hello World";
    highScore.appendChild(form);

    //recheck for nodes
    console.log(highScore.childElementCount);

}

// countDown;