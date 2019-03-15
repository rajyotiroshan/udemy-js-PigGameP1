/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, prevRolls=null;

init();

//click listener on roll-dice btn
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {//game is running
        //1. random number.
        var dice = Math.floor(Math.random()*6)+1;
        //2. display the result.
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice +'.png';

        //3. update the round score If rolled number was not 1.
        //check if dice roll to six.
        if( prevRolls && dice === 6 && prevRolls === dice  ) {
            //make total score of active player to zero.
            scores[activePlayer] = 0;
            //make previous roll to null,
            prevRolls = null;
            //update ui for current player scores.
            //update the UI 
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            //let next player play.
            nextPlayer();
            return;
        }

        if(dice !== 1) {
            //save dice to prevRolls
            prevRolls = dice;
            //Add score 
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent= roundScore;
        }else {
            //call next player
            nextPlayer();
        }
    }  
});


//listener for button hold.
document.querySelector(".btn-hold").addEventListener("click", function(){
    
    if(gamePlaying) {
        //make preRoll to null.
        prevRolls = null;
        //Add current score to global score.
        scores[activePlayer] += roundScore;
        roundScore = 0;

        //update the UI 
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        let winningScore;
        if(input) {
            winningScore = input;
        }else {
            winningScore = 100;
        }
        //check if player won the game.
        if(scores[activePlayer] > winningScore) {
            document.querySelector("#name-"+activePlayer).textContent='Winner';  
            document.querySelector(".dice").style.display = 'none';
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            gamePlaying = false;
        }else {
            //next Player.
            nextPlayer();
        }
    }
});

//listener for new game button.
document.querySelector(".btn-new").addEventListener("click" , init);

/**
 * Helper functions.
 * 
 */

//next Player.
function nextPlayer(){
    //change activePlayer 
    activePlayer === 0 ? activePlayer = 1 :activePlayer=0;
    //roundScore tozero 
    roundScore = 0;
    //set current score to zero
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    //change active side
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //hide roller dice
    document.querySelector(".dice").style.display = 'none';
}

//init game.

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 
    gamePlaying = true;
    prevRolls = null;
    //hide roller dice
    document.querySelector(".dice").style.display = 'none';
    //set current score to zero
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';
    document.getElementById("score-0").textContent = '0';
    document.getElementById("score-1").textContent = '0';
    document.getElementById("name-0").textContent = "Player-1";
    document.getElementById("name-1").textContent = "Player-2";

    //change active side
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}