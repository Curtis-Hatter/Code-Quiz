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
//  -USER CAN INPUT TEXT FOR HIGHSCORE BY SUBMITTING (Click submit button)
//      -STORES USER DATA AND SCORE TOGETHER IN LOCAL STORAGE
//      -POPULATE LEADERBOARD WITH ARRAY FROM LOCAL STORAGE
//  -RESTART QUIZ
//      -(GO BACK TO "USER BEGINS QUIZ")
//  -CLEAR LEADERBOARDS
//      -CLICK BUTTON TO CLEAR STORED DATA
//      -ALSO CLEAR LEADERBOARD (FORM)

//selections of MAJOR tags to reference
var timer = document.querySelector("#Timer");
var questions = document.querySelector("#Questions");
var highScore = document.querySelector("#highScore");
var viewHighscores = document.querySelector(".navbar-brand");

//global variables manipulated over the course of the quiz
var userScore = 0;
var time = 0;
//Need countdown for ClearInterval() if user wants to see Highscores while in quiz
var countDown;
//Decalare a boolean to handle the SetInterval INFINITE Loop D:
var isCountDown = false;

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

//ask about CLEAR INTERVAL SINCE (IF USER CLICKS TOO FAST: COUNTDOWN TIME ITERATES WHAT SEEMS LIKE FOREVER)
//Setting timer for Quiz
function quizTimerCountDown() {
    //reset time for quiz
    time = 50;
    //allow countDown to be the seconds adjusted
    //Rebecca Recommendation: Use an if statement and boolean to handle recursive issue

    countDown = setInterval(function () {
        time--;
        timer.textContent = "Timer: " + time + " seconds";
        if (time <= 0) {
            time = 0;
            timer.textContent = "Timer: " + time + " seconds";
            //stop counter as well as countDown
            //Rebecca Recommendation: Create a Function to apply clearInterval(countdown);
            //  - also assign false to boolean
            clearInterval(countDown);
            //!!!!!USING REBECCA'S RECOMMENDATION OF HAVING AN IF STATEMENT!!!! 
            //IT WAS JUST IN THE WRONG PLACE
            //but now it works... I think...
            if (isCountDown) {
                formCreator();
            }
            return;
        }
        return;
    }, 1000)

}

//click event handler taking user back to quiz or starting quiz
function restartQuiz() {
    questionsArray = [q1, q2, q3, q4, q5];
    userScore = 0;
    randomizeQuestions();
    //Rebecca Recommendation: assign true for countdown so that we can start the formcreatore()
    isCountDown = true;
    quizTimerCountDown();
    var nextQuestion = questionsArray.pop();
    // console.log(questionsArray);
    questions.textContent = nextQuestion.qstion;
    // create unique id's to later find correct answer to question
    for (var i = 0; i < nextQuestion.answers.length; i++) {
        var choiceDescription = document.createElement("button");
        choiceDescription.setAttribute("type", "button");
        choiceDescription.setAttribute("class", "btn btn-primary answer");
        //DISABLE THAT GNARLY DOUBLE CLICK
        choiceDescription.setAttribute("onclick", "this.disabled=true");
        choiceDescription.setAttribute("id", i);
        choiceDescription.textContent = nextQuestion.answers[i];
        highScore.appendChild(choiceDescription);
    }
    randomizeSelection(nextQuestion);
}

//Sets up page with a question and answers
function nextQuestion() {
    if (questionsArray.length === 0) {
        formCreator()
        return;
    }
    var nextQuestion = questionsArray.pop();
    // console.log(nextQuestion);
    questions.textContent = nextQuestion.qstion;
    // create unique id's to later find correct answer to question
    highScore.innerHTML = "";
    for (var i = 0; i < nextQuestion.answers.length; i++) {
        var choiceDescription = document.createElement("button");
        choiceDescription.setAttribute("type", "button");
        choiceDescription.setAttribute("class", "btn btn-primary answer");
        //DISABLE THAT GNARLY DOUBLE CLICK
        choiceDescription.setAttribute("onclick", "this.disabled=true");
        choiceDescription.setAttribute("id", i);
        choiceDescription.textContent = nextQuestion.answers[i];
        // console.log(nextQuestion.answers[i]);
        highScore.appendChild(choiceDescription);
    }
    randomizeSelection(nextQuestion);
    // console.log(highScore.childElementCount);
    // return;
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
highScore.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.matches(".answer")) {
        var userAnswer = event.target.id;
        var feedBack = document.createElement("h5")

        if (userAnswer === "0") {
            userScore = userScore + 10;
            feedBack.textContent = "Correct!";
            highScore.appendChild(document.createElement("hr"));
            highScore.appendChild(feedBack);
        }
        else {
            time = time - 10;
            feedBack.textContent = "Wrong!";
            highScore.appendChild(document.createElement("hr"));
            highScore.appendChild(feedBack);
        }
        setTimeout(function () {
            nextQuestion();
        }, 500);
    }
})

// Event listener for starting quiz asigned to Begin Button
document.getElementById("Quiz").addEventListener("click", restartQuiz); //THIS IS WHERE RESTARTQUIZ IS CALLED FOR THE BEGIN BUTTON AT THE START OF THE QUIZ

/* NEED TO BREAK HERE FOR SANITY */

