// Array of objects, each question is an object with keys question,answer{a,b,c,d}, correct, ansText. values unique to each question
const triviaQuestion = [
    {
        question: "How many bones does a cat have?",
        answer:{
            a: 120, 
            b: 192, 
            c: 230, 
            d: 186
        },
        correct: "c",
        ansText: 230

    },

    {
        question: "What breed of cat is shown in the Disney Movie 'Lady and the Tramp'?",
        answer:{
            a: "American Short Hair", 
            b: "Tabby", 
            c: "Siamese", 
            d: "Persian"
        },
        correct: "c",
        ansText: "Siamese"
    },


    {
        question:"How many rows of whiskers does a cat have?",
        answer:{
            a: 4,
            b: 7,
            c: 2,
            d: 6},
        correct: "a",
        ansText: 4
    },

    {
        question: "How many teeth does an adult cat have?",
        answer:{
            a: 42,
            b: 30,
            c: 36,
            d: 22},
        correct: "b",
        ansText: 30
    },

    {
        question: "The cat breed 'Spotted Mist' is now known as what?",
        answer:{
            a: "Canadian Mist",
            b: "Belgian Mist",
            c: "Australian Mist",
            d: "American Mist"},
        correct: "c",
        ansText: "Australian Mist"
    },

    {
        question: "Which of these cat breeds has long hair?",
        answer:{
            a: "Ocicat",
            b: "Havana Brown",
            c: "Russian blue",
            d: "Himalayan"},
        correct: "d",
        ansText: "Himalayan"
    },
    
    {
        question: "Which of these breeds is caused by a genetic mutation?",
        answer: {
            a: "Siberian",
            b: "Manx",
            c: "Munchkin",
            d: "Napoleon"},
        correct: "c",
        ansText: "Munchkin"
    },

    {
        question: "Which of these breeds is native to Kenya?",
        answer: {
            a: "Sokoke",
            b: "Nebelung",
            c: "Tiffany",
            d: "Snowshoe"},
        correct: "a",
        ansText: "Sokoke"
    },

    {
        question: "Which of these cats has a 'ticked coat'?",
        answer: {
            a: "Manx",
            b: "La Perm",
            c: "Persian",
            d: "Abyssinian"},
        correct: "d",
        ansText: "Abyssinian"
    },

    {
        question: "Which breed of cat is the largest?",
        answer: {
            a: "Savannah",
            b: "Maine Coon",
            c: "Ragdoll",
            d: "Siberian"},
        correct: "b",
        ansText: "Maine Coon"
    },
    
    {
        question: "When does a kitten open its eyes?",
        answer: {
            a: "5 weeks",
            b: "Two months",
            c: "1-3 weeks",
            d: "At birth"},
        correct: "c",
        ansText: "1-3 weeks"
    },
    
    {
        question: "When does a kitten show interest in solid food?",
        answer: {
            a: "Two months",
            b: "At birth",
            c: "2 weeks",
            d: "6 weeks"},
        correct: "d",
        ansText: "6 weeks"
    },

    {
        question: "What best describes a feral cat?",
        answer:{
            a: "A domesticated cat that has returned to the wild",
            b: "A barn cat",
            c: "Cats that roam only at night",
            d: "Cats that roam freely"},
        correct: "a",
        ansText: "A domesticated cat that has returned to the wild"
    },

    {
        question: "What is the name of the cat that was left £9m by his reclusive British owner in 1988?",
        answer: {
            a: "Blackie",
            b: "Paws",
            c: "Tubbs",
            d: "Marmalade"},
        correct: "a",
        ansText: "Blackie"
    },

    {
        question: "On average, cats spend how much time every day sleeping?",
        answer: {
            a: "8 Hours",
            b: "12 Hours",
            c: "4 Hours",
            d: "16 Hours"},
        correct: "d",
        ansText: "16 Hours"
    }
];

//Used in displayQ. Will change the HTML to show text
let questionContainer;
let question;
let answerA;
let answerB;
let answerC;
let answerD;
let correctQAns;
let correctQAnsText;
let noAnswer = true;

//Keep track of scores
let correct = 0;
let incorrect =0;
let unanswered = 5;

//Used to check the current question data
let randArr = [ ];
let randArrIndex = 0;

//Used for the timer
let timerRunning = false;
let time;
let intervalId;

/* 
ID in HTML
start -> start button
timer -> container for timer, just incase it ever is needed..
    sec -> where seconds will be shown
howto -> how to play
trivia -> where the question and answers will be displayed
correctAns -> will show #correct
incorrectAns -> will show # incorrect
unanswered -> will show # unanswered
reset -> reset button
*/

// document load only show instructions and start button hide all other ids
$("document").ready(function(){
    $("#start").click(start);
    $("reset").click(reset);

    $("#start").show();
    $("#timer").hide();
    $("#howto").show();
    $("#trivia").hide();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#reset").hide();
});

//game starts when the start button is clicked

