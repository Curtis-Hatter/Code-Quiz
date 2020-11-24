var timer = document.querySelector("#Timer");
var time = 60;

//Setting timer for Quiz
function startTimer() {
    setInterval(function () {
        timer.textContent = "Timer: " + time + " seconds";
        time--;
        if (time <= 0) {
            time = 0;
            timer.textContent = "Timer: " + time + " seconds";
        }
    }, 1000)
}

startTimer();