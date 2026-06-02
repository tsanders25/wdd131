/* --- js/game-logic.js --- */

// 1. Reveal Answer Logic
function revealAnswer() {
    const answerArea = document.getElementById('answerArea');
    answerArea.classList.remove('hidden'); // Removes the 'hidden' class to show text
}

// 2. Next Question Logic
function nextQuestion() {
    // For now, this just alerts us. 
    // Soon, this will pull the next row from your spreadsheet!
    alert("Moving to the next question...");
}

// 3. Close Game Logic
function closeGame() {
    document.getElementById('questionOverlay').classList.add('hidden');
}

// This will hold the questions for the current chapter
let currentQuestions = [];
let currentIndex = 0;

// Function to start a game with a specific set of questions
function startGame(questions) {
    currentQuestions = questions;
    currentIndex = 0;

    // Show the full-screen overlay
    document.getElementById('questionOverlay').classList.remove('hidden');
    updateQuestionDisplay();
}

function updateQuestionDisplay() {
    const q = currentQuestions[currentIndex];
    document.getElementById('questionText').innerText = q.Question;
    document.getElementById('answerText').innerText = q.Answer;
    document.getElementById('noteText').innerText = q.Note || "";

    // Update counter (Point 7)
    const remaining = currentQuestions.length - (currentIndex + 1);
    document.getElementById('questionCounter').innerText = `Questions left: ${remaining}`;

    // Hide answer area for the new question
    document.getElementById('answerArea').classList.add('hidden');
}

function revealAnswer() {
    document.getElementById('answerArea').classList.remove('hidden');
}

function nextQuestion() {
    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        updateQuestionDisplay();
    } else {
        alert("Chapter Complete!");
        closeGame();
    }
}

function closeGame() {
    document.getElementById('questionOverlay').classList.add('hidden');
}
