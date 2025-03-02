const timeInput = document.getElementById('timeInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const countdownEl = document.getElementById('countdown');

let countdownValue = 0;
let countdownInterval = null;

document.addEventListener('DOMContentLoaded', function() {
    countdownValue = parseInt(timeInput.value);
    countdownEl.textContent = countdownValue;
});

startBtn.addEventListener('click', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    countdownValue = parseInt(timeInput.value);
    
    if (isNaN(countdownValue) || countdownValue <= 0) {
        alert('Please enter a valid time!');
        return;
    }
    
    countdownEl.textContent = countdownValue;
    countdownEl.classList.remove('time-expired');
    
    startBtn.disabled = true;
    timeInput.disabled = true;
    
    countdownInterval = setInterval(function() {
        countdownValue--;
        countdownEl.textContent = countdownValue;
        
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            countdownEl.textContent = 'Time is up!';
            countdownEl.classList.add('time-expired');
            startBtn.disabled = false;
            timeInput.disabled = false;
        }
    }, 1000);
});

resetBtn.addEventListener('click', function() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    
    startBtn.disabled = false;
    timeInput.disabled = false;
    
    countdownValue = parseInt(timeInput.value);
    countdownEl.textContent = countdownValue;
    countdownEl.classList.remove('time-expired');
}); 