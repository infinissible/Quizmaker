var questionsArray = [
  {
    question: "What is not a primitive data type?",
    choices: ["string", "array", "number", "boolean"],
    answer: "array",
  },
  {
    question:
      'Given the following array cars = ["Tesla","Toyota","Ford", "KIA"], what is element at the second index ',
    choices: ["Tesla", "Toyota", "Ford", "KIA"],
    answer: "Ford",
  },
  {
    question:
      'Given the following comparison operator 50 === "50", what is the expected outcome?',
    choices: ["true", "false", "undefined", "null"],
    answer: "true",
  },
  {
    question: "Which method adds a value as the last element in an array",
    choices: ["length", "slice", "random", "push"],
    answer: "push",
  },
];
var timerTarget;

var quizBtn = document.getElementById("quiz-button");
var quizContainer = document.querySelector("#quiz-container");
var timer = document.querySelector("#time");
var quizTime = questionsArray.length * 15;
timer.textContent = quizTime;

var currentQuestionIndex = 0;
function startQuiz() {
  timerTarget = setInterval(startTimer, 1000);
  generateQuestion();
}

function startTimer() {
  quizTime--;
  timer.textContent = quizTime;
}

function endGame() {
  if (currentQuestionIndex >= questionsArray.length - 1) {
    quizContainer.innerHTML = "Quiz Over";
    clearInterval(timerTarget);
    return;
  } else {
    generateQuestion();
  }
}

function generateQuestion() {
  console.log(currentQuestionIndex);

  var quizQuestion = document.createElement("paragraph");
  quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
  var createOrderedList = document.createElement("ol");
  for (
    var i = 0;
    i < questionsArray[currentQuestionIndex].choices.length;
    i++
  ) {
    var currentChoice = document.createElement("li");
    currentChoice.textContent = questionsArray[currentQuestionIndex].choices[i];
    createOrderedList.append(currentChoice);
  }
  quizContainer.append(quizQuestion);
  quizContainer.append(createOrderedList);
}

function checkAnswer(event) {
  currentQuestionIndex++;
  var currentAnswer = event.target.textContent;
  if (currentAnswer === questionsArray[currentQuestionIndex].answer) {
    quizContainer.innerHTML = "you are correct";
    quizContainer.innerHTML = "";
    endGame();
  } else {
    quizTime -= 5;
    quizContainer.innerHTML = "";
    endGame();
  }
}

quizBtn.addEventListener("click", startQuiz);
quizContainer.addEventListener("click", checkAnswer);
