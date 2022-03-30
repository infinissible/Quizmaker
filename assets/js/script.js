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
var scores = [];
var scoreIdCounter = 0;

var mainContainer = document.querySelector("#main");
var quizBtn = document.getElementById("quiz-button");
var quizContainer = document.querySelector("#quiz-container");
var timer = document.querySelector("#time");
var quizTime = questionsArray.length * 45;
timer.textContent = quizTime;

var currentQuestionIndex = 0;
var mainContainerText = document.querySelector("#main-text");
var headerText = document.querySelector("#header");

function startQuiz() {
  // debugger;
  mainContainerText.textContent = "";
  timerTarget = setInterval(startTimer, 1000);
  // quizTime = questionsArray.length * 15;
  generateQuestion();
  
}

function startTimer() {
  quizTime--;
  if (quizTime < 0) {
    quizContainer.innerHTML = "The Game Is Over";
    clearInterval(timerTarget);    
    return;  
  }
  timer.textContent = quizTime;
}

var storeRecord = function() {
  var input = document.getElementById("input-value").value;    
  localStorage.setItem("scores", scores);  
  

  var scoreListEl = document.createElement("ol");
  var listItemEl = document.createElement("li");
  listItemEl.setAttribute("list-id", scoreIdCounter);
  scoreListEl.append(listItemEl);
  mainContainer.append(scoreListEl);
  listItemEl.textContent = scores[scoreIdCounter];
  
  var scoreList = {
    name: input,
    score: quizTime
  };

  scoreList.id = scoreIdCounter;
  scores.push(scoreList);
  scoreIdCounter++;

  // for (var i = 0; i < scores.length; i++) {
  //   if (scores[i].id === parseInt(scoreList.Id)) {
  //     tasks[i].name = taskName;
  //     tasks[i].type = taskType;
  //   }
} 

var scorePage = function() {
  mainContainer.innerHTML = "";
  var scorePageTitle = document.createElement("h2");
  var scorePageText = document.createElement("p");
  var enterInitials = document.createElement("p");
  var inputInitials = document.createElement("input");
  inputInitials.setAttribute("type", "text"); 
  inputInitials.setAttribute("id", "input-value");
  inputInitials.setAttribute("name", "input-name");
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type","submit");

  scorePageTitle.textContent = "All done!";
  scorePageText.textContent = ["Your final score is" + quizTime + "."];
  enterInitials.textContent = "Enter initials:";
  submitButton.textContent = "Submit";

  mainContainer.append(scorePageTitle);
  mainContainer.append(scorePageText);
  mainContainer.append(enterInitials);
  mainContainer.append(inputInitials);
  mainContainer.append(submitButton);

  submitButton.addEventListener("click", storeRecord);
  submitButton.addEventListener("click", highScores);
}

// var clearScoreList = function() {
//   var deletedList = [];
// }

var highScores = function() {
  mainContainer.innerHTML = "";
  headerText.textContent = "";
  var scorePageTitle = document.createElement("h2");  
  var goBackButton = document.createElement("button");
  goBackButton.setAttribute("goBackBtn","");
  var clearButton = document.createElement("button");
  clearButton.setAttribute("clearBtn", "");

  scorePageTitle.textContent = "High scores"; 
 
  goBackButton.textContent = "Go back";
  clearButton.textContent = "Clear high scores";

  mainContainer.append(scorePageTitle);
  mainContainer.append(goBackButton);
  mainContainer.append(clearButton);

  goBackButton.addEventListener("click", function(){location.reload()});
  clearButton.addEventListener("click", function(){localStorage.clear()});
}

function endGame() {
  if (currentQuestionIndex === questionsArray.length) { 
    // quizContainer.innerHTML = "Quiz Over";
    clearInterval(timerTarget);
    scorePage();
    return;
  } else {
    generateQuestion();    
  }  
  // timer.textContent = quizTime;
}

function generateQuestion() {
  
  var quizQuestion = document.createElement("paragraph");
  quizQuestion.textContent = questionsArray[currentQuestionIndex].question;

  var createOrderedList = document.createElement("ol");

  for (var i = 0; i < questionsArray[currentQuestionIndex].choices.length; i++) {
    var currentChoice = document.createElement("li");
    currentChoice.textContent = questionsArray[currentQuestionIndex].choices[i];
    createOrderedList.append(currentChoice);    
  }  
  quizContainer.append(quizQuestion);
  quizContainer.append(createOrderedList);
}

var correctOrWrong = function() {
  var answerTextFading = setTimeout(function (){
  answerText.textContent="";}, 2000);
  answerTextFading;
}
var answerText = document.createElement("p"); 

function checkAnswer(event) {
  currentQuestionIndex++;
  var currentAnswer = event.target.textContent;  
    
  if (currentAnswer === questionsArray[currentQuestionIndex-1].answer) {
    answerText.textContent = "Correct!";
    quizContainer.innerHTML = "";
    mainContainer.append(answerText);  
    correctOrWrong();    
    endGame();     
  } else {
    quizTime -= 5;
    answerText.textContent = "Wrong!"
    quizContainer.innerHTML = "";
    mainContainer.append(answerText);
    correctOrWrong();
    endGame();    
  }  
}

quizBtn.addEventListener("click", startQuiz);
quizContainer.addEventListener("click", checkAnswer);