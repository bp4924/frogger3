const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const endSquare = document.getElementsByClassName("ending-block");

const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");

const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

const width = 9;
const rows = squares.length / width;
let currentIndex = squares.length - 5;
let timerId;
let countdown = 20;
let moveCount = 0;

let currentDate = new Date();
let time = currentDate.getSeconds();
console.log(time);

function moveFrog(e) {
  moveCount++;
  squares[currentIndex].classList.remove("frog");
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width === 0) {
        console.log("cannot move left");
        moveCount--;
      } else {
        console.log("moved left");
        currentIndex--;
      }
      break;
    case "ArrowRight":
      if ((currentIndex + 1) % width === 0) {
        console.log("cannot move right");
        moveCount--;
      } else {
        console.log("moved right");
        currentIndex++;
      }
      break;
    case "ArrowUp":
      if (currentIndex - width > -1) {
        console.log("moved up");
        currentIndex = currentIndex - width;
      } else {
        console.log("at top");
        moveCount--;
      }
      break;
    case "ArrowDown":
      if (currentIndex + width < squares.length) {
        currentIndex = currentIndex + width;
        console.log("moved down");
      } else {
        console.log("at bottom");
        moveCount--;
      }
      break;
  }
  squares[currentIndex].classList.add("frog");
  resultDisplay.innerHTML = moveCount;

  checkStatus();
}

startPauseButton.addEventListener("click", startPause);

// motion
function autoMoveElements() {
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  countdown--;
  checkStatus();
  timer();
}

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c4");
      break;
    case carLeft.classList.contains("c4"):
      carLeft.classList.remove("c4");
      carLeft.classList.add("c5");
      break;
    case carLeft.classList.contains("c5"):
      carLeft.classList.remove("c5");
      carLeft.classList.add("c1");
      break;
  }
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c5");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    case carRight.classList.contains("c4"):
      carRight.classList.remove("c4");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c5"):
      carRight.classList.remove("c5");
      carRight.classList.add("c4");
      break;
  }
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}

function loser() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("c2") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    countdown === 0
  ) {
    resultDisplay.innerHTML = "You Lose  &#128554";
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
    squares[currentIndex].classList.remove("frog");
    startPauseButton.innerHTML = "Play Again";
  }
}

//Winner function
function winner() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = `You Win!! ${moveCount} moves`;
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
    startPauseButton.innerHTML = "Play Again";
  }
}

function timer() {
  if (countdown < 6) {
    timeLeftDisplay.style.color = "red";
  }
  timeLeftDisplay.textContent--;
  currentDate = new Date();
  time = 60 - currentDate.getSeconds();
}

function checkStatus() {
  winner();
  loser();
  console.log(countdown);
  console.log(time);
}

function startPause() {
  if (startPauseButton.innerHTML == "Pause") {
    startPauseButton.innerHTML = "Start";
    document.removeEventListener("keyup", moveFrog);
    clearInterval(timerId);
  } else if (startPauseButton.innerHTML == "Play Again") {
    currentIndex = squares.length - 5;
    countdown = 20;
    moveCount = 0;
    console.log("restart");
    startGame();
  } else {
    startGame();
  }
  checkStatus();
  timer();
}

function startGame() {
  squares[4].classList.remove("frog");

  startPauseButton.innerHTML = "Pause";
  document.addEventListener("keyup", moveFrog);
  timerId = setInterval(autoMoveElements, 1000);
  timeLeftDisplay.textContent = countdown + 1;
  resultDisplay.textContent = moveCount;

  squares[currentIndex].classList.add("frog");
}
