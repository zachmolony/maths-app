const operators = ["*", "/", "+", "-"];
let score = 0;
let count = 0;
let qCount = 0;

function startQuiz(difficulty) {
    $('.home').fadeOut();
    setTimeout(function () {
        $('.test').fadeIn();
    }, 300);

    $('#difficulty').text(difficulty);

    if ($('#difficulty').text() == 'easy') {
        $('.time').text('');
    } else if ($('#difficulty').text() == 'medium') {
        count = 21;
    } else {
        count = 11;
    };
    getQuestion(count);
};

function getQuestion(count) {
    setTimeout(() => {
        $('html').css({
            'backgroundColor': 'white'
        });
    }, 500);

    if ($('#difficulty').text() !== 'easy') {
        window.timer = setInterval(() => {
            count = count - 1;

            if (count === 0) {
                clearInterval(window.timer);
                checkAnswer(" ");
                incorrect();
            }
            $('.time').text(count);
        }, 1000);
    };

    ans = -0.1;
    while (!Number.isInteger(ans) || (ans < 0)) {
        q = [2 + getRandomInt(11), operators[getRandomInt(operators.length)], 2 + getRandomInt(11)];
        ans = eval(q[0] + q[1] + q[2]);
    };
    $('.question').text(q[0] + " " + q[1] + " " + q[2]);

    /* GET ANSWERS */
    possibleAnswers = [ans]
    while (possibleAnswers.length < 4) {
        a = obfuscate(ans);
        if (!possibleAnswers.includes(a)) {
            possibleAnswers.push(a);
        };
    };
    console.log(possibleAnswers);
    possibleAnswers.sort(function () {
        return .5 - Math.random();
    });

    $('#a').text(possibleAnswers[0]);
    $('#b').text(possibleAnswers[1]);
    $('#c').text(possibleAnswers[2]);
    $('#d').text(possibleAnswers[3]);
};

function checkAnswer(input) {
    clearInterval(window.timer);
    $('.test').hide();
    if (input == window.ans) {
        correct();
    } else {
        incorrect();
    };
    setTimeout(() => {
        $('.q-feedback').hide();
        $('.test').fadeIn();
        if (qCount < 2) {
            qCount++;
            getQuestion(count);
        } else {
            getScore();
        };
    }, 500);
};

function incorrect() {
    $('#incorrect').css({
        'display': 'flex'
    });
};

function correct() {
    $('#correct').fadeIn();
    score += 1;
    $('.score').text(score);
};

function getScore() {
    $('.test').hide();
    $('.scoreCount').text(score);
    $('.results').fadeIn();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function obfuscate(value) {
    if (getRandomInt(2) === 1) {
        return value += getRandomInt(5) + 1;
    } else {
        return value -= getRandomInt(5) - 1;
    };
};

function restart() {
    score = 0;
    $('.results').fadeOut();
    $('.home').fadeIn();
}