// HOW QUIZ FUNCTIONS (DESIRED FUNCTION AT LEAST)
// QUESTIONS/ANSWERS STORED AS OBJECTS
// OBJECTS THEN STORED AS AN ARRAY TO REFERENCE RANDOMLY
// USER BEGINS QUIZ
//  -QUESTION IS OUTPUT AS TEXT
//  -ANSWERS OUTPUT RANDOMLY AS BUTTONS
//  -BUTTON PRESSED: TWO OUTCOMES
//  -CORRECT?: OUTPUT CORRECT THEN UPDATE SCORE
//  -WRONG?: OUTPUT WRONG THEN UPDATE TIMER
//  -ONCE TIME HAS RUN OUT OR ALL QUESTIONS ANSWERED
// OUTPUT LEADERBOARD (FORM)
//  -USER CAN INPUT TEXT FOR HIGHSCORE BY SUBMITTING
//      -STORES USER DATA AND SCORE TOGETHER IN LOCAL STORAGE
//  -RESTART QUIZ
//      -(GO BACK TO "USER BEGINS QUIZ")
//  -CLEAR LEADERBOARDS
//      -CLICK BUTTON TO CLEAR STORED DATA

//selections of MAJOR tags to reference
var timer = document.querySelector("#Timer");
var questions = document.querySelector("#Questions");
var highScore = document.querySelector("#highScore");

//global variables manipulated over the course of the quiz
var userScore = 0;
var time = 30;

// Questions asked stored as objects
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
    answers: ["myFunction()", "call myFunction()", "call function myFunction"]
}

//Questions stored as an array of objects
var questionsArray = [q1, q2, q3, q4, q5];
//Then randomize everytime so that user can't cheat
function randomizeQuestions() {
    for (var i = questionsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
    }
}
//Pops the last element of the Questions array so that the question used isn't accessible
//during the rest of the quiz
function usedQuestion() {
    questionsArray.pop();
}

//Setting timer for Quiz
function quizTimerCountDown() {
    //reset timer for quiz
    time = 30;
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

//click event handler taking user back to quiz or starting quiz
function restartQuiz() {
    questionsArray = [q1, q2, q3, q4, q5];
    randomizeQuestions();
    // quizTimerCountDown();
    nextQuestion();
}

//Sets up page with a question and answers
function nextQuestion() {
    if (questionsArray === []) {
        formCreator()
        return;
    }
    var nextQuestion = questionsArray[questionsArray.length - 1];
    usedQuestion();
    questions.textContent = nextQuestion.qstion;
    // create unique id's to later find correct answer to question
    for (var i = 0; i < nextQuestion.answers.length; i++) {
        var choiceDescription = document.createElement("button");
        choiceDescription.setAttribute("type", "button");
        choiceDescription.setAttribute("class", "btn btn-primary answer");
        choiceDescription.setAttribute("id", i);
        choiceDescription.textContent = nextQuestion.answers[i];
        highScore.appendChild(choiceDescription);
    }
    randomizeSelection(nextQuestion);
    userChoice();
    console.log(highScore.childElementCount);
}

// Randomize selection of answers so that User can't cheat
function randomizeSelection(nextQuestion) {
    var choices = [];
    for (var i = 0; i < nextQuestion.answers.length; i++) {
        choices.push(document.getElementById(i));
    }
    for (var i = choices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    highScore.innerHTML = "";
    for (var i = 0; i < nextQuestion.answers.length; i++) {
        var buttonBreak = document.createElement("p");
        var buttontext = choices[i].textContent;
        choices[i].textContent = (i + 1) + ". " + buttontext;
        buttonBreak.appendChild(choices[i]);
        highScore.appendChild(buttonBreak);
    }
}

// Listening to the user Choice and giving feedback on whether it is right or wrong
function userChoice() {
    highScore.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.matches(".answer")) {
            var userAnswer = event.target.id;
            var feedBack = document.createElement("h5")
            if (userAnswer === "0") {
                userScore = userScore + 10;
                feedBack.textContent = "Correct!";
                highScore.appendChild(document.createElement("hr"));
                highScore.appendChild(feedBack);
                // setTimeout(function () {
                //     nextQuestion();
                // }, 500);
                nextQuestion();
            }
            else {
                time = time - 10;
                feedBack.textContent = "Wrong!";
                highScore.appendChild(document.createElement("hr"));
                highScore.appendChild(feedBack);
                // setTimeout(function () {
                //     nextQuestion();
                // }, 500);
                nextQuestion();
            }
        }
    })
}

// Event listener for starting quiz asigned to Begin Button
document.getElementById("Quiz").addEventListener("click", restartQuiz);

/* NEED TO BREAK HERE FOR SANITY */

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