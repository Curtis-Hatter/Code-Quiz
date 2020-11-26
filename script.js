//selections of tags to reference
var timer = document.querySelector("#Timer");
var questions = document.querySelector("#Questions");
var highScore = document.querySelector("#highScore");

//global variables
var userScore = 18;
var time = 3;

//objects
var q1 = {
    qstion: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<javascript>", "<js>", "<scripting>"],

}

var q2 = {
    qstion: "The external JavaScript file must contain the <script> tag.",
    answers: ["False", "True"]
}
var q3 = {
    qstion: "How do you write \"Hello World\" in an alert box?",
    answers: ["alert(\"Hello World\");", "alertBox(\"Hello World\");", "msgBox(\"Hello World\");", "msg(\"Hello World\");"]
}
var q4 = {
    qstion: "How do you create a function in JavaScript?",
    answers: ["function myFunction()", "function:myFunction()", "function = myFunction()"]
}
var q5 = {
    qstion: "How do you call a function named \"myFunction\"?",
    answers: ["myFunction()", "call myFunciton()", "call function myFunciton"]
}

//Questions stored as an array of objects
var questionsArray = [q1, q2, q3, q4, q5];


//Setting timer for Quiz
function quizTimerCountDown() {
    //reset timer for quiz
    time = 3;
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
}
// quizTimerCountDown();

//create the final form after quiz is concluded
function formCreator() {
    questions.textContent = "All Done!";

    //checking for nodes
    // console.log(highScore.childElementCount)

    //changing innerHTML for Content
    highScore.innerHTML = "<h3> Your final score is: " + userScore + "!</h3>";

    //create all childs for Highscore form
    var form = document.createElement("form");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div11 = document.createElement("div");
    var div12 = document.createElement("div");
    var input1 = document.createElement("input");
    var submitButton = document.createElement("button");
    var returnButton = document.createElement("button");
    var clearButton = document.createElement("button");

    //create attributes for div elements
    div1.setAttribute("class", "form-row");
    div2.setAttribute("class", "form-row");
    div11.setAttribute("class", "col-9");
    div12.setAttribute("class", "col-3");

    //create attributes for input elements
    input1.setAttribute("type", "text");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("placeholder", "Welcome to the Leaderboards");

    //setting attributes to submit button
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("class", "btn btn-primary")
    submitButton.textContent = "Submit";

    //setting attribute to button that returns to beginning of quiz
    returnButton.setAttribute("type", "button");
    returnButton.setAttribute("class", "btn btn-primary col-3")
    returnButton.textContent = "Restart";

    //setting attributes to button that clears the logs
    clearButton.setAttribute("type", "button");
    clearButton.setAttribute("class", "btn btn-primary col-5")
    clearButton.textContent = "Clear Leaderboard";

    //child appending to create form
    div11.appendChild(input1);
    div12.appendChild(submitButton);
    div1.appendChild(div11);
    div1.appendChild(div12);
    form.appendChild(div1);
    highScore.appendChild(form);

    //child appending to create button row
    var div22 = document.createElement("div");
    var div21 = document.createElement("div");
    div21.setAttribute("class", "col-2");
    div22.setAttribute("class", "col-2");
    div2.appendChild(div22);
    div2.appendChild(returnButton);
    div2.appendChild(div21);
    div2.appendChild(clearButton);
    form.appendChild(document.createElement("br"));
    form.appendChild(div2);

    //recheck for nodes
    // console.log(highScore.childElementCount);

    //adding event listeners to restart button to restart quiz
    returnButton.addEventListener("click", restartQuiz);
}

//click event handler taking user back to quiz
function restartQuiz() {
    var randomQuestion = questionsArray[Math.floor(Math.random() * questionsArray.length)];
    questions.textContent = randomQuestion.qstion;
    highScore.innerHTML = "";
    for (var i = 0; i < randomQuestion.answers.length; i++) {
        var choices = document.createElement("p");
        var choiceDescription = document.createElement("button");
        choiceDescription.setAttribute("type", "button");
        choiceDescription.setAttribute("class", "btn btn-primary");
        choiceDescription.setAttribute("id", i);
        choiceDescription.textContent = (i + 1) + ". " + randomQuestion.answers[i];
        choices.appendChild(choiceDescription);
        highScore.appendChild(choices);
    }
    // quizTimerCountDown();
    randomizeSelection(randomQuestion);

}

document.getElementById("Quiz").addEventListener("click", restartQuiz);

function randomizeSelection(randomQuestion) {
    var choices = [];
    for (var i = 0; i < randomQuestion.answers.length; i++) {
        choices.push(document.getElementById(i));
    }
    // for (var i = 0; i < randomQuestion.answers.length; i++) {
    //     console.log(choices[i]);
    // }
    for (var i = choices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    // for (var i = 0; i < randomQuestion.answers.length; i++) {
    //     console.log(choices[i]);
    // }

}
//object
//question
//array 