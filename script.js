const switcher = document.getElementById("theme-switch");
const body = document.body;
const timerDisplay = document.getElementById("timer-display");
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
let pomodoroCount = 0;
let isBreakTime = false;
let currentMode = "pomodoro";

// Initialize tasks
const initialTasks = [
    "Complete first Pomodoro",
    "Take a 5-minute break",
    "Review project notes",
    "Plan tomorrow's tasks"
];

function initializeTasks() {
    initialTasks.forEach(task => createTaskElement(task));
}

function createTaskElement(taskText) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    const label = document.createElement("label");
    label.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&#x2715;";
    deleteBtn.addEventListener("click", () => taskItem.remove());

    checkbox.addEventListener("change", () => {
        deleteBtn.style.opacity = checkbox.checked ? "1" : "0";
    });

    deleteBtn.style.opacity = "0";
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteBtn);
    
    checklist.appendChild(taskItem);
}

addTaskBtn.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        createTaskElement(taskText);
        newTaskInput.value = "";
    }
});

newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTaskBtn.click();
});

// Toggle task panel
hamburgerToggle.addEventListener("change", () => {
    taskPanel.classList.toggle("open", hamburgerToggle.checked);
});

const toggleBtn = document.getElementById("toggle-btn");
const restartBtn = document.getElementById("restart-btn");
const toggleIcon = toggleBtn.querySelector("i");

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play");

        // Play alarm
        alarmSound.play().catch(error => console.error('Error playing alarm sound:', error));

        handleTimerCompletion();
        return;
    }

    timeLeft--;
    updateTimerDisplay();
    updateCircle();
}

function handleTimerCompletion() {
    if (currentMode === "pomodoro") {
        pomodoroCount++;
        isBreakTime = true;

        if (pomodoroCount % 4 === 0) {
            currentMode = "longBreak";
            setTimer(parseInt(longBreakInput.value, 10) || 15);
            alert("Great job! Take a long break!");
        } else {
            currentMode = "shortBreak";
            setTimer(parseInt(shortBreakInput.value, 10) || 5);
            alert("Time for a short break!");
        }
    } else {
        currentMode = "pomodoro";
        setTimer(parseInt(timeInput.value, 10) || 25);
        alert("Break's over! Time to focus!");
    }

    updateModeVisuals();
    alarmSound.pause();
    alarmSound.currentTime = 0;
    isRunning = false;
    toggleTimer();
}

function updateModeVisuals() {
    body.classList.remove('pomodoro-mode', 'short-break-mode', 'long-break-mode');
    pomodoroBtn.classList.remove('active-mode');
    shortBreakBtn.classList.remove('active-mode');
    longBreakBtn.classList.remove('active-mode');

    switch (currentMode) {
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
}

function setTimer(minutes) {
    timeLeft = minutes * 60;
    totalTime = timeLeft;
    updateTimerDisplay();
    updateCircle();
}

function toggleTimer() {
    if (!isRunning) {
        isRunning = true;
        toggleIcon.classList.replace("fa-play", "fa-pause");
        timer = setInterval(updateTimer, 1000);
    } else {
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play");
        clearInterval(timer);
    }
}

function resetTimer() {
    let newTime;
    
    switch (currentMode) {
        case "shortBreak":
            newTime = parseInt(shortBreakInput.value, 10) || 5;
            break;
        case "longBreak":
            newTime = parseInt(longBreakInput.value, 10) || 15;
            break;
        default:
            newTime = parseInt(timeInput.value, 10) || 25;
            break;
    }

    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        toggleIcon.classList.replace("fa-pause", "fa-play");
    }
    
    setTimer(newTime);
}

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
    body.classList.toggle("light-mode", switcher.checked);
});

document.querySelector('.scroll-arrow-container').addEventListener('click', () => {
    document.querySelector('.how-to-section').scrollIntoView({ behavior: 'smooth' });
});

function updateTabTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds < 10 ? '0' + seconds : seconds} - Pomodoro Timer`;
}

initializeTasks();
