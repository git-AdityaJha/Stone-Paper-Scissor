const stone = document.querySelector(".stone");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const reset = document.querySelector(".reset");
const resultElement = document.querySelector(".result");

const winsElement = document.querySelector(".wins");
const lossesElement = document.querySelector(".losses");
const tiesElement = document.querySelector(".ties");
const youElement = document.querySelector(".you");
const computerElement = document.querySelector(".comp");

let scoreBoard = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

function computerMove() {
  let random = Math.floor(Math.random() * 3) + 1;
  let computer = "";

  if (random === 1) computer = "Stone";
  else if (random === 2) computer = "Paper";
  else computer = "Scissor";

  return computer;
}

function showScore(){
  winsElement.innerHTML = `Wins: ${scoreBoard.Wins}`;
  lossesElement.innerHTML = `Losses: ${scoreBoard.Losses}`;
  tiesElement.innerHTML = `Ties: ${scoreBoard.Ties}`;
}

showScore();

function playGame(playerMove) {
  let computer = computerMove();
  let result = "";

  if (computer === "Stone") {
    if (playerMove === "Paper") result = "You win";
    else if (playerMove === "Scissor") result = "You lose";
    else result = "Tie";
  } 
  else if (computer === "Paper") {
    if (playerMove === "Stone") result = "You lose";
    else if (playerMove === "Scissor") result = "You win";
    else result = "Tie";
  } 
  else {
    if (playerMove === "Stone") result = "You win";
    else if (playerMove === "Paper") result = "You lose";
    else result = "Tie";
  }

  //Update score board :
  if (result === "You win") scoreBoard.Wins++;
  else if (result === "You lose") scoreBoard.Losses++;
  else scoreBoard.Ties++;

  localStorage.setItem("score", JSON.stringify(scoreBoard)); //localStorage takes string to save data.

  // Setting emoticons to player's move :
  if (playerMove === "Stone") playerMove = "✊";
  else if (playerMove === "Paper") playerMove = "🖐️";
  else playerMove = "✌️";
  // Setting emoticons to computer's move :
  if (computer === "Stone") computer = "✊";
  else if (computer === "Paper") computer = "🖐️";
  else computer = "✌️";

  // Showing result on screen:
  resultElement.innerHTML = `${result}`;
  youElement.innerHTML = `You : ${playerMove}`;
  computerElement.innerHTML = `Computer : ${computer}`;

  showScore();
}

stone.addEventListener("click", () => {
  playGame("Stone");
});

paper.addEventListener("click", () => {
  playGame("Paper");
});

scissor.addEventListener("click", () => {
  playGame("Scissor");
});

reset.addEventListener("click", () => {
  scoreBoard.Wins = 0;
  scoreBoard.Losses = 0;
  scoreBoard.Ties = 0;

  // We need to remove the score from localStorage so that it resets the score in the localStorage after we click reset button. Otherwise it will just grab the previous values again. And we do not want that.

  localStorage.removeItem("score");

  resultElement.innerHTML = `Result`;
  youElement.innerHTML = `You : ✊`;
  computerElement.innerHTML = `Computer : ✊`;
  showScore();
});