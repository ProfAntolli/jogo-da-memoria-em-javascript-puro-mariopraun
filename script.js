var soundMatch = new Audio('sounds/correct.mp3');
var soundError = new Audio('sounds/error.mp3');
var soundVictory = new Audio('sounds/victory.mp3');
var cards = ['images/img1.jpg', 'images/img1.jpg', 'images/img2.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img4.jpg', 'images/img5.jpg', 'images/img5.jpg', 'images/img6.jpg', 'images/img6.jpg'];
var current = null;
var matches = 0;
var isFlipping = false;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flip(card) {
    if (isFlipping || card === current || card.classList.contains('matched')) return;
    card.querySelector('.inner').classList.add('flip');
    card.querySelector('.front').style.backgroundImage = 'url('+ card.getAttribute('data-value') + ')';
    
    if (current === null) {
        current = card;
    }else {
        isFlipping = true;
        card.querySelector('.front').style.backgroundImage = 'url('+ card.getAttribute('data-value') + ')';
        if (current.getAttribute('data-value') !== card.getAttribute('data-value')){
            soundError.play();
            setTimeout(function(){
                current.querySelector('.inner').classList.remove('flip');
                card.querySelector('.inner').classList.remove('flip');
                current.querySelector('.front').style.backgroundImage = '';
                card.querySelector('.front').style.backgroundImage = '';
                current = null;
                isFlipping = false;
            }, 1000);
        }else {
            soundMatch.play();
            matches++;
            current.classList.add('matched');
            card.classList.add('matched');            
            current = null;
            isFlipping = false;
            if(matches === 6){
                soundVictory.play();
                alert('Você venceu!');
            }
        }
    }
}

function startGame() {
    var game = document.getElementById('game');
    game.innerHTML= "";
    cards = shuffle(cards);

    for (var i = 0; i < cards.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', cards[i]);

        var inner = document.createElement('div');
        inner.classList.add('inner');

        var front = document.createElement('div');
        front.classList.add('front');

        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = 'url(images/back.jpg)';

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        
        card.addEventListener('click', function() {
            flip(this);
        });
        game.appendChild(card);
    }
    current = null;
    matches = 0;
    isFlipping = false;
}

document.getElementById('reset').addEventListener('click', startGame);

startGame();