//creating array for local storage to be presented
var theLeaderboardUsers = [];
var theLeaderboardScores = [];
if ((localStorage.getItem("User")) || (localStorage.getItem("Scores"))) {
    theLeaderboardUsers = JSON.parse(localStorage.getItem("Users"));
    theLeaderboardScores = JSON.parse(localStorage.getItem("Scores"));
}

//create the final form after quiz is concluded
function formCreator() {
    //assing isCountDown to stop the infinite loop of the formCreator()
    isCountDown = false;
    time = 0;
    questions.textContent = "All Done!";

    //changing innerHTML for Content
    highScore.innerHTML = "<h3 id=\"score\" > Your final score is: " + userScore + "!</h3>";

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
    form.setAttribute("id", "form");
    div1.setAttribute("class", "form-row");
    div2.setAttribute("class", "form-row");
    div11.setAttribute("class", "col-9");
    div12.setAttribute("class", "col-3");

    //create attributes for input elements
    input1.setAttribute("type", "text");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("value", "");
    input1.setAttribute("placeholder", "Welcome to the Leaderboards");

    //setting attributes to submit button
    submitButton.setAttribute("type", "button");
    submitButton.setAttribute("class", "btn btn-primary")
    submitButton.textContent = "Submit";

    //setting attribute to button that returns to beginning of quiz
    returnButton.setAttribute("type", "button");
    returnButton.setAttribute("class", "btn btn-primary col-5")
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
    // var div22 = document.createElement("div");
    var div21 = document.createElement("div");
    div21.setAttribute("class", "col-2");
    // div22.setAttribute("class", "col-2");
    // div2.appendChild(div22);
    div2.appendChild(returnButton);
    div2.appendChild(div21);
    div2.appendChild(clearButton);
    form.appendChild(document.createElement("br"));
    form.appendChild(div2);

    //adding event listeners to restart button to restart quiz
    returnButton.addEventListener("click", restartQuiz); //THIS IS WHERE RESTARTQUIZ IS CALLED ALSO CALLED ASIGN TO THE RESTART BUTTON WITHIN THE LEADERBOARDS

    //adding event listeners to submit button for score recording
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        var userInitials = input1.value.trim();
        if (userInitials !== "") {
            //deleting submit button and input form
            var formParent = document.getElementById("form");
            formParent.removeChild(formParent.childNodes[0]);
            // and break line for cleaner look
            formParent.removeChild(formParent.childNodes[0]);
            //apply hr for cleaner look
            highScore.insertBefore(document.createElement("hr"), highScore.childNodes[1]);

            //storing user information
            localStorage.setItem("User", userInitials);
            localStorage.setItem("Score", userScore);

            //leaderboardSubmission function here
            leaderBoardStorage();
            leaderBoardSubmission();

            //apply hr for cleaner look
            highScore.appendChild(document.createElement("hr"));
        }
    })
    //Prevent User from Pressing Enter and Forcing User to click submit
    form.addEventListener("submit", function (enter) {
        enter.preventDefault();
    }, false)
    //add event listener to clear button to clear leaderboards
    clearButton.addEventListener("click", function (enter) {
        enter.preventDefault();
        localStorage.clear();
        while (document.querySelector(".beefyFont")) {
            document.querySelector(".beefyFont").remove();
        }
        theLeaderboardUsers = [];
    })
}

//local storage function
function leaderBoardStorage() {
    theLeaderboardScores.push(localStorage.getItem("Score"));
    theLeaderboardUsers.push(localStorage.getItem("User"));
    localStorage.setItem("Users", JSON.stringify(theLeaderboardUsers));
    localStorage.setItem("Scores", JSON.stringify(theLeaderboardScores));
}

//setting up the leader board forms
function leaderBoardSubmission() {
    theleaderBoardUsers = JSON.parse(localStorage.getItem("Users"));
    theleaderBoardScores = JSON.parse(localStorage.getItem("Scores"));
    for (var i = 0; i < theLeaderboardUsers.length; i++) {
        var form = document.getElementById("form");
        var leaderBoardForm = document.createElement("div");
        var theLeaderboardUser = document.createElement("div");
        var theLeaderboardScore = document.createElement("div");
        leaderBoardForm.setAttribute("class", "form-row beefyFont");
        theLeaderboardUser.setAttribute("class", "col-8");
        theLeaderboardScore.setAttribute("class", "col-4");

        theLeaderboardScore.textContent = theleaderBoardScores[i];
        theLeaderboardUser.textContent = theleaderBoardUsers[i];

        leaderBoardForm.appendChild(theLeaderboardUser);
        leaderBoardForm.appendChild(theLeaderboardScore);
        form.appendChild(leaderBoardForm);
    }
}

viewHighscores.addEventListener("click", function (event) {
    event.preventDefault();
    time = 0;
    clearInterval(countDown)
    timer.textContent = "Timer: " + time + " seconds";
    formCreator();
    //deleting submit button and input form
    var formParent = document.getElementById("form");
    formParent.removeChild(formParent.childNodes[0]);
    // and break line for cleaner look
    formParent.removeChild(formParent.childNodes[0]);
    //apply hr for cleaner look
    highScore.insertBefore(document.createElement("hr"), highScore.childNodes[1]);

    //leaderboardSubmission function here
    if (theLeaderboardUsers !== []) {
        leaderBoardSubmission();
    }
    //apply hr for cleaner look
    highScore.appendChild(document.createElement("hr"));
})