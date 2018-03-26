
var triviaQuiz;
var triviaQuizNumber = 3;

var correctNumber;
var incorrectNumber;
var unsnswered;
var questionNumber;

var questionTimer = 15;
var displayQuestionTimer;
var timeOut = false;
var Display;


$(document).ready(function () {

    triviaAPI();

    Display = {
        t: triviaQuiz[questionNumber],

        question: function () {
            $("#mainContainer").html("<h3>" + this.t.question + "</h3>");
            $("h3").append($("<ul></ul>"));

            this.t.incorrect_answers.splice(Math.floor(Math.random() * (this.t.incorrect_answers.length + 1)), 0, this.t.correct_answer);

            for (let i = 0; i < this.t.incorrect_answers.length; i++) {
                if (this.t.incorrect_answers[i] === this.t.correct_answer) {
                    let answerList = $("<li>");
                    answerList.text(this.t.incorrect_answers[i]);
                    answerList.attr("class", "correctAnswer");
                    $("ul").append(answerList);

                } else {
                    let answerList = $("<li>");
                    answerList.text(this.t.incorrect_answers[i]);
                    answerList.attr("class", "incorrectAnswer");
                    $("ul").append(answerList);
                }
            }
        
        },
        questionTimer: function () {
            if (questionTimer > 0) {
                $("#timer").html("<p>Time Remaining: " + questionTimer + " s </p>");
                questionTimer--;
            } else {
                $("#timer").hide();
                clearInterval(displayQuestionTimer);
                timeOut = true;
            }
        
        },
        timeout: function () {
            $("#mainContainer").html("<h3>Out of Time!</h3>")
            $("h3").append("<p>The Correct answer is: " + this.t.correct_answer + "</p>");
        

        },
        correctAnswer: function () {
            $("#mainContainer").html("<h3>Corret!</h3>")

        },
        incorrectAnswer: function () {
            $("#mainContainer").html("<h3>Nope!</h3>")
            $("h3").append("<p>The Correct answer is: " + this.t.correct_answer + "</p>");

        },
        finalResult: function(){
            $("#mainContainer").html("<h3>All done, here's how you did!</h3>");
            $("h3").append("<p>Correct Answers: " + correctNumber + "</p>");
            $("h3").append("<p>Inorrect Answers: " + incorrectNumber + "</p>");
            $("h3").append("<p>Unsnswered: " + unsnswered + "</p>");
            $("h3").append("<button>Start Over? </button>" );

        }

    }

    $(document).on("click", "button", function () {

        start();
        questionAndTimerDisplay();

    });

    if (questionNumber <= triviaQuizNumber) {


        if (timeout) {
            Display.timeout();
            unsnswered++;
            timeout = false;

        } else {

            $(document).on("click", ".correctAnswer", function () {

                Display.correctAnswer();
                correctNumber++;

            }).on("click", ".incorrectAnswer", function () {

                Display.incorrectAnswer();
                incorrectNumber++;

            });
        }

        setTimeout(questionAndTimerDisplay, 5000);
        questionNumber++;

    } else {
       debugger;
        Display.finalResult();

    }

//////////////////////////////////////////////////////////////////////

    function start() {
        correctNumber = 0;
        incorrectNumber = 0;
        unsnswered = 0;
        questionNumber = 0;
       
    }

    function questionAndTimerDisplay() {
        displayQuestionTimer = setInterval(Display.questionTimer, 1000);
        Display.question();

    }

    function triviaAPI() {
        $.ajax({
            url: "https://opentdb.com/api.php?type=multiple&amount=3",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            triviaQuiz = response.results;

        });
    }


     

});


