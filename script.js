let rounds = 3;
let currentRound = 1;
let playerScore = 0;
let computerScore = 0;
let difficulty = 'medium';
let timer;

// Adding audio elements
const clickSound = new Audio('assets/click.mp3');
const winSound = new Audio('assets/win.mp3');
const loseSound = new Audio('assets/lose.mp3');
const tieSound = new Audio('assets/tie.mp3');
const gameOverSound = new Audio('assets/game-over.mp3');

function startGame() {
  document.getElementById('home-container').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  document.getElementById('score').innerText = `Score: ${playerScore} - ${computerScore}`;
  startTimer();
  playSound(clickSound);
}


function playGame(userChoice) {
  clearInterval(timer);
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = (difficulty === 'easy') ? choices[Math.floor(Math.random() * choices.length)] : getComputerChoice(userChoice);

  const result = determineWinner(userChoice, computerChoice);

  document.getElementById('result').innerText = `Round ${currentRound}: You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;
  updateScore(result);

  currentRound++;

  if (currentRound > rounds) {
    endGame();
  } else {
    startTimer();
  }
}

function determineWinner(userChoice, computerChoice) {
  let result;
  if (userChoice === computerChoice) {
    result = 'It\'s a tie!';
    playSound(tieSound);
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result = 'You win!';
    playSound(winSound);
  } else {
    result = 'You lose!';
    playSound(loseSound);
  }
  return result;
}

function updateScore(result) {
  if (result.includes('win')) {
    playerScore++;
  } else if (result.includes('lose')) {
    computerScore++;
  }
  document.getElementById('score').innerText = `Score: ${playerScore} - ${computerScore}`;
}

function startTimer() {
  let timeLeft = 10;
  timer = setInterval(function() {
    document.getElementById('time-left').innerText = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      playGame(getRandomChoice());
    }
  }, 1000);
}

function endGame() {
  playSound(gameOverSound);
  alert(`Game Over! Final Score: ${playerScore} - ${computerScore}`);
  resetGame();
}

function resetGame() {
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;
  document.getElementById('home-container').style.display = 'block';
  document.getElementById('game-container').style.display = 'none';
  clearInterval(timer);
  document.getElementById('time-left').innerText = '10';
  document.getElementById('score').innerText = 'Score: 0 - 0';
}

function getComputerChoice(playerChoice) {
  // Custom logic for computer's choice based on difficulty
  // For simplicity, the hard difficulty always chooses the winning option
  const choices = ['rock', 'paper', 'scissors'];
  if (difficulty === 'hard') {
    return choices[(choices.indexOf(playerChoice) + 1) % 3];
  } else {
    return choices[Math.floor(Math.random() * choices.length)];
  }
}

function getRandomChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
