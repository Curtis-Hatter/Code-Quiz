var timer = document.querySelector("#Timer");
var questions = document.querySelector("#Questions");
var highScore = document.querySelector("#highScore");

var userScore = 18;
var time = 4;

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

    //changing innerHTML for Content
    highScore.innerHTML = "<h3> Your final score is: " + userScore + "!</h3>";

    //create all childs for Highscore form
    var form = document.createElement("form");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var input1 = document.createElement("input");
    var button = document.createElement("button");

    //create attributes for div elements
    div1.setAttribute("class", "form-row");
    div2.setAttribute("class", "col-9");
    div3.setAttribute("class", "col-3");

    //create attributes for input elements
    input1.setAttribute("type", "text");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("placeholder", "Welcome to the Leaderboards");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary")
    button.textContent = "Submit";

    //child appending to create form
    div2.appendChild(input1);
    div3.appendChild(button);
    div1.appendChild(div2);
    div1.appendChild(div3);
    form.appendChild(div1);
    highScore.appendChild(form);

    //recheck for nodes
    console.log(highScore.childElementCount);
}

// countDown;