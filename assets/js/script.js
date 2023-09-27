// connecting html elements to variables
const startButton = document.getElementById('start-btn');
const welcomeText = document.getElementById('welcome-text');
const gameArea = document.getElementById('game-area');
const nextQuestionButton = document.getElementById('next-btn');
const startSound = new Audio('assets/audio/lightsaber.mp3');
const questionElement = document.getElementById('questions');
const answerButtons = document.getElementById('answer-buttons');
const questionCounter = document.getElementById('question-counter');
const scoreCount = document.getElementById('score');
const resultArea = document.getElementById('result-area');
const resultText = document.getElementById('result-text');
const resultScore = document.getElementById('result-score');
const retryButton = document.getElementById('retry-btn');

const bestResultText = '"You are the chosen one. You will bring balance to the force"';
const goodResultText = '"This is the way!"';
const mediumResultText = '"Much to learn.. You still have"';
const worstResultText = '"Do or do not.. There is no try"';

const maxQuestion = 10; 

let currentQuestionIndex = 0; 
let score = 0;
let numberOfQuestion = 0;
let randomizedQuestions; 

// Questions for the quiz
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
    {
        question: "What is the name of the ancient Sith Lord who created the rule of two?",
        answers: [
            { text: "Darth Nihilus", correct: false },
            { text: "Darth Revan", correct: false },
            { text: "Darth Malak", correct: false },
            { text: "Darth Bane", correct: true },
        ]
    },

    {
        question: "What is the name of Luke Skywalkers aunt?",
        answers: [
            { text: "Tara", correct: false },
            { text: "Hana", correct: false },
            { text: "Beru", correct: true },
            { text: "Nona", correct: false },
        ]
    },
    {
        question: "Who was the commander on the first Death Star?",
        answers: [
            { text: "Orson Callan Krennic", correct: false },
            { text: "General Grievous", correct: false },
            { text: "Finis Valorum", correct: false },
            { text: "Grand Moff Tarkin", correct: true },
        ]
    },
    {
        question: "Whose sword did Obi-Wan Kenobi use to win the fight with Darth Maul in Episode I - The Phantom Menace?",
        answers: [
            { text: "His own", correct: false },
            { text: "Qui-Gon's", correct: true },
            { text: "Mace Windu's", correct: false },
            { text: "Darth Maul's", correct: false },
        ]
    },

    {
        question: "How many years did the clone wars last?",
        answers: [
            { text: "11 years", correct: false },
            { text: "6 years", correct: false },
            { text: "9 years", correct: false },
            { text: "3 years", correct: true },
        ]
    },


    {
        question: "What planet did Luke Skywalker go to in order to find Yoda?",
        answers: [
            { text: "Endor", correct: false },
            { text: "Alderaan", correct: false },
            { text: "Dagobah", correct: true },
            { text: "Yavin 4", correct: false },
        ]
    },

    {
        question: "Who was the leader of the Gungans during the Battle of Naboo in 'The Phantom Menace'?",
        answers: [
            { text: "Captain Tarpals", correct: false },
            { text: "Boss Nass", correct: true },
            { text: "Jar Jar Binks", correct: false },
            { text: "Otoh Gunga", correct: false },
        ]
    },

    {
        question: "What is the name of the gas giant planet where the Clone Army was created?",
        answers: [
            { text: "Mustafar", correct: false },
            { text: "Geonosis", correct: false },
            { text: "Kamino", correct: true },
            { text: "Felucia", correct: false },
        ]
    },

    {
        question: "Which Jedi Master served as the Grand Master of the Jedi Order before Yoda?",
        answers: [
            { text: "Mace Windu", correct: false },
            { text: "Plo Koon", correct: false },
            { text: "Ki-Adi-Mundi", correct: false },
            { text: "Nomi Sunrider", correct: true },
        ]
    },

    {
        question: "In 'Return of the Jedi,' what is the name of the criminal organization led by Jabba the Hutt?",
        answers: [
            { text: "Rebel Alliance", correct: false },
            { text: "Galactic Empire", correct: false },
            { text: "The Hutts", correct: false },
            { text: "Black Sun", correct: true },
        ]
    },

    {
        question: "What planet is the forest moon of Endor orbiting?",
        answers: [
            { text: "Tatooine", correct: false },
            { text: "Yavin", correct: false },
            { text: "Alderaan", correct: false },
            { text: "Sullust", correct: true },
        ]
    },

    {
        question: "What is the name of the ancient Sith lightsaber technique that involves using two lightsabers, one for offense and one for defense?",
        answers: [
            { text: "Djem So", correct: false },
            { text: "Juyo", correct: false },
            { text: "Jar'Kai", correct: true },
            { text: "Shien/Djem So", correct: false },
        ]
    },

    {
        question: "What is the name of the Clone Trooper who received special training from ARC trooper Alpha-17 and served under Jedi General Obi-Wan Kenobi?",
        answers: [
            { text: "CC-2224 (Cody)", correct: true },
            { text: "CT-5555 (Fives)", correct: false },
            { text: "CT-7567 (Rex)", correct: false },
            { text: "CT-1409 (Echo)", correct: false },
        ]
    },

    {
        question: "What is the name of the giant space slug-like creature that Han Solo's Millennium Falcon encounters in 'The Empire Strikes Back'?",
        answers: [
            { text: "Exogorth", correct: true },
            { text: "Sarlacc", correct: false },
            { text: "Rancor", correct: false },
            { text: "Dianoga", correct: false },
        ]
    },
];

