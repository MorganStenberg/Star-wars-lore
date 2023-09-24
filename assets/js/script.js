// connecting html elements to variables
const startButton = document.getElementById('start-btn')
const welcomeText = document.getElementById('welcome-text')
const gameArea = document.getElementById('game-area')
const nextQuestionButton = document.getElementById('next-btn')
const startSound = new Audio('assets/audio/lightsaber.mp3')
const questionElement = document.getElementById('questions')
const answerButtons = document.getElementById('answer-buttons')
const questionNr = document.getElementById('number-of-questions')
const scoreCount = document.getElementById('score')
const resultText = document.getElementById('result-text')

/* 
Event listener for start button, calls two functions
for starting the quiz and sound effect.
*/
startButton.addEventListener('click', function() {
    startQuiz()
    playSound()
})

nextQuestionButton.addEventListener('click', function() {
    currentQuestionIndex++
    nextQuestion()
})


let currentQuestionIndex = 0; 
let score = 0;

/** 
 * Function to start the quiz itself, and hide welcome text and start button
 * calls displayQuestion function
 */
function startQuiz () {
    welcomeText.classList.add('hide');
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();

}

// For playing sound when clicking start button
function playSound () {
    startSound.play()
}

// Function to get a question from question array and calculate number of questions
function displayQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn-answer');
        answerButtons.appendChild(button);
        button.addEventListener("click", selectedAnswer)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
    })
}

/** Function to check if answer is correct, increment score 
and calculate total number of questions. Also callin function to show correct answer 
and disable answer buttons. 
*/ 
function selectedAnswer(event) {
    const selectedBtn = event.target
    const correctAnswer = selectedBtn.dataset.correct
    if (correctAnswer) {
        score++;
        scoreCount.innerText = score;
        selectedBtn.classList.add('correct')
    } else {
        selectedBtn.classList.add('incorrect')
    }
    nextQuestionButton.classList.remove('hide');
    let numberOfQuestion = currentQuestionIndex + 1;
    questionNr.textContent = " " + numberOfQuestion;
    showCorrectAnswer();
}


/**
 * Function to disable answerbutton when one answer is selected, also callin function 
 * to highlight the correct answer if wrong one is picked. Credit to https://www.youtube.com/watch?v=PBcqGxrr9g8 
 */
function showCorrectAnswer() {
Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    }
    button.disabled = true; 
})
}

/**
 * Function to call the right functions for resetting game area and 
 * displaying next question. If max nr of question reached 
 * call results function
 */

function nextQuestion () {
    if (currentQuestionIndex < 10) {
        resetState()
        displayQuestion()
    } else { endQuiz()
    } 
}

/**
 * Function to reset game area for next question. Removes answer buttons from previous question 
 * and hides the next button. Credit for how to remove answer buttons from https://www.youtube.com/watch?v=PBcqGxrr9g8
 */

function resetState () {
    nextQuestionButton.classList.add('hide');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

/**
 * Function to end the quiz after max question reached
 * and display result to user
 */

function endQuiz () {
    gameArea.classList.add('hide');
    nextQuestionButton.classList.add('hide');
    resultText.classList.remove('hide');
    result();
}


/** 
 * Function to display results, depending on nr of 
 * correct answers will show different quote to user
 */
function result () {
    if (score === 10) {
        return "placeholder 10 score"
    } else if (score < 10 && score > 6) {
        return "placeholder 7-9 score"
    } else if (score < 7 && score > 3) {
        return "placeholder 6-4 score"
    } else if (score <= 3) {
        return "placeholder 0-3 score"
    }
        
}


const questions = [
    { 
        question: "What is the name of Luke Skywalker's home planet?", 
    
        answers: [ 
        { text: "Tatooine", correct: true }, 
        { text: "Alderaan", correct: false }, 
        { text: "Naboo", correct: false }, 
        { text: "Coruscant", correct: false }, 
         ]
     },
     { 
        question: "What type of ship does Boba Fett fly in the original trilogy?", 
    
        answers: [ 
        { text: "Slave I", correct: true }, 
        { text: "Imperial Shuttle", correct: false }, 
        { text: "TIE Fighter", correct: false },
        { text: "X-wing Starfighter", correct: false },             
         ]
     },
     { 
        question: "What is the name of the ancient Sith home world?", 
    
        answers: [ 
        { text: "Korriban", correct: true }, 
        { text: "Dromund Kaas", correct: false }, 
        { text: "Malachor V", correct: false }, 
        { text: "Exegol", correct: false }, 
         ]
     },
    ]    
