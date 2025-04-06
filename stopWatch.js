
let timerCount = document.getElementById('timerCount');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let stopButton = document.getElementById('stop');
let shortBreakButton = document.getElementById('shortBreak');
let longBreakButton = document.getElementById('longBreak');

const audioAlert = new Audio('path/to/alert.mp3'); 
let timer;
let isRunning = false;
let timeLeft = 25 * 60; 
let mode = 'Pomodoro'; 


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerCount.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                audioAlert.play();
                switchMode(); 
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = mode === 'Pomodoro' ? 25 * 60 : mode === 'Short Break' ? 5 * 60 : 15 * 60;
    updateTimerDisplay();
}

function switchMode(newMode) {
    if (newMode) {
        mode = newMode;
    } else {
        mode = mode === 'Pomodoro' ? 'Short Break' : mode === 'Short Break' ? 'Long Break' : 'Pomodoro';
    }
    timeLeft = mode === 'Pomodoro' ? 25 * 60 : mode === 'Short Break' ? 5 * 60 : 15 * 60;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
shortBreakButton.addEventListener('click', () => switchMode('Short Break'));
longBreakButton.addEventListener('click', () => switchMode('Long Break'));
