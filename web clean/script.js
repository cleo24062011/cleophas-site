const questions = [
  { fr: "chat", answer: "cat", choices: ["cat", "dog", "bird"] },
  { fr: "maison", answer: "house", choices: ["car", "house", "tree"] },
  { fr: "merci", answer: "thank you", choices: ["hello", "thank you", "goodbye"] },
  { fr: "livre", answer: "book", choices: ["pen", "book", "table"] },
  { fr: "eau", answer: "water", choices: ["milk", "water", "juice"] }
];

let current = 0;
let selected = null;
let score = 0;
let streak = 0;
let hearts = 3;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const validateBtn = document.getElementById("validateBtn");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const streakEl = document.getElementById("streak");
const heartsEl = document.getElementById("hearts");

function updateHud() {
  streakEl.textContent = String(streak);
  heartsEl.textContent = hearts > 0 ? "❤️".repeat(hearts) : "💔";
  progressFill.style.width = `${(score / questions.length) * 100}%`;
  progressText.textContent = `${score} / ${questions.length} bonnes réponses`;
}

function renderQuestion() {
  const q = questions[current];
  selected = null;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  validateBtn.disabled = true;
  nextBtn.disabled = true;

  questionEl.textContent = q.fr;
  choicesEl.innerHTML = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".choice-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selected = choice;
      validateBtn.disabled = false;
    });

    choicesEl.appendChild(btn);
  });
}

function endGame() {
  questionEl.textContent = hearts > 0 ? "Bravo 🎉" : "Leçon terminée";
  choicesEl.innerHTML = "";
  validateBtn.disabled = true;
  nextBtn.disabled = true;

  feedbackEl.textContent = hearts > 0
    ? `Tu as réussi ${score} / ${questions.length} réponses.`
    : `Plus de vies. Score final : ${score} / ${questions.length}.`;
  feedbackEl.className = `feedback ${hearts > 0 ? "ok" : "bad"}`;
}

validateBtn.addEventListener("click", () => {
  const q = questions[current];
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach((btn) => {
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    }
    if (selected === btn.textContent && selected !== q.answer) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (selected === q.answer) {
    feedbackEl.textContent = "Correct ! ✅";
    feedbackEl.className = "feedback ok";
    score += 1;
    streak += 1;
  } else {
    feedbackEl.textContent = `Oups ! La bonne réponse était "${q.answer}".`;
    feedbackEl.className = "feedback bad";
    streak = 0;
    hearts -= 1;
  }

  updateHud();
  validateBtn.disabled = true;

  if (hearts <= 0 || current >= questions.length - 1) {
    nextBtn.textContent = "Voir résultat";
  }

  nextBtn.disabled = false;
});

nextBtn.addEventListener("click", () => {
  if (hearts <= 0 || current >= questions.length - 1) {
    endGame();
    return;
  }

  current += 1;
  renderQuestion();
});

renderQuestion();
updateHud();
