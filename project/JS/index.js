// Project 1 : Your age in days

function ageInDays() {
    var birthYear =  prompt('What is your birth year');
    var result = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + result + 'days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    
}


function reset() {
    document.getElementById('ageInDays').remove();
}

// Project 2: Cat Generator

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-generator');
    image.src = 'project/images/tenor.gif';
    div.appendChild(image);
}


//Project 3: Rock Paper Scissors

function rpsGame(yourChoice) {
    var humanChoice, botChoice;
    humanChoice= yourChoice.id;
    botChoice= numberToChoice(randToRpsInt());
    results= decideWinner(humanChoice, botChoice);
    console.log(results);
    message= finalMessage(results);
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };
    var yourScore= rpsDatabase[yourChoice][computerChoice];
    var computerScore= rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost!', 'color': 'red'};
} else if (yourScore === 0.5) {
    return {'message': 'You Tied!', 'color': 'yellow'}; 
} else {
    return {'message': 'You Won!', 'color': 'green'};
}
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();


    var humanDiv= document.createElement('div');
    var messageDiv= document.createElement('div');
    var botDiv= document.createElement('div');
    

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)';>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 233, 1)';>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    




}


//Project 4 Change the color of all Buttons

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for(let i=0; i <  all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red'){
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonRed() {
    for(let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }

}

function buttonGreen() {
        for(let i=0; i< all_buttons.length; i++) {
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add('btn-success');
        }

}
    
function buttonColorReset() {
    for(let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }

}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for(let i=0; i< all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


// Project 5 : Blackjack

let blackjackGame = {
    'you' : {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer' : {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('project/sounds/swish.m4a');
const winSound = new Audio('project/sounds/cash.mp3');
const lossSound = new Audio('project/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if  (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `project/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}



function blackjackDeal() {

    if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }

    for(i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;


    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

   document.querySelector('#blackjack-result').textContent = "Let's Play";
   document.querySelector('#blackjack-result').style.color = 'inherit';
   blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
            blackjackGame['wins']++;
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackjackGame['losses']++;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if(blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = "You Won!";
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = "You Lost!";
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message= "You Drew!";
        messageColor= 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
    }
}


// Project 6 : Dice Game

const diceGame = {
    'win1' : 0,
    'win2' : 0,
    
}


function startGame() {
    
    var randomDice1 = Math.floor(Math.random() * 6) + 1;

var randomDiceImage1 = 'project/images/dice' + randomDice1 + '.png';
    
 document.querySelectorAll('img')[4].setAttribute('src', randomDiceImage1);

 
 var randomDice2 = Math.floor(Math.random() * 6) + 1;

var randomDiceImage2 = 'project/images/dice' + randomDice2 + '.png';
    
 document.querySelectorAll('img')[5].setAttribute('src', randomDiceImage2);

if (randomDice1 > randomDice2) {
    diceGame['win1']++;
    document.querySelector('#win1').textContent = diceGame['win1'];
    document.querySelectorAll('h3')[1].innerHTML = 'Player 1 Wins!';
    document.querySelectorAll('h3')[1].style.color = 'green';
} else if (randomDice2 > randomDice1) {
    diceGame['win2']++;
    document.querySelector('#win2').textContent = diceGame['win2'];
    document.querySelectorAll('h3')[1].innerHTML = 'Player 2 Wins!';
    document.querySelectorAll('h3')[1].style.color = 'green';
} else if (randomDice1 === randomDice2) {
    document.querySelectorAll('h3')[1].innerHTML = "It's a Draw!";
    document.querySelectorAll('h3')[1].style.color = 'yellow';
}


}

function endGame() {
    
    document.querySelectorAll('h3')[1].innerHTML = "Let's Play";
    document.querySelectorAll('h3')[1].style.color = 'inherit';
    document.querySelectorAll('img')[4].setAttribute('src', 'project/images/dice1.png');
    document.querySelectorAll('img')[5].setAttribute('src', 'project/images/dice1.png');
        


}





    
