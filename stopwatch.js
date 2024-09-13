//Collecting Data
var clock = document.getElementById("clock");
var displayhrs = document.getElementById("hours");
var displaymins = document.getElementById("minutes");
var displaysecs = document.getElementById("seconds");
var displayms = document.getElementById("milliseconds");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var lapBtn = document.getElementById("lapBtn");
var resetBtn = document.getElementById("resetBtn");
var lapList = document.getElementById("lapList");
//Timer
var timer;
var isRunning = false;
var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var lapCount = 1;
var previousLapTime = 0;
function startTimer() {
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    lapBtn.removeAttribute("style");
    stopBtn.removeAttribute("style");
    startBtn.setAttribute("style", "display: none");
    resetBtn.setAttribute("style", "display: none");
}
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    stopBtn.setAttribute("style", "display: none");
    lapBtn.setAttribute("style", "display: none");
    resetBtn.removeAttribute("style");
    startBtn.removeAttribute("style");
}
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateClock();
    resetBtn.setAttribute("style", "display: none");
    clearLap();
}
function lapTimer() {
    lapList.removeAttribute("style");
    var currentTime = convertToMilliseconds(hours, minutes, seconds, milliseconds);
    var lapItem = document.createElement("tr");
    lapItem.innerHTML = `<td>Lap ${pad(lapCount)}</td><td>${formatTime(currentTime)}</td><td>${formatTime(currentTime - previousLapTime)}</td>`;
    var tableBody = document.getElementById("tableBody");
    tableBody.prepend(lapItem);
    lapCount++;
    previousLapTime = currentTime;
}
function clearLap() {
    tableBody.innerHTML = "";
    lapCount = 1;
    previousLapTime = 0;
    lapList.setAttribute("style", "display: none");
}
function updateClock() {
    displayhrs.innerText = pad(hours);
    displaymins.innerText = pad(minutes);
    displaysecs.innerText = pad(seconds);
    displayms.innerText = pad(milliseconds);
}

function updateDisplay() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateClock();
}
function pad(value) {
    return value < 10 ? "0" + value : value;
}

function convertToMilliseconds(hours, minutes, seconds, milliseconds){
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
}

function formatTime(timestamp) {
    let formattedHours = Math.floor(timestamp / (1000 * 60 * 60));
    let formattedMinutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
    let formattedSeconds = Math.floor((timestamp % (1000 * 60)) / 1000);
    let formattedMilliseconds = Math.floor((timestamp % 1000) / 10);
    return (pad(formattedHours) + ":" + pad(formattedMinutes) + ":" + pad(formattedSeconds) + ":" + pad(formattedMilliseconds));
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", lapTimer);