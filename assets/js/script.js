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
const resultArea = document.getElementById('result-text')
const retryButton = document.getElementById('retry-btn')

const bestResultText = "The force is strong with you!"
const goodResultText = "Great promise in you I feel"
const mediumResultText = "Much to learn young padawan has"
const worstResultText = "It's a trap!"

let currentQuestionIndex = 0; 
let score = 0;
let numberOfQuestion = 0;
let randomizedQuestions; 

/** 
 * Function to start the quiz itself, and hide welcome text and start button.
 * Calls displayQuestion function and randomizes the questions, 
 * credit for using sort method to randomize: 
 * https://stackdiary.com/tutorials/how-to-randomly-shuffle-a-javascript-array/
 */
function startQuiz () {
    welcomeText.classList.add('hide');
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    randomizedQuestions = questions.sort(() => Math.random() - 0.5);
    playSound ()
    displayQuestion();

}

// For playing sound when starting quiz
function playSound () {
    startSound.play()
}

/**
 * Function to get a question and corresponding answers from question array. 
 * Inserts question and creates answer buttons. Buttons listenes for click
 * and calls function for selecting answer.
 *  */ 
function displayQuestion() {
    let currentQuestion = randomizedQuestions[currentQuestionIndex];
    
    questionElement.textContent = currentQuestion.question;
    

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn-answer');
        answerButtons.appendChild(button);
        button.addEventListener("click", onUserSelection)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
    })
}

/** Function to check if answer is correct, increment score 
and calculate total number of questions. Also callin function to show correct answer 
and disable answer buttons. 
*/ 
function onUserSelection(event) {
    const selectedBtn = event.target
    const correctAnswer = selectedBtn.dataset.correct
    if (correctAnswer) {
        score++;
        scoreCount.innerText = " " + score;
        selectedBtn.classList.add('correct')
    } else {
        selectedBtn.classList.add('incorrect')
    }
    nextQuestionButton.classList.remove('hide');
    numberOfQuestion = currentQuestionIndex + 1;
    questionNr.innerText = " " + numberOfQuestion;
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
    currentQuestionIndex++;
    if (currentQuestionIndex < 10) {
        resetQuestion();
        displayQuestion();
    } else { 
        endQuiz();
    } 
}

/**
 * Function to reset game area for next question. Removes answer buttons from previous question 
 * and hides the next button. Credit for how to remove answer buttons from https://www.youtube.com/watch?v=PBcqGxrr9g8
 */

