//Dom elements 
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const gameOverContainer = document.getElementById("game-over");
const saveScoreButton = document.getElementById("save-score");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score-value");
const initialsInput = document.getElementById("initials");

startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveScore);

let currentQuestionIndex;
let timeLeft;
let timerInterval;
let userAnswers;
let score;
//questions zipped up
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 3,
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 3,
  },
  {
    question: 'Arrays in JavaScript can be used to store ____.',
    choices: ['numbers and strings',
     'other arrays', 
     'booleans', 
     'All of the above'],
    answer: 4,
  },
  {
    question: 'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 3,
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 4,
  },
];
//start button 
function startQuiz() {
    startButton.style.display="none"
  currentQuestionIndex = 0;
  timeLeft = 60;
  userAnswers = [];

  startTimer();
  displayQuestion();
  showQuizContainer();
}
//start timer once start button clicked
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = timeLeft + " seconds";

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}
//display question and look at choices and which is the correct answer
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
// for loop to go through the question length which is 5 questions
  for (let i = 0; i < 4; i++) {
    const choice = currentQuestion.choices[i];
    const li = document.createElement("li");
    li.textContent = choice;
    li.setAttribute("data-index", i + 1);
    li.addEventListener("click", handleAnswer);
    choicesElement.appendChild(li);
  }
}
function handleAnswer(event) {
    const selectedChoice = event.target;
    const selectedAnswerIndex = parseInt(selectedChoice.getAttribute("data-index"));
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
  
    userAnswers.push(selectedAnswerIndex);
  
    if (selectedAnswerIndex === correctAnswer) {
      console.log("Correct answer");
    } else {
      console.log("Incorrect answer");
      timeLeft -= 20;
    }
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  //end quiz 
  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    initialsInput.focus();
    scoreElement.textContent = score;
  }
  // taking initials from the input value and trim the white space so we just get the "actual value/ initials"
  function saveScore() {
    const initials = initialsInput.value.trim();
  
    // Validate initials
    if (initials === "") {
      alert("Please enter your initials.");
      initialsInput.focus();
      return;
    }
    resetQuiz();
  }
  //reset quiz...look into how to add a percent score
  function resetQuiz() {
    initialsInput.value = "";
    gameOverContainer.style.display = "none";
    startButton.style.display = "block";
    timeLeft = 60;
    score = 0;
  }
