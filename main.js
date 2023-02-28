// CONST
const startContainer = document.getElementById("quiz-start");
const startBtn = document.getElementById("quiz-start__btn");

const quizContainer = document.getElementById("quiz-container");
const quizClose = document.getElementById("quiz-container__close");
const progressBar = document.getElementById("quiz-container__progressbar");
const questionIndicatorEl = document.getElementById(
  "quiz-container__indicator"
);
const questionEl = document.getElementById("quiz-container__question");
const optionsContainer = document.getElementById("quiz-container__options");
const nextBtn = document.getElementById("quiz-container__btn-next");

const resultContainer = document.getElementById("quiz-result");
const passAgainBtn = document.getElementById("quiz-result__btn-pass");

let currentQuestionIndex = 0;
let correctCount = 0;

quizContainer.classList.add("hide");
resultContainer.classList.add("hide");

// LISTENERS
startBtn.addEventListener("click", handleStartButtonClick);
nextBtn.addEventListener("click", handleNextButtonClick);
passAgainBtn.addEventListener("click", redirectToIndex);
quizClose.addEventListener("click", redirectToIndex);

// FUNCTIONS
//обработка нажатие кнопки "Let's go!"
function handleStartButtonClick() {
  startContainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  showQuestion();
}

//отображаем текущий вопрос в тесте
function showQuestion() {
  const question = questions[currentQuestionIndex];
  console.log("> showQuestion -> question", question);

  questionIndicatorEl.textContent = `${currentQuestionIndex + 1}/${
    questions.length
  }`;
  console.log("> showQuestion ->  questionIndicatorEl", questionIndicatorEl);
  const progress = (currentQuestionIndex / questions.length) * 100;
  console.log("> showQuestion -> progress", progress);
  progressBar.style.width = progress + 20 + "%";
  console.log("> showQuestion -> progressBar", progressBar);
  questionEl.textContent = question.question;

  optionsContainer.innerHTML = "";

  for (let option of question.options) {
    const optionEl = document.createElement("button");
    optionEl.classList.add("option");

    const optionImgEl = document.createElement("img");
    optionImgEl.src = option.image;
    optionEl.appendChild(optionImgEl);

    const optionTextEl = document.createElement("span");
    optionTextEl.textContent = option.text;
    optionEl.appendChild(optionTextEl);

    optionsContainer.appendChild(optionEl);
    optionEl.addEventListener("click", handleAnswer);
  }

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Result";
  }
}

//обрабатываем ответ
function handleAnswer(e) {
  const selectedOption = e.target;
  console.log("> handleAnswer -> selectedOption", selectedOption);
  const selectedAnswer = selectedOption.textContent;
  console.log("> handleAnswer -> selectedAnswer", selectedAnswer);
  const question = questions[currentQuestionIndex];
  console.log("> handleAnswer -> question", question);

  if (selectedAnswer === question.answer) {
    correctCount++;
  }

  for (let optionEl of optionsContainer.children) {
    optionEl.classList.remove("selected");
  }

  selectedOption.classList.add("selected");
}

//обработка нажатие кнопки "Next"
function handleNextButtonClick() {
  const selectedOption = optionsContainer.querySelector(".selected");

  if (selectedOption) {
    nextBtn.classList.remove("disabled");
  } else {
    nextBtn.classList.add("disabled");
    alert("Choose the answer!");
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

//изменяем контент отображения на странице результата в зависимости от набранных баллов
function createResultText() {
  const resultImgEl = document.createElement("img");
  resultImgEl.classList.add("quiz-result__img");
  resultContainer.appendChild(resultImgEl);

  const resultTextEl = document.createElement("p");
  resultContainer.appendChild(resultTextEl);

  if (correctCount === 0) {
    resultImgEl.src = "./img/sad.png";
    resultTextEl.innerHTML = `<span>Try again...  </span>${correctCount} / ${questions.length} answers are correct`;
  } else if (correctCount >= 1 && correctCount < 4) {
    resultImgEl.src = "./img/fun.png";
    resultTextEl.innerHTML = `<span>Well done..  </span>${correctCount} / ${questions.length} answers are correct`;
  } else if (correctCount === 5) {
    resultImgEl.src = "./img/clapping.png";
    resultTextEl.innerHTML = `<span>High five!... </span>${correctCount} / ${questions.length} answers are correct`;
  }

  resultContainer.appendChild(passAgainBtn);
}

//показываем результат
function showResults() {
  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");

  createResultText();
}

//перенаправляем на стартовую страницу
function redirectToIndex() {
  location.href = "index.html";
}