function resetQuestion () {
    nextQuestionButton.classList.add('hide');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

/**
 * Function to end the quiz after max question reached
 * and call function to display result to user
 */

function endQuiz () {
    gameArea.classList.add('hide');
    nextQuestionButton.classList.add('hide');
    resultArea.classList.remove('hide');
    retryButton.classList.remove('hide');
    renderResult();
}

/** 
 * Function to display results, depending on nr of 
 * correct answers will show different quote to user
 */
function renderResult () {
    const resultText = document.createElement("p")
    const resultScore = document.createElement("p")
    resultScore.innerText = "You scored " + score + " of 10";
    if (score === 10) {
        console.log("placeholder 10 score")
        resultText.innerText =  bestResultText;
    } else if (score < 10 && score > 6) {
        console.log("placeholder 7-9 score")
        resultText.innerText =  goodResultText;
    } else if (score < 7 && score > 3) {
        console.log("placeholder 4-6 score") 
        resultText.innerText =  mediumResultText;
    } else if (score < 4) {
        console.log("placeholder 0-3 score") 
        resultText.innerText =  worstResultText; 
    }
    resultArea.appendChild(resultScore)
    resultArea.appendChild(resultText)
}

/**
 * Function to reset the quiz after pressing retry button. 
 * Resets score, question index and question number. 
 * Removes answer buttons and result text. Calls start quiz function. 
 */
function restartQuiz () {
    score = 0;
    currentQuestionIndex = 0;
    questionNr.innerText = " " + currentQuestionIndex;
    scoreCount.innerText = " " + score;
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    while(resultArea.firstChild){
        resultArea.removeChild(resultArea.firstChild);
    }
    startQuiz()
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
    { 
        question: "What is the name of the ancient and powerful dark side Force users who are sworn enemies of the Jedi?", 
        answers: [ 
            { text: "Mandalorians", correct: false }, 
            { text: "Sith", correct: true }, 
            { text: "Inquisitors", correct: false },
            { text: "Nightsisters", correct: false },
         ] 
    },
    { 
        question: "Which Sith Lord was known as the 'Darth Plagueis the Wise'?", 
        answers: [ 
            { text: "Darth Malgus", correct: false }, 
            { text: "Darth Sidious (Emperor Palpatine)", correct: true }, 
            { text: "Darth Bane", correct: false }, 
            { text: "Darth Revan", correct: false }, 
        ]
    }, 
    { 
        question: "What is the name of the bounty hunter who captured Han Solo in 'Return of the Jedi'?",
        answers: [ 
            { text: "Zuckuss", correct: false }, 
            { text: "Aurra Sing", correct: false }, 
            { text: "Boushh", correct: true }, 
            { text: "4-LOM", correct: false }, 
        ] 
    }, 
        
    { 
        question: "What type of ship does Boba Fett fly in the original trilogy?", 
        answers: [ 
            { text: "Slave I", correct: true }, 
            { text: "X-wing Starfighter", correct: false }, 
            { text: "Imperial Shuttle", correct: false }, 
            { text: "TIE Fighter", correct: false }, 
        ] 
    },  
    { 
        question: "What is the name of the system where the Rebel Alliance's Echo Base is located in 'The Empire Strikes Back'?", 
        answers: [ 
            { text: "Dagobah System", correct: false },
            { text: "Endor System", correct: false }, 
            { text: "Hoth System", correct: true }, 
            { text: "Tatoo System", correct: false }, 
        ] 
    },     
    { 
        question: "What species is Grand Admiral Thrawn?", 
        answers: [ 
            { text: "Rodian", correct: false }, 
            { text: "Chiss", correct: true }, 
            { text: "Sullustan", correct: false }, 
            { text: "Twilek", correct: false }, 
        ] 
    },
    {
        question: "Who is the leader of the Nightsisters, a clan of Force-sensitive witches on Dathomir?",
        answers: [
            { text: "Asajj Ventress", correct: false },
            { text: "Mother Talzin", correct: true },
            { text: "Darth Talon", correct: false },
            { text: "Barris Offee", correct: false },
        ]
    },
    {
        question: "What is the name of the Wookiee home planet?",
        answers: [
            { text: "Kashyyyk", correct: true },
            { text: "Sullust", correct: false },
            { text: "Felucia", correct: false },
            { text: "Kessel", correct: false },
        ]
    },
    {
        question: "Who is the Sith Lord who took over Mandalore and wielded the Darksaber?",
        answers: [
            { text: "Savage Opress", correct: false },
            { text: "Darth Maul", correct: true },
            { text: "Darth Malgus", correct: false },
            { text: "Count Dooku", correct: false },
        ]
    },
    {
        question: "What is the name of the bounty hunter known for wearing distinctive Mandalorian armor and being a feared enforcer?",
        answers: [
            { text: "Jango Fett", correct: false },
            { text: "Boba Fett", correct: true },
            { text: "Cade Bane", correct: false },
            { text: "Zam Wesell", correct: false },
        ]
    },
    {
        question: "Which Rebel pilot earned the nickname 'Red Leader' during the Battle of Yavin in 'A New Hope'?",
        answers: [
            { text: "Wedge Antilles", correct: false },
            { text: "Garven Dreis", correct: true },
            { text: "Hobbie Klivian", correct: false },
            { text: "Biggs Darklighter", correct: false },
        ]
    },
    {
        question: "What is the name of the infamous bounty hunter who was trained by Jango Fett and played a significant role in the Clone Wars?",
        answers: [
            { text: "Aurra Sing", correct: false },
            { text: "Cad Bane", correct: true },
            { text: "Embo", correct: false },
            { text: "Durge", correct: false },
        ]
    },
    {
        question: "What type of ship does the Millennium Falcon initially appear as?",
        answers: [
            { text: "YT-1300 Light Freighter", correct: true },
            { text: "YT-2000 Light Freighter", correct: false },
            { text: "YT-2400 Light Freighter", correct: false },
            { text: "YT-1760 Light Freighter", correct: false },
        ]
    },
];

/**
 * Waits for page to load before adding eventlisteners
 */
document.addEventListener("DOMContentLoaded", function () {

    /**
    * Listens to start game event and starts the quiz
    */
    startButton.addEventListener("click", startQuiz);

    // Handles click for "Next Question" button.
    nextQuestionButton.addEventListener('click', nextQuestion);
    
    /* 
    Event listener for retry quiz button. Calls resetquiz function. 
    Hides result area and retry button
    */
    retryButton.addEventListener('click', function() {
        restartQuiz()
        resultArea.classList.add('hide')
        retryButton.classList.add('hide')
    });
});