/** 
 * Starts the quiz itself, hides welcome text and start button.
 * Calls displayQuestion function and randomizes the questions, 
 * credit for using sort method to randomize: 
 * https://stackdiary.com/tutorials/how-to-randomly-shuffle-a-javascript-array/
 */
function startQuiz() {
    welcomeText.classList.add('hide');
    startButton.classList.add('hide');
    gameArea.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    randomizedQuestions = questions.sort(() => Math.random() - 0.5);
    playSound();
    displayQuestion();

}

// Plays sound when starting quiz
function playSound() {
    startSound.play();
}

/**
 * Gets a question and corresponding answers from question array. 
 * Inserts question and creates answer buttons. Buttons listens for click
 * and calls function for selecting answer.
 *  */
function displayQuestion() {
    let currentQuestion = randomizedQuestions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    numberOfQuestion = currentQuestionIndex + 1;
    questionCounter.textContent = `Question ${numberOfQuestion} of ${maxQuestion}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn-answer');
        answerButtons.appendChild(button);
        button.addEventListener("click", onUserSelection);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

/** 
 * Checks if answer is correct, increments score and total number of questions. 
 * Calls function to show correct answer and disable answer buttons. 
*/
function onUserSelection(event) {
    const selectedBtn = event.target;
    const correctAnswer = selectedBtn.dataset.correct;
    if (correctAnswer) {
        score++;
        scoreCount.textContent = " " + score;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
    }
    nextQuestionButton.classList.remove('hide');
    showCorrectAnswer();
}


/**
 * Shows correct answer to user if wrong answer is picked,
 * disables buttons after user has answered.
 * Credit to https://www.youtube.com/watch?v=PBcqGxrr9g8 
 */
function showCorrectAnswer() {
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

/**
 * Calls the right functions for resetting game area and 
 * displaying next question. Increments question index.
 * Calls function to end quiz if max nr of question has been reached.
 */
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestion) {
        resetQuestion();
        displayQuestion();
    } else {
        endQuiz();
    }
}

/**
 * Resets game area for next question. Removes answer buttons from previous question 
 * and hides the next button. 
 * Credit for how to remove answer buttons from https://www.youtube.com/watch?v=PBcqGxrr9g8
 */
function resetQuestion() {
    nextQuestionButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

/**
 * Ends quiz after max number of question has been reached.
 * Calls function to display result to user
 */
function endQuiz() {
    gameArea.classList.add('hide');
    nextQuestionButton.classList.add('hide');
    resultArea.classList.remove('hide');
    retryButton.classList.remove('hide');
    renderResult();
}

/** 
 * Renders result to user. Displays different texts depending on range of score
 */
function renderResult() {
    resultScore.textContent = `You scored ${score} of ${maxQuestion}`;

    // calculating the score range
    const scorePercentage = (score / maxQuestion) * 100;

    if (score === maxQuestion) {
        resultText.textContent = bestResultText;
    } else if (scorePercentage >= 70 && scorePercentage < 100) {
        resultText.textContent = goodResultText;
    } else if (scorePercentage >= 40 && scorePercentage < 70) {
        resultText.textContent = mediumResultText;
    } else if (scorePercentage < 40) {
        resultText.textContent = worstResultText;
    }
}

/**
 * Restarts the quiz after user presses retry button. 
 * Resets score, question index and question number. 
 * Removes answer buttons and result text. Calls start quiz function. 
 */
function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreCount.textContent = " " + score;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    startQuiz();
}

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
    retryButton.addEventListener('click', function () {
        restartQuiz();
        resultArea.classList.add('hide');
        retryButton.classList.add('hide');
    });
});