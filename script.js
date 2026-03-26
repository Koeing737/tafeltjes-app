let streak = 0;
let highscore = 0;
let timeSaved = 0;
let currentQuestion = {};
let tables = [1,2,3,4,5,6,7,8,9,10];

const streakEl = document.getElementById('streak');
const highscoreEl = document.getElementById('highscore');
const timeSavedEl = document.getElementById('time-saved');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submitBtn');
const feedbackEl = document.getElementById('feedback');
const tableDropdown = document.getElementById('tableDropdown');

tables.forEach(t => {
    const option = document.createElement('option');
    option.value = t;
    option.textContent = t;
    option.selected = true;
    tableDropdown.appendChild(option);
});

function newQuestion() {
    const selectedTables = Array.from(tableDropdown.selectedOptions).map(o => parseInt(o.value));
    if(selectedTables.length === 0) {
        questionEl.textContent = 'Selecteer minstens 1 tafel!';
        return;
    }
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const number = Math.floor(Math.random() * 10) + 1;
    currentQuestion = { table, number, answer: table * number };
    questionEl.textContent = `${table} × ${number} = ?`;
    answerEl.value = '';
    feedbackEl.textContent = '';
}

submitBtn.addEventListener('click', () => {
    const userAnswer = parseInt(answerEl.value);
    if(userAnswer === currentQuestion.answer) {
        feedbackEl.textContent = '✅ Correct!';
        streak++;
        if(streak > highscore) highscore = streak;
        timeSaved += 2;
        updateStats();
        newQuestion();
    } else {
        feedbackEl.textContent = '❌ Fout, probeer opnieuw!';
        streak = 0;
        updateStats();
    }
});

function updateStats() {
    streakEl.textContent = `Streak: ${streak}`;
    highscoreEl.textContent = `Highscore: ${highscore}`;
    timeSavedEl.textContent = `Gespaarde Tijd: ${timeSaved}s`;
}

newQuestion();
updateStats();
