======================================================
## Variables
======================================================
**triviaQuestion[]** 
triviaQuestion -> array -> has objects in it that hold the questions . Each object has three keys: question, answer, correct. object does not have a key, so each question is referenced by its index

triviaQuestion = [
    {
        question: "string",
        answer: {
            a: value (string or int),
            b: value (string or int),
            c: value (string or int),
            d: value (string or int),
        }
        correct: function(){
            return this.answer.c;
        }
    }
]

*used in quiz population*
question -> initial value undefined
answerA -> initial value undefined
answerB -> initial value undefined
answerC -> initial value undefined
answerD -> initial value undefined

*used to track correct/incorrect/unanswered*
correct -> initial value 0
incorrect -> initial value 0
unanswered -> initial value 0
answers -> empty object
randArr -> empty array

*used in timer*
timerRunning -> initial value false
time -> initial value 0

======================================================
## HTML IDs all inside body tag
======================================================
Ids will show and hide depending on the page state
*js doesn't change the content of these*

**buttons**
- "start" -> start button
- "done" -> done button
- "reset" -> reset button

**text**
- "howto" ->  instructions
- "outOfTime" -> text to display on end page

*functions in the js will change the content of these*
**containers**
- "timer" -> timer
- "sec" -> inside timer, holds seconds for timer
- "triviaAll" -> where the questions will populate
- "correctAns" -> # of correct answers will go here
- "incorrectAns" -> # of incorrect answers will go here
- "unanswered" -> # of unanswered will go here
- "onTime" -> # for what will show when the player finished on time
- "outOfTime -> # for what will show when the player runs out of time
- "results" -> # for the final results page

======================================================
## Document ready function
======================================================

*show*
- Nothing

*hide*
- #timer
- #correctAns
- #incorrectAns
- #unanswered
- #onTime
- #outOfTime
- #results
- #done
- #reset

*click events*
- #start -> *start*
- #done -> *endTrivia*
- #reset -> *reset*

======================================================
## Functions
======================================================

### start()
**Called on click of #start**
*timerStart*
*randQuestions*

*show*
- #timer
- #done
- #triviaAll

*hide*
- #start
- #howto

### randQ()
**Called in start function**

*for loop to generate 5 random questions from the triviaQuestion array*
1. Generate a new array with 5 questions that are pulled from triviaQuestion
2. New array is called randArr


### firstQ()
**Called in randQ function**

*for, loop over triviaQuestion*
1. question, answerA, answerB, answerC, answerD are all set to undefined
2. question is set to create a <label> with *id = question* and a <span> with no id, containing randArr[i].question 
    1. This will store the question at i index from randArr into the question variable
3. The following is repeated for answer A, answerB, answerC, and answerD
    1. answerA is set to create a <label> with *id = answerA*, a <input type="radio"> with *class = i*, *name = answeri* and *value = a*, and a <span> with no id containering randArr[i].answer.a
        1. This is store the answers at index i for each letter in the answerA variable. Each answer option will have a radio button
        2. Each radio button will call *clicked* when it is clicked. The function will take this.value and this.className from the clicked radio button [value -> from input tag will be the letter (a,b,c,d); className -> from the input tag will be the index number to randArr]
4. triviaAll is appended to add question, answerA, answerB, answerC and answer D to show the content in the HTML

### nextQ()
**Called in firstQ function**



### timerStart()
**Called in start function**

*if statement*
1. when timerRunning is false
    1. intervalIs is set to call function *setInterval* which will call function *decrement* and the interval is set to 1000 milliseconds [every 1000 milliseconds the decrement function will be called]
    2. timerRunning is set to true


### decrement()
**Called in timerStart function**

1. time will be reduced by 1
2. *#sec* id in the HTML will display the value of time
3. *if statement*
    1. if time === 0 then call *endTrivia*

### resetTimer()
**Called in populateQ and nextQ**

### endTrivia()
**Called in decrement function**

*show*
- #reset
- #outOfTime

*hide*
- #done
- #timer
- #triviaAll

*remove*
- #label

*show and add text to HTML*
- #correctAns -> add text displaying # of correct
- #incorrectAns -> add text displaying # of incorrect
- #unanswered -> add text displaying # of unanswered

1. *clearInterval* called on intervalId to cancel setInterval [stops the timer]
2. timerRunning is set to false
3. time is set to 20

4. calls *results(endChoices)*

### clicked(x,y)
**Called on radio button click**

1. Each radio button is created to call function *clicked* onClick
    1. *clicked* needs two arguements to run
    2. currentAns -> value from input tag -> a,b,c,d [depending on which answer was chosen]
    3. qIndex -> className from input tag -> qIndex [index for the question in the triviaContainer]
    4. qIndex will come in as a string. parseInt(qIndex) will convert it to an integer
    5. New variable question is created and set equal to triviaQuestion[parseInt(qIndex)]
        1. This will set question equal to the question at that index from triviaQuestion
    6. New object currentAnsObj to hold the chosen answer, correct answer and the index of the question in reference to triviaQuestion
    7. With every click the currentAnsObj will be pushed to empty array endChoices
    8. if endChoices is an empty array then push currentAnsObj into endChoices else *for loop* to check if endChoices has a value for that questions index if it does then replace with the new data if not then add to the array

### results(a)
**Called in endTrivia function**

1. *if statement*
    1. if the a.correctAns === a.radioAns
        1. Add one to correct counter
        2. Subtract one from the unanswered counter
    2. else
        1. Add one to incorrect counter
        2. Subtract one from the unanswered counter
2. Also repeated for incorrect and unanswered
    1.*#correctAns* id in the HTML will display the # of correctAns

### reset
**Called on click of #reset**

*show*
- #timer
- #done
- #triviaAll

*hide*
- #start
- #howTo
- #outOfTime
- #correctAns
- #incorrectAns
- #unanswder
- #reset

*variable value resets*
- correct -> 0
- incorrect -> 0
- unanswered -> 0
- answers -> 0
- randArr -> empty array

- intervaId -> 0
- timerRunning -> false
- time -> 20

Call *start*