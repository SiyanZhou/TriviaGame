//single source of truth
var t;
var triviaQuizNumber = 3;

var correctNumber;
var incorrectNumber;
var unsnswered;
var questionNumber;

var questionTimer = 10;
var displayQuestionTimer;



$(document).ready(function () {

    triviaAPI();
    
    $(document).on("click", "button", function () {
        start();
        questionAndTimerDisplay();

    }).on("click", ".correctAnswer", function () {

        correctAnswerDisplay(questionNumber);
        correctNumber++;
        questionNumber++;
        setTimeout(questionAndTimerDisplay, 3000);
        cancelQuestionTimer();

    }).on("click", ".incorrectAnswer", function () {

        incorrectAnswerDisplay(questionNumber);
        incorrectNumber++;
        questionNumber++;
        setTimeout(questionAndTimerDisplay, 3000);
        cancelQuestionTimer();

    });

  

//================================================================================================================================

    function start() {
        correctNumber = 0;
        incorrectNumber = 0;
        unsnswered = 0;
        questionNumber = 0;
    }

    function questionAndTimerDisplay() {

        if (questionNumber < triviaQuizNumber) {
            
            displayQuestionTimer = setInterval(questionTimerDisplay, 1000);
            questionDisplay(questionNumber);

        } else {

            finalResultDisplay();

        }
    }


    /////
    

        function triviaAPI() {
            $.ajax({
                url: "https://opentdb.com/api.php?type=multiple&amount=3",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                t = response.results;
            });
        }

        function questionTimerDisplay() {
            console.log(displayQuestionTimer, questionTimer);
            
            if (questionTimer > 0) {
                $("#timer").show();
                $("#timer").html("<p>Time Remaining: " + questionTimer + " s </p>");
                questionTimer--;
            } else {
                timeoutDiplay(questionNumber);
                unsnswered++;
                questionNumber++;
                setTimeout(questionAndTimerDisplay, 3000);
                cancelQuestionTimer();
            }

        }

        function cancelQuestionTimer() {

            $("#timer").hide();
            clearInterval(displayQuestionTimer);
            timeOut = true;
            questionTimer = 10;

        }

        function questionDisplay(n) {
            $("#mainContainer").html("<h3>" + t[n].question + "</h3>");
            $("h3").append($("<ul></ul>"));

            t[n].incorrect_answers.splice(Math.floor(Math.random() * (t[n].incorrect_answers.length + 1)), 0, t[n].correct_answer);

            for (let i = 0; i < t[n].incorrect_answers.length; i++) {
                if (t[n].incorrect_answers[i] === t[n].correct_answer) {
                    let answerList = $("<li>");
                    answerList.text(t[n].incorrect_answers[i]);
                    answerList.attr("class", "correctAnswer");
                    $("ul").append(answerList);

                } else {
                    let answerList = $("<li>");
                    answerList.text(t[n].incorrect_answers[i]);
                    answerList.attr("class", "incorrectAnswer");
                    $("ul").append(answerList);
                }
            }

        }



        function timeoutDiplay(n) {
            $("#mainContainer").html("<h3>Out of Time!</h3>")
            $("h3").append("<p>The Correct answer is: " + t[n].correct_answer + "</p>");
        }

        function correctAnswerDisplay() {
            $("#mainContainer").html("<h3>Corret!</h3>")

        }

        function incorrectAnswerDisplay(n) {
            $("#mainContainer").html("<h3>Nope!</h3>")
            $("h3").append("<p>The Correct answer is: " + t[n].correct_answer + "</p>");

        }

        function finalResultDisplay() {
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




