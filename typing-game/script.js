const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

text.focus();

// Initialize
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const timeInterval = setInterval(updateTime, 1000);

// Function: add word to DOM
function addWordToDom() {
  randomWord = getRandomWords();
  word.innerHTML = randomWord;
}

// Function: get random words
function getRandomWords() {
  return words[Math.floor(Math.random() * words.length)];
}

// Function: Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Function: update time
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Function: game over
function gameOver() {
  endgameEl.innerHTML = `
  <h1>TIme ran out</h1>
  <p>You final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

// function countDown() {
//   if (time === 0) {
//     endgameEl.innerHTML = `
//   <h1>TIme ran out</h1>
//   <p>You final score id ${score}</p>
//   <button onclick="location.reload()">Reload</button>`;

//     endgameEl.style.display = "flex";
//     clearInterval(timeInterval);
//   } else {
//     const timeInterval = setInterval(() => {
//       time--;
//       timeEl.innerText = `${time}s`;
//     }, 1000);
//   }
// }

addWordToDom();
// countDown();

// Event listener
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

// Setting button
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
