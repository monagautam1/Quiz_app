const questions=[
    {
        question: "Which is largest animal in the world?",
        answers:[
            {text: "Shark", Correct: false},
            {text: "Blue Whale", Correct: true},
            {text: "Elephant", Correct: false},
            {text: "Giraffe", Correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers:[
            {text: "Vatican City", Correct: true},
            {text: "Bhutan", Correct: false},
            {text: "Nepal", Correct: false},
            {text: "Shri Lanka", Correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers:[
            {text: "Kalahari", Correct: false},
            {text: "Gobi", Correct: false},
            {text: "ESahara", Correct: false},
            {text: "Antractica", Correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", Correct: false},
            {text: "Australlia", Correct: true},
            {text: "Arctic", Correct: false},
            {text: "Africa", Correct: false},
        ]
    }
    
];
const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex +1;
    questionElement.innerHTML=questionNo + ". "+ currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.Correct){
            button.dataset.Correct=answer.Correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.Correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.Correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
if(currentQuestionIndex < questions.length){
    handleNextButton();
}else{
    startQuiz();
}
});

startQuiz();