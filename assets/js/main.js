const quizData = [
  {
    question: "O'zbekiston poytaxti qayer?",
    options: ["Toshkent", "Samarkand", "Buxoro", "Nukus"],
    answer: "Toshkent",
  },
  {
    question: "O'zbekistonda nechta viloyat bor?",
    options: ["12", "13", "14", "15"],
    answer: "12",
  },
  {
    question: "Xorazm viloyati qayerda joylashgan?",
    options: [
      "O'zbekiston sharqida",
      "O'zbekiston g'arbiyida",
      "O'zbekiston janubida",
      "O'zbekiston shimolidida",
    ],
    answer: "O'zbekiston g'arbiyida",
  },
  {
    question: "O'zbek tilining alifbosida nechta harf bor?",
    options: ["25", "26", "27", "33"],
    answer: "33",
  },
  {
    question: "O'zbekiston prezidenti kim?",
    options: [
      "Shavkat Mirziyoyev",
      "Islam Karimov",
      "Abdulla Aripov",
      "Ravshan Irmatov",
    ],
    answer: "Shavkat Mirziyoyev",
  },
  {
    question: "O'zbekiston pul birligi qaysi?",
    options: ["So'm", "Tenge", "UZS", "Dollar"],
    answer: "UZS",
  },
  {
    question: "O'zbekiston konstitutsiyasi qachon qabul qilingan?",
    options: ["1991", "1992", "1993", "1994"],
    answer: "1992",
  },
  {
    question: "O'zbek xalq ertaklari qanday ataladi?",
    options: ["Maqom", "Makom", "Muqam", "Mug'am"],
    answer: "Maqom",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong >Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong class="text-green">Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
