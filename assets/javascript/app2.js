//vars

const triviaQuestion = [
    {
        question: "How many bones does a cat have?",
        answer:{
            a: 120, 
            b: 192, 
            c: 230, 
            d: 186
        },
        correct: "c"
    },

    {
        question: "What breed of cat is shown in the Disney Movie 'Lady and the Tramp'?",
        answer:{
            a: "American Short Hair", 
            b: "Tabby", 
            c: "Siamese", 
            d: "Persian"
        },
        correct: "c"
    },


    {
        question:"How many rows of whiskers does a cat have?",
        answer:{
            a: 4,
            b: 7,
            c: 2,
            d: 6},
        correct: "a"
    },

    {
        question: "How many teeth does an adult cat have?",
        answer:{
            a: 42,
            b: 30,
            c: 36,
            d: 22},
        correct: "b"
    },

    {
        question: "The cat breed 'Spotted Mist' is now known as what?",
        answer:{
            a: "Canadian Mist",
            b: "Belgian Mist",
            c: "Australian Mist",
            d: "American Mist"},
        correct: "c"
    },

    {
        question: "Which of these cat breeds has long hair?",
        answer:{
            a: "Ocicat",
            b: "Havana Brown",
            c: "Russian blue",
            d: "Himalayan"},
        correct: "d"
    },
    
    {
        question: "Which of these breeds is caused by a genetic mutation?",
        answer: {
            a: "Siberian",
            b: "Manx",
            c: "Munchkin",
            d: "Napoleon"},
        correct: "c"
    },

    {
        question: "Which of these breeds is native to Kenya?",
        answer: {
            a: "Sokoke",
            b: "Nebelung",
            c: "Tiffany",
            d: "Snowshoe"},
        correct: "a"
    },

    {
        question: "Which of these cats has a 'ticked coat'?",
        answer: {
            a: "Manx",
            b: "La Perm",
            c: "Persian",
            d: "Abyssinian"},
        correct: "d"
    },

    {
        question: "Which breed of cat is the largest?",
        answer: {
            a: "Savannah",
            b: "Maine Coon",
            c: "Ragdoll",
            d: "Siberian"},
        correct: "b"
    },
    
    {
        question: "When does a kitten open its eyes?",
        answer: {
            a: "5 weeks",
            b: "Two months",
            c: "1-3 weeks",
            d: "At birth"},
        correct: "c"
    },
    
    {
        question: "When does a kitten show interest in solid food?",
        answer: {
            a: "Two months",
            b: "At birth",
            c: "2 weeks",
            d: "6 weeks"},
        correct: "d"
    },

    {
        question: "What best describes a feral cat?",
        answer:{
            a: "A domesticated cat that has returned to the wild",
            b: "A barn cat",
            c: "Cats that roam only at night",
            d: "Cats that roam freely"},
        correct: "a"
    },

    {
        question: "What is the name of the cat that was left £9m by his reclusive British owner in 1988?",
        answer: {
            a: "Blackie",
            b: "Paws",
            c: "Tubbs",
            d: "Marmalade"},
        correct: "a"
    },

    {
        question: "On average, cats spend how much time every day sleeping?",
        answer: {
            a: "8 Hours",
            b: "12 Hours",
            c: "4 Hours",
            d: "16 Hours"},
        correct: "d"
    }
];

let questionContainer;
let question;
let answerA;
let answerB;
let answerC;
let answerD;
let correctQAns;

let correct = 0;
let incorrect =0;
let unanswered = 0;
let answers = { };
let randArr = [ ];
let randArrIndex = 0;

let timerRunning = false;
let time;
let intervalId;

//document load
$('document').ready(function(){
    $("#start").click(start);
    $("#reset").click(reset);

    $("#timer").hide();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#results").hide();
    $("#reset").hide();
});

//functions


//start 
function start(){
    clearInterval(intervalId);
    time = 10;
    timerStart();
    randQ();
    
    $("#timer").show();
    $("#triviaAll").show();
    $("#start").hide();
    $("#howto").hide();
}

//Random Questions
function randQ(){
    for (let i = triviaQuestion.length -1; i > 0; i--){
        const j = Math.floor(Math.random()*i);
        const temp = triviaQuestion[i];
        triviaQuestion[i] = triviaQuestion[j];
        triviaQuestion[j] = temp;
    }
    for (let i=0; i < 5; i++){
        randArr.push(triviaQuestion[i]);
        unanswered++;

    }
    newQ();
    }

function newQ(){

    if (randArrIndex <= 5){
        time = 10;
        $(".questionContainer").remove();
        $("#correctAns").hide();
        $("#incorrectAns").hide();
        $("#unanswered").hide();
        $("#triviaAll").show();
        displayQ();
    }
    else {
        endTrivia();
    }
}

