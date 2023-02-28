// CONST
const startContainer = document.getElementById("quiz-start");
const startBtn = document.getElementById("quiz-start__btn");

const mainContainer = document.getElementById("quiz-container");
const mainClose = document.getElementById("quiz-container__close");
const mainProgressBar = document.getElementById("quiz-container__progressbar");
const mainQuestionIndicator = document.getElementById(
  "quiz-container__indicator"
);
const mainQuestion = document.getElementById("quiz-container__question");
const mainOptions = document.getElementById("quiz-container__options");
const nextBtn = document.getElementById("quiz-container__btn-next");

const resultContainer = document.getElementById("quiz-result");
const startOverBtn = document.getElementById("quiz-result__btn-pass");

let currentQuestionIndex = 0;
let correctCount = 0;

mainContainer.classList.add("hide");
resultContainer.classList.add("hide");

// LISTENERS
startBtn.addEventListener("click", handleStartButtonClick);
nextBtn.addEventListener("click", handleNextButtonClick);
startOverBtn.addEventListener("click", redirectToIndex);
mainClose.addEventListener("click", redirectToIndex);

// FUNCTIONS
//обработка нажатие кнопки "Let's go!"
function handleStartButtonClick() {
  startContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  showQuestion();
}

//отображаем текущий вопрос в тесте
function showQuestion() {
  const question = questions[currentQuestionIndex];
  console.log("> showQuestion -> question", question);

  mainQuestionIndicator.textContent = `${currentQuestionIndex + 1}/${
    questions.length
  }`;
  console.log(
    "> showQuestion ->  mainQuestionIndicator",
    mainQuestionIndicator
  );
  const mainProgress = (currentQuestionIndex / questions.length) * 100;
  console.log("> showQuestion -> mainProgress", mainProgress);
  mainProgressBar.style.width = mainProgress + 20 + "%";
  console.log("> showQuestion -> mainProgressBar", mainProgressBar);
  mainQuestion.textContent = question.question;

  mainOptions.innerHTML = "";

  for (let option of question.options) {
    const optionButton = document.createElement("button");
    optionButton.classList.add("option");

    const optionImg = document.createElement("img");
    optionImg.src = option.image;
    optionButton.appendChild(optionImg);

    const optionText = document.createElement("span");
    optionText.textContent = option.text;
    optionButton.appendChild(optionText);

    mainOptions.appendChild(optionButton);
    optionButton.addEventListener("click", handleAnswer);
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

  for (let optionButton of mainOptions.children) {
    optionButton.classList.remove("selected");
  }

  selectedOption.classList.add("selected");
}

//обработка нажатие кнопки "Next"
function handleNextButtonClick() {
  const selectedOption = mainOptions.querySelector(".selected");

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
  const resultImg = document.createElement("img");
  resultImg.classList.add("quiz-result__img");
  resultContainer.appendChild(resultImg);

  const resultText = document.createElement("p");
  resultContainer.appendChild(resultText);

  if (correctCount === 0) {
    resultImg.src = "./img/sad.png";
    resultText.innerHTML = `<span>Try again...  </span>${correctCount} / ${questions.length} answers are correct`;
  } else if (correctCount >= 1 && correctCount < 4) {
    resultImg.src = "./img/fun.png";
    resultText.innerHTML = `<span>Well done..  </span>${correctCount} / ${questions.length} answers are correct`;
  } else if (correctCount === 5) {
    resultImg.src = "./img/clapping.png";
    resultText.innerHTML = `<span>High five!... </span>${correctCount} / ${questions.length} answers are correct`;
  }

  resultContainer.appendChild(startOverBtn);
}

//показываем результат
function showResults() {
  mainContainer.classList.add("hide");
  resultContainer.classList.remove("hide");

  createResultText();
}

//перенаправляем на стартовую страницу
function redirectToIndex() {
  location.href = "index.html";
}
