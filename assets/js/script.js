// connecting html elements to variables
const startButton = document.getElementById('start-btn')
const welcomeText = document.getElementById('welcome-text')
const gameArea = document.getElementById('game-area')

startButton.addEventListener('click', startQuiz)

/** 
 * Function to start the quiz itself, and hide welcome text and start button
 */
function startQuiz () {
welcomeText.classList.add('hide');
startButton.classList.add('hide');
gameArea.classList.remove('hide')
}