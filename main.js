const questions = [
    {
        question: 'Какой язык работает в браузере?',
        answer: ["Java", "C", "Python", "JS"],
        correct: 4,
    },
    {
        question: 'Что такое CSS?',
        answer: ["SCSS", "C", "XYI", "1"],
        correct: 1,
    },
    {
        question: 'Какой язык работает в браузере?',
        answer: ["Java", "C", "Python", "JS"],
        correct: 4,
    },
    {
        question: 'Какой язык работает в браузере?',
        answer: ["Java", "C", "Python", "JS"],
        correct: 4,
    },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitButton.addEventListener('click', checkAnswer);

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    const userAnswer = parseInt(checkedRadio.value);
    const trueAnswer = questions[questionIndex]['correct'];

    if (!checkedRadio) {
        submitButton.blur();
        return
    }

    if (userAnswer === trueAnswer) {
        score++
    } 

    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion(); 
        return;
    } else {
        clearPage();
        showResults();
    }
}
function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;
    
    for ([index, item] of questions[questionIndex]['answer'].entries()) {
        const questionTemplate = 
        `<li>
            <label>
                <input value="%number%" type="radio" class="answer" name="answer">
                <span>%answer%</span>                  
            </label>                
        </li>`
        let list = questionTemplate.replace('%answer%', item). replace('%number%', ++index);
        console.log(list);
        listContainer.innerHTML = listContainer.innerHTML + list;
    }
}

function showResults() {
    console.log('score = ', score);

    const resultsTemplate = 
    `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;

    let title, message;
    if (score === questions.length) {
        title = 'Поздравляем! 🏅🏅🏅'
        message = 'Вы ответили верно на все вопросы 👍💪';
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Неплохой результат! 🏅🏅'
        message = 'Вы дали более половины правильных ответов 👍';
    } else {
        title = 'Тупой! 🏅'
        message = 'Иди учи базу (base) 👎';
    }

    let result = `${score} из ${questions.length}`;
    const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);
    headerContainer.innerHTML = finalMessage;

    submitButton.blur();
    submitButton.innerText = 'Начать заново';
    submitButton.addEventListener('click', () => {
        history.go();
    })
}
