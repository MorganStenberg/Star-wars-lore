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
    displayQuestion()
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
    let numberOfQuestion = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    questionNr.textContent = " " + numberOfQuestion;

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

// Function to check if answer is correct and increment score 
function selectedAnswer(event) {
    const selectedBtn = event.target
    const correctAnswer = selectedBtn.dataset.correct
    if (correctAnswer) {
        score++;
        scoreCount.innerText = score;
    }
    nextQuestionButton.classList.remove('hide');
    
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
