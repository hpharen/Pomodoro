
const switcher = document.getElementById("theme-switch");
const body = document.body;
const timerDisplay = document.getElementById("timer-display");
//const startBtn = document.getElementById("start-btn");
//const stopBtn = document.getElementById("stop-btn");
const timeInput = document.getElementById("time-input");
const countdownCircle = document.querySelector(".countdown");
const hamburgerToggle = document.getElementById("hamburger-toggle");
const taskPanel = document.getElementById("task-panel");
const addTaskBtn = document.getElementById("add-task-btn");
const newTaskInput = document.getElementById("new-task-input");
const checklist = document.getElementById("checklist");
const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");
const scrollArrowContainer = document.querySelector('.scroll-arrow-container');
const alarmSound = new Audio('alarm.mp3');
alarmSound.loop = true;

let timer;
let isRunning = false;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let taskCounter = 1; // Reset counter to 1
let currentMode = "pomodoro"; // Default mode
let arrowPermanentlyHidden = false;
let pomodoroCount = 0;
let isBreakTime = false;

// Initial tasks
const initialTasks = [
    "Complete first Pomodoro",
    "Take a 5-minute break",
    "Review project notes",
    "Plan tomorrow's tasks"
];

// Initialize tasks
function initializeTasks() {
    initialTasks.forEach(task => {
        createTaskElement(task, taskCounter === 1); // Check the first task
        taskCounter++;
    });
}

