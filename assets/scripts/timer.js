document.addEventListener('DOMContentLoaded', function() {
    // Constants for DOM elements
    const settingsBtn = document.getElementById('setting-btn');
    const modal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const focusTimeInput = document.getElementById('focus-time');
    const breakTimeInput = document.getElementById('break-time');
    const longBreakTimeInput = document.getElementById('long-break-time');
    const timerDisplay = document.getElementById('timer-display');
    const timerTitle = document.getElementById('timer-title');
    const timerButton = document.getElementById('timer-btn');
    const homeBtn = document.getElementById('home-btn');
    const videoBtn = document.getElementById('video-btn');
    const videoContainer = document.getElementById('video-container');
    const focusVideoUrlInput = document.getElementById('focus-video-url');
    const breakVideoUrlInput = document.getElementById('break-video-url');
    const setFocusVideoBtn = document.getElementById('set-focus-video');
    const setBreakVideoBtn = document.getElementById('set-break-video');

    // Initial settings for timer
    let currentMode = 'focus'; // can be 'focus', 'shortBreak', 'longBreak'
    let focusTime = 25 * 60; // 25 minutes in seconds
    let shortBreakTime = 10 * 60; // 10 minutes in seconds
    let longBreakTime = 15 * 60; // 15 minutes in seconds
    let cycles = 0; // To track the number of focus sessions
    let timer = null; // Initialize timer as null

    // Event listeners for settings modal
    settingsBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    saveSettingsBtn.addEventListener('click', function() {
        // Update times and hide modal
        focusTime = parseInt(focusTimeInput.value) * 60;
        shortBreakTime = parseInt(breakTimeInput.value) * 60;
        longBreakTime = parseInt(longBreakTimeInput.value) * 60;
        modal.style.display = 'none';
        updateDisplay();
    });

    window.addEventListener('click', function(event) {
        // Close modal if click outside
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Event listener for timer button
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

    // Start timer function
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

    // Get current time based on currentMode
    function getCurrentTime() {
        switch (currentMode) {
            case 'focus':
                return focusTime;
            case 'shortBreak':
                return shortBreakTime;
            case 'longBreak':
                return longBreakTime;
            default:
                return 0;
        }
    }

    // Switch timer mode function
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

    // Format time function (mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update display with current settings
    function updateDisplay() {
        timerDisplay.textContent = formatTime(getCurrentTime());
        timerTitle.textContent = currentMode === 'focus' ? 'Focus Time' :
                                  currentMode === 'shortBreak' ? 'Break Time' :
                                  'Long Break';
    }

    // Event listener for home button
    homeBtn.addEventListener('click', function() {
        window.location.href = '/tools'; // Adjust URL as needed
    });

    // Event listener for video button
    videoBtn.addEventListener('click', function() {
        videoContainer.style.display = videoContainer.style.display === 'block' ? 'none' : 'block';
        updateVideoContent();
    });

    // Event listener for setting focus video button
    setFocusVideoBtn.addEventListener('click', function() {
        setVideo('focus', focusVideoUrlInput.value);
    });

    // Event listener for setting break video button
    setBreakVideoBtn.addEventListener('click', function() {
        setVideo('break', breakVideoUrlInput.value);
    });

    // Function to play YouTube video
    function playVideo() {
        const iframe = document.getElementById('current-video');
        iframe.src = `https://www.youtube.com/embed/${getCurrentVideoId()}`;
    }

    // Get current video ID based on currentMode
    function getCurrentVideoId() {
        return currentMode === 'focus' ? focusVideoId :
               currentMode === 'break' ? breakVideoId :
               ''; // Handle default or error case
    }

    // Update video content based on current video IDs
    function updateVideoContent() {
        document.getElementById('focus-video').src = `https://www.youtube.com/embed/${focusVideoId}`;
        document.getElementById('break-video').src = `https://www.youtube.com/embed/${breakVideoId}`;

        focusVideoUrlInput.value = `https://www.youtube.com/watch?v=${focusVideoId}`;
        breakVideoUrlInput.value = `https://www.youtube.com/watch?v=${breakVideoId}`;
    }

    // Set video ID based on type (focus or break)
    function setVideo(type, url) {
        const videoId = extractVideoId(url);

        if (type === 'focus') {
            focusVideoId = videoId;
        } else if (type === 'break') {
            breakVideoId = videoId;
        }

        updateVideoContent();
    }

    // Extract video ID from YouTube URL
    function extractVideoId(url) {
        let videoId = '';
        const match = url.match(/[?&]v=([^?&]+)/);

        if (match) {
            videoId = match[1];
        }

        return videoId;
    }

    // Initialize the display
    updateDisplay();
});
