const selectBtn = document.querySelector('.bottom_cont');
const startBtn = document.querySelector('.start_round');
const pcScore = document.querySelector('.pc-score');
const playerScore = document.querySelector('.player-score');
const pcSel = document.querySelector('.pc-select');
const userSel = document.querySelector('.player-select');
const popupWin = document.querySelector('.popup_win');
const winner = document.querySelector('.popup_winner');
const popupBtn = document.querySelector('.popup_btn');

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
    
    
    selectBtn.addEventListener('click', function rpsSelection(e)  {
        
        //the code below is wrapped in if to avoid the parent element of the 3 buttons to be accessible
        if (!e.target.classList.contains('bottom_cont')) {
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

        //inserting the relevant icon to the user choise window
        userSel.textContent = e.target.textContent;
        //assigning the computer play function to a variable to make it accesible
        let pcGuess2 = computerPlay();
        
        
        //updating the score of PC or user depending on the winning combination
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
        
        //showing the current round score for the user and pc
        playerScore.textContent = userPoints;
        pcScore.textContent = pcPoints;
    
       
       //after PC or user reach 5 points removing the event listener from the buttons
       //after one of the players reaches 5 points show the popup window calling the winner
       if(userPoints >= 5 || pcPoints >= 5) {
           if (userPoints > pcPoints) {
               winner.textContent = 'User wins';
           } else if (pcPoints > userPoints) {
               winner.textContent = 'PC wins';
           } else {
               winner.textContent = 'Draw';
           }
           popupWin.classList.add('popup_win_show');
           //remove the event listener from the rock/paper/scissors buttons after someone reaches 5 points, otherwise triggering them will keep the score updating after the end of the round
           selectBtn.removeEventListener('click', rpsSelection);
            }
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
            });
    });    
};

//start button will make the buttons to trigger the function to start the round
startBtn.addEventListener('click', playerPlay);

//closing the popup window
popupBtn.addEventListener('click', () => {
    popupWin.classList.remove('popup_win_show');
});