// Create a new task element
function createTaskElement(taskText, isChecked = false) {
    // Create task item container
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${taskCounter}`;
    checkbox.value = taskCounter;
    checkbox.name = "r";
    checkbox.checked = isChecked;
    
    // Create label
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = taskText;
    
    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&#x2715;"; // X symbol
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", function() {
        taskItem.remove();
    });
    
    // Add event listener to the checkbox to show delete button
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            deleteBtn.style.opacity = "1";
        } else {
            deleteBtn.style.opacity = "0";
        }
    });
    
    // Set initial opacity based on checkbox state
    deleteBtn.style.opacity = isChecked ? "1" : "0";
    
    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteBtn);
    
    // Add to checklist
    checklist.appendChild(taskItem);
    
    return taskItem;
}

// Add new task functionality
function addNewTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        createTaskElement(taskText);
        newTaskInput.value = "";
        taskCounter++;
    }
}

addTaskBtn.addEventListener("click", addNewTask);
newTaskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addNewTask();
    }
});

// Toggle task panel
hamburgerToggle.addEventListener("change", function() {
    if (this.checked) {
        taskPanel.classList.add("open");
    } else {
        taskPanel.classList.remove("open");
    }
});

const toggleBtn = document.getElementById("toggle-btn");
const restartBtn = document.getElementById("restart-btn");
const toggleIcon = toggleBtn.querySelector("i");


function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play");
        
        // Play alarm sound on loop
        alarmSound.play().catch(error => {
            console.error('Error playing alarm sound:', error);
            // Fallback alert if sound fails
            alert("Time's up!");
        });
        
        // Add event listener to stop sound on mouse movement
        document.addEventListener('mousemove', stopAlarmSound);
        
        handleTimerCompletion();
        return;
    }
    
    if (isRunning) {
        timeLeft--;
        updateTimerDisplay();
        updateCircle();
    }
}

// function to handle completion logic
function handleTimerCompletion() {
    if (currentMode === "pomodoro") {
        pomodoroCount++;
        isBreakTime = true;
        
        if (pomodoroCount % 4 === 0) {
            // Every 4th pomodoro, long break
            currentMode = "longBreak";
            const longBreakTime = parseInt(longBreakInput.value, 10);
            setTimer(longBreakTime);
            alert("Great job! Take a long break!");
        } else {
            // Regular short break
            currentMode = "shortBreak";
            const shortBreakTime = parseInt(shortBreakInput.value, 10);
            setTimer(shortBreakTime);
            alert("Time for a short break!");
        }
    } else {
        // Break is over, back to pomodoro
        isBreakTime = false;
        currentMode = "pomodoro";
        const pomodoroTime = parseInt(timeInput.value, 10);
        setTimer(pomodoroTime);
        alert("Break's over! Time to focus!");
    }
    
    // Update UI to reflect current mode
    updateModeVisuals();
}

// Add this helper function to update UI
function updateModeVisuals() {
    body.classList.remove('pomodoro-mode', 'short-break-mode', 'long-break-mode');
    // Reset all button active states
    switch(currentMode) {
        case "pomodoro":
            body.classList.add('pomodoro-mode');
            pomodoroBtn.classList.add('active-mode');
            break;
        case "shortBreak":
            body.classList.add('short-break-mode');
            shortBreakBtn.classList.add('active-mode');
            break;
        case "longBreak":
            body.classList.add('long-break-mode');
            longBreakBtn.classList.add('active-mode');
            break;
    }
    // Update other button states
    pomodoroBtn.classList.remove('active-mode');
    shortBreakBtn.classList.remove('active-mode');
    longBreakBtn.classList.remove('active-mode');
}

function toggleTimer() {
    if (!isRunning) {
        // Start/resume timer
        isRunning = true;
        toggleIcon.classList.replace("fa-play", "fa-pause");
        totalTime = timeLeft === totalTime ? timeLeft : totalTime;
        timer = setInterval(updateTimer, 1000);
        
        // Set flag to permanently hide the arrow
        arrowPermanentlyHidden = true;
        scrollArrowContainer.classList.add('hidden');
    } else {
        // Pause timer
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play");
        clearInterval(timer);
    }
}

function resetTimer() {
    let newTime;
    
    switch (currentMode) {
        case "shortBreak":
            newTime = parseInt(shortBreakInput.value, 10);
            break;
        case "longBreak":
            newTime = parseInt(longBreakInput.value, 10);
            break;
        case "pomodoro":
        default:
            newTime = parseInt(timeInput.value, 10);
            break;
    }
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play"); // Reset icon to play
    }
    
    timeLeft = newTime * 60;
    totalTime = timeLeft;
    updateTimerDisplay();
    updateCircle();
    
}

// Update event listeners
toggleBtn.addEventListener("click", toggleTimer);
restartBtn.addEventListener("click", resetTimer);

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateCircle() {
    const circumference = 282.743;
    const offset = circumference - (timeLeft / totalTime) * circumference;
    countdownCircle.style.strokeDashoffset = offset;
}


switcher.addEventListener("change", () => {
    if (switcher.checked) {
        body.classList.add("light-mode");
    } else {
        body.classList.remove("light-mode");
    }
});

if (switcher.checked) {
    body.classList.add("light-mode");
} else {
    body.classList.remove("light-mode");
}

document.querySelector('.scroll-arrow-container').addEventListener('click', function() {
    const howToSection = document.querySelector('.how-to-section');
    howToSection.scrollIntoView({ behavior: 'smooth' });
});

// Function to update the tab title
function updateTabTitle(minutes, seconds) {
    document.title = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Modify the updateTimerDisplay function to include the tab title update
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
    // Update the tab title
    updateTabTitle(minutes, seconds);
}

// Function to reset the timer
function setTimer(newTime) {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play"); // Reset icon to play
    }
    timeLeft = newTime * 60; // Convert minutes to seconds
    totalTime = timeLeft; // Update total time
    updateTimerDisplay(); // Update the timer display
    updateCircle(); // Update the progress circle
    updateModeVisuals();
}

// Event listeners for the buttons
pomodoroBtn.addEventListener("click", () => {
    const pomodoroTime = parseInt(timeInput.value, 10);
    currentMode = "pomodoro";
    setTimer(pomodoroTime);
    updateModeVisuals();
});

shortBreakBtn.addEventListener("click", () => {
    const shortBreakTime = parseInt(shortBreakInput.value, 10);
    currentMode = "shortBreak";
    setTimer(shortBreakTime);
    updateModeVisuals();
});

longBreakBtn.addEventListener("click", () => {
    const longBreakTime = parseInt(longBreakInput.value, 10);
    currentMode = "longBreak";
    setTimer(longBreakTime);
    updateModeVisuals();
});

scrollArrowContainer.addEventListener('click', function() {
    const howToSection = document.querySelector('.how-to-section');
    howToSection.scrollIntoView({ behavior: 'smooth' });
    
    // Set flag to permanently hide the arrow
    arrowPermanentlyHidden = true;
    this.classList.add('hidden');
});

function manageScrollArrow() {
    // Only show arrow if it hasn't been permanently hidden
    if (!arrowPermanentlyHidden && window.scrollY === 0) {
        scrollArrowContainer.classList.remove('hidden');
    } else {
        scrollArrowContainer.classList.add('hidden');
    }
}

window.addEventListener('scroll', manageScrollArrow);
manageScrollArrow();

function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset sound to start
    
    // Remove the event listener after stopping the sound
    document.removeEventListener('mousemove', stopAlarmSound);
}