//Populates question and displays on page
function displayQ(){

    questionContainer = undefined;
    question = undefined;
    answerA = undefined;
    answerB = undefined;
    answerC = undefined;
    answerD = undefined;
    correctQAns = undefined;
    
    questionContainer = $('<div class="questionContainer flex">');

    question = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-full" id="question"> <span class="ml-2 px-4 py-2 text-purple-800">' + randArr[randArrIndex].question + '</span> </label>';

    answerA = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerA"> <input type="radio" class="' + randArrIndex + '" name="answer' + randArrIndex + '" value="a" onClick="clicked(this.value, this.className)"> </input> <span class="ml-2 px-4 py-2 text-purple-800">' + randArr[randArrIndex].answer.a + '</span> </label>';

    answerB = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerB"> <input type="radio" class=" ' +  randArrIndex + '" name="answer' + randArrIndex + '" value="b" onClick="clicked(this.value, this.className)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.b + '</span> </label>';

    answerC = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerC"> <input type="radio" class=" ' + randArrIndex + '" name="answer' + randArrIndex + '" value="c" onClick="clicked(this.value, this.className)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.c + '</span> </label>';

    answerD = '<label class="inline-flex items-center px-4 py-2 font-bold text-purple-800 w-1/4" id="answerD"> <input type="radio" class= "' + randArrIndex + '" name="answer' + randArrIndex + '" value="d" onClick="clicked(this.value, this.className)"> </input> <span class="ml-2 px-4 py-2 text-purple-800 ">' + randArr[randArrIndex].answer.d + '</span> </label>';

    questionContainer.append(question, answerA, answerB, answerC, answerD);
    correctQAns = randArr[randArrIndex].correct;
    $("#triviaAll").append(questionContainer);
}

//start timer
function timerStart(){
    if (!timerRunning) {
        $("#timer").show();
        intervalId = setInterval(decrement, 1000);
        timerRunning = true;
    }
}

//timer decrement
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
    results();
    time=5;
    timerStart();
        $("#triviaAll").hide();
        $("#outOfTime").show().text("Whoops you ran out of time! The answer to that question is " + correctQAns);
        newQ();
}

//game over
function endTrivia(){
    $("#timer").hide();
    $("#triviaAll").hide();
    $("#reset").show();
    $(".questionContainer").remove();
    $("#correctAns").show().text("Correct: " + correct);
    $("#incorrectAns").show().text("Incorrect: " + incorrect);
    unanswered = randArr.length - (correct + incorrect);
    $("#unanswered").show().text("Unanswered: " + unanswered);
}

//what happens onClick of radio btn
function clicked(currentAns, qIndex){
    const qIndexInt = parseInt(qIndex);
    const question = randArr[qIndexInt];

    const currentAnsObj = {
        correctAns: question.correct,
        radioAns: currentAns
    }

    answers[qIndexInt] = currentAnsObj;
    answerArray = Object.values(answers);
    console.log(answerArray);
    results();
}

// results
function results(){
    if (randArrIndex != 5){
        console.log(answerArray);

        for (i=0; i < answerArray.length; i++){
            if (answerArray[i].correctAns === answerArray[i].radioAns){
                $("#triviaAll").hide();
                clearInterval(intervalId);
                timerRunning = false;
                time = 5;
                correct ++;
                unanswered--;
                randArrIndex++;
                $("#correctAns").show().text("You got it right!!");
                timerStart();
                newQ();
            }
            else if (answerArray[i].radioAns === undefined){
                $("#triviaAll").hide();
                clearInterval(intervalId);
                timerRunning = false;
                time = 5;
                randArrIndex++;
                $("#outOfTime").show().text("Eep thats wrong! The answer to that question is " + correctQAns);
                timerStart();
                newQ();
            }
            else {
                $("#triviaAll").hide();
                clearInterval(intervalId);
                timerRunning = false;
                time = 5;
                incorrect ++;
                unanswered--;
                randArrIndex++;
                $("#unanswered").show().text("Whoops you ran out of time! The answer to that question is " + correctQAns);
                timerStart();
                newQ();
            }
        }
    }
    else {
        endTrivia();
    }
}
    

// reset
function reset(){
    $("#timer").show();
    $("#triviaAll").show();

    $("#start").hide();
    $("#howTo").hide();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#unanswered").hide();
    $("#onTime").hide();
    $("#outOfTime").hide();
    $("#reset").hide();

    correct = 0;
    incorrect = 0;
    unanswered = 0;
    answers = { };
    randArr = [ ];
    randArrIndex = 0;
    time=0;

    clearInterval(intervalId);
    timerRunning = false;

    start();
}


// Show one question at a time
// Show screens for four scenarios
//      Correct Answer 
//          -> Will say the question was answered right
//          -> Then will go to the next question
//      Wrong Answer 
//          -> Will say the question was answered wrong
//          -> Show the correct answer
//          -> Then will go to the next question
//      Page for if the time runs out
//          -> Display the correct answer and then show the next question
//      Page for if its finished on time
// Final Screen will show
//      Correct Answers
//      Incorrect Answers
//      Unanswered
//      Restart Option
//
//----Buttons
// Start - done
// Reset - done

//----Load page
//Directions for the game - done
//Start button - done
//Extra: different topic options

//-----Trivia page stuff
//Make a layout with radio options for answers - done
//Timer area - done

//----Result page
//Restart buttom -done
//# Correctly Answered Questions -done
//# Incorrectly Answered Questions -done
//# Unanswered Questions -done

//----JS stuff
//Game start function - reset/sets the timer when the Start or restart button is clicked - done
//Randomize the questions - done
//Generate the questions to the page - done
//Check the final answers with the correct ones. Only do this if the player hits Done or if the timer runs out -done
//function for what happens when the done button is used - done
//function for what happens when the timer runs out - done
//function to update the timer on the page - done


