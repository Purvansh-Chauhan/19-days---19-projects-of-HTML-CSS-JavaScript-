// DOM Elements selection
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const maxScoreSpan = document.getElementById("max-score");
const totalQuestionsSpan = document.getElementById("total-questions");

// QUIZ QUESTIONS
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for Gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false }
        ]
    }
];

// QUIZ STATE VARIABLES
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Set total questions
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answersDisabled = false;
    scoreSpan.textContent = "0";
    
    // Switch screens
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");
    
    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    
    // Set question text
    questionText.textContent = currentQuestion.question;
    
    // Clear previous answers
    answersContainer.innerHTML = "";
    
    // Create answer buttons
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;
    
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    // Disable all answer buttons
    Array.from(answersContainer.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        if (button === selectedButton && !isCorrect) {
            button.classList.add("incorrect");
        }
    });
    
    // Add correct class to the selected button if it's correct
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        scoreSpan.textContent = score;
    }
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good Effort! Keep Learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You will get better!";
    }
}

function restartQuiz() {
    startQuiz();
}