function start(){
    randQ();

    $("#start").hide();
    $("#timer").show();
    $("#howto").hide();
    $("#trivia").show();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#reset").hide();
}

//runs once after starting the game, will pick 5 random questions from the triviaQuestion array and put them into randArr 
function randQ(){
    for (let i = triviaQuestion.length -1; i > 0; i--){
        const j = Math.floor(Math.random()*i);
        const temp = triviaQuestion[i];
        triviaQuestion[i] = triviaQuestion[j];
        triviaQuestion[j] = temp;
    }
    for (let i=0; i < 5; i++){
        randArr.push(triviaQuestion[i]);
    }
    displayQ();
}

//will start the timer. Before called need to set the time, timerRunning to false and clear the intervalId
function startTimer(){
    if (!timerRunning) {
        $("#timer").show();
        intervalId = setInterval(decrement, 1000);
        timerRunning = true;
    }
}

//called when the timer starts, will reduce time by one until time is 0 and then it will run the outOfTime function

function decrement(){
    time--;
    $("#sec").text(time);
    if (time === 0) {
        outOfTime();
    }
}

function outOfTime(){
    clearInterval(intervalId);
    timerRunning = false;

    if (randArrIndex === 5){

        $(".questionContainer").remove();

        $("#start").hide();
        $("#timer").hide();
        $("#howto").hide();
        $("#trivia").hide();
        $("#correctAns").show().text("Correct: " + correct);
        $("#incorrectAns").show().text("Incorrect: " + incorrect);
        $("#unanswered").show().text("Unanswered: " + unanswered);
        $("#reset").show();
    }
    else if (noAnswer === true){

        $("#start").hide();
        $("#timer").show();
        $("#howto").hide();
        $("#trivia").hide();
        $("#correctAns").hide();
        $("#incorrectAns").hide();
        $("#unanswered").show().text("Whoops you ran out of time! The answer to that question is " + correctQAnsText);
        $("#reset").hide();

        time = 5;
        startTimer();
        randArrIndex++;
    }
    else {
        displayQ();
    }
}

function clicked(value){
    randArrIndex++;
    clearInterval(intervalId);
    timerRunning = false;
    time = 5;
    startTimer();
    noAnswer = false;
    
    if (correctQAns === value){
        $("#start").hide();
        $("#timer").show();
        $("#howto").hide();
        $("#trivia").hide();
        $("#correctAns").show().text("You got it right!!");
        $("#incorrectAns").hide();
        $("#unanswered").hide();
        $("#reset").hide();
        correct++;
        unanswered--;
    }
    else {
        $("#start").hide();
        $("#timer").show();
        $("#howto").hide();
        $("#trivia").hide();
        $("#correctAns").hide();
        $("#incorrectAns").show().text("Eep that's wrong! The correct answer is " + correctQAns);
        $("#unanswered").hide();
        $("#reset").hide();
        incorrect++;
        unanswered--;
    }
    displayQ();
}

function displayQ(){
    if (randArrIndex === 5){
        outOfTime();
    }

    $(".questionContainer").remove();
    clearInterval(intervalId);
    time = 10;
    startTimer();

    $("#start").hide();
    $("#timer").show();
    $("#howto").hide();
    $("#trivia").show();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#reset").hide();

    questionContainer = undefined;
    question = undefined;
    answerA = undefined;
    answerB = undefined;
    answerC = undefined;
    answerD = undefined;
    correctQAns = undefined;
    correctQAnsText = undefined;
    noAnswer = true;

    questionContainer = $('<div class="questionContainer flex">');

    question = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-full" id="question"> <span class="ml-2 px-4 py-2 text-purple-800">' + randArr[randArrIndex].question + '</span> </label>';

    answerA = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerA"> <input type="radio" name="answer" value="a" onClick="clicked(this.value)"> </input> <span class="ml-2 px-4 py-2 text-purple-800">' + randArr[randArrIndex].answer.a + '</span> </label>';

    answerB = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerB"> <input type="radio" name="answer" value="b" onClick="clicked(this.value)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.b + '</span> </label>';

    answerC = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerC"> <input type="radio" name="answer" value="c" onClick="clicked(this.value)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.c + '</span> </label>';

    answerD = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerD"> <input type="radio" name="answer" value="d" onClick="clicked(this.value)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.d + '</span> </label>';

    questionContainer.append(question, answerA, answerB, answerC, answerD);
    $("#trivia").append(questionContainer);

    correctQAns = randArr[randArrIndex].correct;
    correctQAnsText = randArr[randArrIndex].ansText;
}

function reset(){
//Keep track of scores
correct = 0;
incorrect =0;
unanswered = 5;

//Used to check the current question data
randArr = [ ];
randArrIndex = 0;

//Used for the timer
timerRunning = false;
time;
clearInterval(intervalId);

    $("#start").hide();
    $("#timer").show();
    $("#howto").hide();
    $("#trivia").show();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#reset").hide();

    start();
}
