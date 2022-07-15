const selectBtn = document.querySelector('.bottom-cont');
const startBtn = document.querySelector('.start-round');
const pcScore = document.querySelector('.pc-score');
const playerScore = document.querySelector('.player-score');
const pcSel = document.querySelector('.pc-select');
const userSel = document.querySelector('.player-select');
const popupWin = document.querySelector('.popup-win');
const winner = document.querySelector('.popup-winner');
const popupBtn = document.querySelector('.popup-btn');
const showRound = document.querySelector('.show-round');
const userIcon = document.querySelector('.icon-user');
const pcIcon = document.querySelector('.icon-pc');
const startText = document.querySelector('.start-text');

//variables for the selection for player or pc
let playerGuess;
let pcGuess;

//random choise of PC 
const computerPlay = () => {
    // added 3 + 1 because when multiplying by 3 without +1 the possible result includes 0
    let pcGuess = Math.floor(Math.random() * 3 + 1);
    switch (pcGuess) {
        case 1:
            pcGuess = 'rock';
            break;
        case 2: 
            pcGuess = 'paper';
            break;
        case 3:
            pcGuess = 'scissors';
            break;
    
        default:
            break;
    }
    //show the corresponding icon in the PC choise window
    switch (pcGuess) {
        case 'rock':
            pcSel.textContent = '⛰';
            break;
        case 'paper':
            pcSel.textContent = '📃';
            break;
        case 'scissors':
            pcSel.textContent = '✂';
            break;
        default:
            break;
    }
    return pcGuess;    
};

//The function triggers after the start button is clicked
//after the start button is clicked the round starts when user clicks one of the choise buttons
//after the user clicks one of the rock/paper/scissors button the PC automatically makes a choise
//the round is finished when one of the players user or the pc reaches to 5 points
let pcPoints = 0;
let userPoints = 0;
const playerPlay = () => {
let roundCounter = 0;
    
    
selectBtn.addEventListener('click', function rpsSelection(e)  {
    //the code below is wrapped in if to avoid the parent element of the 3 buttons to be accessible
        if (!e.target.classList.contains('bottom-cont')) {
            //update the round counter
            roundCounter += 1;
            //selecting the rock/paper/scissors depending on the button clicked
            if (e.target.classList.contains('rock')) {
                playerGuess = 'rock';
            } 
            if (e.target.classList.contains('paper')) {
                playerGuess = 'paper';
            } 
            if (e.target.classList.contains('scissors')) {
                playerGuess = 'scissors';
            } 
            showRound.textContent = `round: ${roundCounter}`;
        //inserting the relevant icon to the user choise window
        userSel.textContent = e.target.textContent;
        //assigning the computer play function to a variable to make it accesible
        let pcGuess2 = computerPlay();
        
        //updating the score of PC or user depending on the winning combination
        //also giving a green color to the winning user/pc icon for a moment using settimeout
        if (pcGuess2 == 'rock' && playerGuess == 'paper') {
            userPoints += 1;
            userIcon.classList.add('winning-color');
            setTimeout(() => {
                userIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == 'paper' && playerGuess == 'scissors') {
            userPoints += 1;
            userIcon.classList.add('winning-color');
            setTimeout(() => {
                userIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == 'scissors' && playerGuess == 'rock') {
            userPoints += 1;
            userIcon.classList.add('winning-color');
            setTimeout(() => {
                userIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == 'paper' && playerGuess == 'rock') {
            pcPoints += 1;
            pcIcon.classList.add('winning-color');
            setTimeout(() => {
                pcIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == 'scissors' && playerGuess == 'paper') {
            pcPoints += 1;
            pcIcon.classList.add('winning-color');
            setTimeout(() => {
                pcIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == 'rock' && playerGuess == 'scissors') {
            pcPoints += 1;
            pcIcon.classList.add('winning-color');
            setTimeout(() => {
                pcIcon.classList.remove('winning-color');
            }, 100);
        }
        if (pcGuess2 == playerGuess) {
            pcIcon.classList.add('draw-color');
            setTimeout(() => {
                pcIcon.classList.remove('draw-color');
            }, 100);
            userIcon.classList.add('draw-color');
            setTimeout(() => {
                userIcon.classList.remove('draw-color');
            }, 100);
        }
        //showing the current round score for the user and pc
        playerScore.textContent = userPoints;
        pcScore.textContent = pcPoints;
       //after 5 rounds played removing the event listener from the buttons
       //after 5 rounds are played show the popup window calling the winner
       if(roundCounter >= 5) {
           if (userPoints > pcPoints) {
               winner.textContent = 'User wins';
               userIcon.classList.add('winning-color');
           } else if (pcPoints > userPoints) {
               winner.textContent = 'PC wins';
               pcIcon.classList.add('winning-color');
           } else {
               winner.textContent = 'Draw';
               pcIcon.classList.add('draw-color');
               userIcon.classList.add('draw-color');
           }
           popupWin.classList.add('popup-win-show');
           //remove the event listener from the rock/paper/scissors buttons after someone reaches 5 points, otherwise triggering them will keep the score updating after the end of the round
           selectBtn.removeEventListener('click', rpsSelection);
    
            }
            startText.classList.remove('popup-win-show');
        }
        //Clicking the start button will reset the score to 0 for both players
        startBtn.addEventListener('click', () => {
            //also remove the event listener with the function when start button clicked
            selectBtn.removeEventListener('click', rpsSelection);
            userPoints = 0;
            pcPoints = 0;
            playerScore.textContent = 0;
            pcScore.textContent = 0;
            //remove the player and pc choise icons from the window
            pcSel.textContent = '';
            userSel.textContent = '';
            showRound.textContent = '';
            pcIcon.classList.remove('winning-color');
            userIcon.classList.remove('winning-color');
            pcIcon.classList.remove('draw-color');
            userIcon.classList.remove('draw-color');
        });
    });    
};

//start button will make the buttons to trigger the function to start the round
startBtn.addEventListener('click', playerPlay,);
//show the text above the start button indicating what to do to start the round
startBtn.addEventListener('click', () => {
    startText.classList.add('popup-win-show');
});
//closing the popup window
popupBtn.addEventListener('click', () => {
    popupWin.classList.remove('popup-win-show');
    showRound.textContent = '';
});