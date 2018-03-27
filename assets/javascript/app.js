//single source of truth
var triviaQuizs;
var triviaTotalQuizs = 3;

var correctNumber;
var incorrectNumber;
var unsnswered;
var quizNumber;

var timer = 10;
var displayTimer;

var firstTimeStart = true;
var TriviaRequestReturned = false;



$(document).ready(function () {

    triviaAPI();

    $(document).on("click", "#start", function () {
        if (TriviaRequestReturned) {
            start();
            QuizAndTimerDisplay();
        } else {
            $("#start").html("Please click me again!");
        }

    }).on("click", ".correctAnswer", function () {

        correctAnswerDisplay(quizNumber);
        correctNumber++;
        quizNumber++;
        setTimeout(QuizAndTimerDisplay, 2000);
        cancelTimer();

    }).on("click", ".incorrectAnswer", function () {

        incorrectAnswerDisplay(quizNumber);
        incorrectNumber++;
        quizNumber++;
        setTimeout(QuizAndTimerDisplay, 2000);
        cancelTimer();

    }).on("click", "#restart", function () {
        firstTimeStart = false;
        start();
        QuizAndTimerDisplay();

    });




    //============================================================All functions definition below==========================================================//

    function start() {
        correctNumber = 0;
        incorrectNumber = 0;
        unsnswered = 0;
        quizNumber = 0;
    }

    function QuizAndTimerDisplay() {

        if (quizNumber < triviaTotalQuizs) {

            displayTimer = setInterval(timerDisplay, 1000);
            quizDisplay(quizNumber);

        } else {

            finalResultDisplay();

        }
    }


    function triviaAPI() {
        $.ajax({
            url: "https://opentdb.com/api.php?type=multiple&amount=3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            triviaQuizs = response.results;
            TriviaRequestReturned = true;
        });
    }

    function timerDisplay() {

        console.log(displayTimer, timer);

        if (timer > 0) {
            $("#timer").show();
            $("#timer").html("<p>Time Remaining: " + timer + " s </p>");
            timer--;
        } else {
            timeoutDiplay(quizNumber);
            unsnswered++;
            quizNumber++;
            setTimeout(QuizAndTimerDisplay, 2000);
            cancelTimer();
        }

    }

    function cancelTimer() {

        $("#timer").hide();
        clearInterval(displayTimer);
        timer = 10;

    }

    function quizDisplay(n) {
        $("#mainContainer").empty();
        $("#mainContainer").html("<h3>" + triviaQuizs[n].question + "</h3>");
        $("h3").append($("<ul></ul>"));

        if (firstTimeStart) {
            triviaQuizs[n].incorrect_answers.splice(Math.floor(Math.random() * (triviaQuizs[n].incorrect_answers.length + 1)), 0, triviaQuizs[n].correct_answer);
        }

        for (let i = 0; i < triviaQuizs[n].incorrect_answers.length; i++) {
            if (triviaQuizs[n].incorrect_answers[i] === triviaQuizs[n].correct_answer) {
                let answerList = $("<li>");
                answerList.text(triviaQuizs[n].incorrect_answers[i]);
                answerList.attr("class", "correctAnswer");
                $("ul").append(answerList);

            } else {
                let answerList = $("<li>");
                answerList.text(triviaQuizs[n].incorrect_answers[i]);
                answerList.attr("class", "incorrectAnswer");
                $("ul").append(answerList);
            }
        }

    }



    function timeoutDiplay(n) {
        $("#mainContainer").empty();
        $("#mainContainer").html("<h3>Out of Time!</h3>")
        $("h3").append("<p>The Correct answer is: " + triviaQuizs[n].correct_answer + "</p>");
    }

    function correctAnswerDisplay() {
        $("#mainContainer").empty();
        $("#mainContainer").html("<h3>Corret!</h3>")

    }

    function incorrectAnswerDisplay(n) {
        $("#mainContainer").empty();
        $("#mainContainer").html("<h3>Nope!</h3>")
        $("h3").append("<p>The Correct answer is: " + triviaQuizs[n].correct_answer + "</p>");

    }

    function finalResultDisplay() {
        $("#mainContainer").empty();
        $("#mainContainer").html("<h3>All done, here's how you did!</h3>");
        $("h3").append("<p>Correct Answers: " + correctNumber + "</p>");
        $("h3").append("<p>Inorrect Answers: " + incorrectNumber + "</p>");
        $("h3").append("<p>Unsnswered: " + unsnswered + "</p>");

        let restart = $("<button>");
        restart.text("Start Over?");
        restart.attr("id", "restart");
        $("h3").append(restart);

    }

});




