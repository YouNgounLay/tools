document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.getElementById('setting-btn');
    const modal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const focusTimeInput = document.getElementById('focus-time');
    const breakTimeInput = document.getElementById('break-time');
    const longBreakTimeInput = document.getElementById('long-break-time');

    let focusTime = 25 * 60; // 25 minutes in seconds
    let shortBreakTime = 10 * 60; // 10 minutes in seconds
    let longBreakTime = 15 * 60; // 15 minutes in seconds
    let cycles = 0; // To track the number of focus sessions
    let timer;
    let currentMode = 'focus'; // can be 'focus', 'shortBreak', 'longBreak'

    settingsBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', function() {
        focusTime = parseInt(focusTimeInput.value) * 60;
        shortBreakTime = parseInt(breakTimeInput.value) * 60;
        longBreakTime = parseInt(longBreakTimeInput.value) * 60;
        modal.style.display = 'none';
        updateDisplay();
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const timerDisplay = document.getElementById('timer-display');
    const timerTitle = document.getElementById('timer-title');
    const timerButton = document.getElementById('timer-btn');

    timerButton.addEventListener('click', function() {
        if (timer) {
            clearInterval(timer);
            timer = null;
            timerButton.textContent = 'Start';
        } else {
            startTimer();
            timerButton.textContent = 'Pause';
        }
    });

    function startTimer() {
        let time = getCurrentTime();

        timer = setInterval(function() {
            if (time <= 0) {
                clearInterval(timer);
                timer = null;
                switchMode();
                return;
            }

            time--;
            timerDisplay.textContent = formatTime(time);
        }, 1000);
    }

    function getCurrentTime() {
        switch (currentMode) {
            case 'focus':
                return focusTime;
            case 'shortBreak':
                return shortBreakTime;
            case 'longBreak':
                return longBreakTime;
        }
    }

    function switchMode() {
        if (currentMode === 'focus') {
            cycles++;
            if (cycles % 3 === 0) {
                currentMode = 'longBreak';
                timerTitle.textContent = 'Long Break';
            } else {
                currentMode = 'shortBreak';
                timerTitle.textContent = 'Break Time';
            }
        } else {
            currentMode = 'focus';
            timerTitle.textContent = 'Focus Time';
        }

        timerDisplay.textContent = formatTime(getCurrentTime());
        timerButton.textContent = 'Start';
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(getCurrentTime());
        timerTitle.textContent = currentMode === 'focus' ? 'Focus Time' :
                                  currentMode === 'shortBreak' ? 'Break Time' :
                                  'Long Break';
    }

    // Initialize the display
    updateDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const homeBtn = document.getElementById('home-btn');
    homeBtn.addEventListener('click', function() {
        window.location.href = '/';
    });
});
