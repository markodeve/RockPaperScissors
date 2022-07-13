const selectBtn = document.querySelector('.bottom_cont');
const startBtn = document.querySelector('.start_round');
const pcScore = document.querySelector('.pc-score');
const playerScore = document.querySelector('.player-score');
const pcSel = document.querySelector('.pc-select');
const userSel = document.querySelector('.player-select');
const popupWin = document.querySelector('.popup_win');
const winner = document.querySelector('.popup_winner');
const popupBtn = document.querySelector('.popup_btn');

let playerGuess;
let pcGuess;

const computerPlay = () => {
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


let pcPoints = 0;
let userPoints = 0;


const playerPlay = () => {
    
    selectBtn.addEventListener('click', function rpsSelection(e)  {
        
        


        if (!e.target.classList.contains('bottom_cont')) {


            if (e.target.classList.contains('rock')) {
                playerGuess = 'rock';
            } if (e.target.classList.contains('paper')) {
                playerGuess = 'paper';
            } if (e.target.classList.contains('scissors')) {
                playerGuess = 'scissors';
            } 


            userSel.textContent = e.target.textContent;
        console.log(playerGuess);
        let pcGuess2 = computerPlay();
        console.log(pcGuess2);
        
        if (pcGuess2 == 'rock' && playerGuess == 'paper') {
            userPoints += 1;
        }
        if (pcGuess2 == 'paper' && playerGuess == 'scissors') {
            userPoints += 1;
        }
        if (pcGuess2 == 'scissors' && playerGuess == 'rock') {
            userPoints += 1;
        }
        if (pcGuess2 == 'paper' && playerGuess == 'rock') {
            pcPoints += 1;
        }
        if (pcGuess2 == 'scissors' && playerGuess == 'paper') {
            pcPoints += 1;
        }
        if (pcGuess2 == 'rock' && playerGuess == 'scissors') {
            pcPoints += 1;
        }
        
        
       playerScore.textContent = userPoints;
       pcScore.textContent = pcPoints;
    
       if(userPoints >= 5 || pcPoints >= 5) {
           selectBtn.removeEventListener('click', rpsSelection);
           if (userPoints > pcPoints) {
               winner.textContent = 'User wins';
           } else if (pcPoints > userPoints) {
               winner.textContent = 'PC wins';
           } else {
               winner.textContent = 'Draw';
           }
           popupWin.classList.add('popup_win_show');

            }
        }
    
    });    

    
};



startBtn.addEventListener('click', () => {
userPoints = 0;
pcPoints = 0;
playerScore.textContent = userPoints;
pcScore.textContent = pcPoints;
pcSel.textContent = '';
userSel.textContent = '';
});
startBtn.addEventListener('click', playerPlay);

popupBtn.addEventListener('click', () => {
    popupWin.classList.remove('popup_win_show');
});