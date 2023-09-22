// connecting html elements to variables
const startButton = document.getElementById('start-btn')
const welcomeText = document.getElementById('welcome-text')
const gameArea = document.getElementById('game-area')
const nextQuestionButton = document.getElementById('next-btn')
let startSound = new Audio('assets/audio/lightsaber.mp3')

/* 
Event listener for start button, calls two functions
for starting the quiz and sound effect.
*/
startButton.addEventListener('click', function() {
    startQuiz()
    playSound()
})

/** 
 * Function to start the quiz itself, and hide welcome text and start button
 * calls displayQuestion function
 */
function startQuiz () {
    welcomeText.classList.add('hide');
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    nextQuestionButton.classList.remove('hide');
    displayNexQuestion();

}

function playSound () {
    startSound.play()
}

function displayNexQuestion() {

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
    ]    