
// All answer option 
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

// All our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById("number-of-question"),
      numberOfAllQuestion = document.getElementById("number-of-all-questions");

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; // индекс страниц

    const answersTracker = document.getElementById('answers-tracker');
    const btnNext = document.getElementById('btn-next');
    
    let score = 0; // Итоговый результат викторины

     const correctAnswer = document.getElementById("correct-answer"),
            numberOfAllQuestion2 = document.getElementById("number-of-all-question-2"),
            btnTryAgain = document.getElementById("btn-try-again");

const questions = [
   {
      question: "Как в JavaScript вычислить процент от числа",
      options: [
         "Так в JavaScript нельзя делать",
         "Оператор : %",
         "Умножить на кол во процентов и разделить на 100",
         "Вызвать метод findPrecent()",
      ],
      rightAnswer: 2
   },
   {
      question: "Как в JavaScript вычислить процент от числа 222",
      options: [
         "Так в JavaScript нельзя делать 222",
         "Оператор : % 222",
         "Умножить на кол во процентов и разделить на 100 222",
         "Вызвать метод findPrecent() 222",
      ],
      rightAnswer: 1
   },
   {
      question: "Как в JavaScript вычислить процент от числа 3333",
      options: [
         "Так в JavaScript нельзя делать 222",
         "Оператор : % 222",
         "Умножить на кол во процентов и разделить на 100 222",
         "Вызвать метод findPrecent() 222",
      ],
      rightAnswer: 1
   },
];


numberOfAllQuestion.innerHTML = questions.length //выводим кол во всех вопросов

const load = () => {
   question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

   option1.innerHTML = questions[indexOfQuestion].options[0];
   option2.innerHTML = questions[indexOfQuestion].options[1];
   option3.innerHTML = questions[indexOfQuestion].options[2];
   option4.innerHTML = questions[indexOfQuestion].options[3];

   numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
   indexOfPage++; // увеличение индекса страницы 

}

let completedAnswers = [];

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDublicate = false;

   if(indexOfPage == questions.length) {
      quizOver();
   } else {
      if(completedAnswers.length > 0) {
         completedAnswers.forEach(item => {
            if(item == randomNumber) {
               hitDublicate = true;
            }
         });
         if(hitDublicate) {
            randomQuestion();
         } else {
            indexOfQuestion = randomNumber ;
            load();
         }
      };
      if(completedAnswers == 0) {
         indexOfQuestion = randomNumber;
         load();
      }
   };
   completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {

   console.log(el.target.dataset.id);
   if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
      el.target.classList.add("correct");
      updateAnswerTracker("correct");
      score++;
   } else {
      el.target.classList.add("wrong");
      updateAnswerTracker("wrong");
   }
   disabledOptoins();
}

const disabledOptoins = () => {
   optionElements.forEach(item => {
      item.classList.add("disabled");
      if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
         item.classList.add("correct");
      }
   })
}

const enableOptions = () => {
   optionElements.forEach(item => {
      item.classList.remove("disabled","correct","wrong");
   })
};

const updateAnswerTracker = status => {
   answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
   if(!optionElements[0].classList.contains("disabled")){
      alert("Вам нужно выбрать один из вариантов ответа");
   } else {
      randomQuestion();
      enableOptions();
   }
};

btnNext.addEventListener("click",validate);

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement("div");
      answersTracker.appendChild(div);
   })
};

optionElements.forEach(option => {
   option.addEventListener("click", e => checkAnswer(e));
})

const quizOver = () => {
   document.querySelector(".quiz-over-modal").classList.add("active");
   correctAnswer.innerHTML = score;
   numberOfAllQuestion2.innerHTML = questions.length
}

const tryAgain = () => {
   window.location.reload();
};

btnTryAgain.addEventListener("click",tryAgain);

window.addEventListener("load",()=>{
   randomQuestion();
   answerTracker();
})

