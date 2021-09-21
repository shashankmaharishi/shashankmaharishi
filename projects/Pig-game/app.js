/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying;
console.log(gamePlaying);

init();
console.log(gamePlaying);


document.querySelector('.btn-roll').addEventListener('click',function(){
    console.log('in click')
    if (gamePlaying){
    //1. Random Numbers
var dice=Math.floor(Math.random()*6+1);
   //2. Display the result
var diceDOM = document.querySelector('.dice');
diceDOM.style.display='block';
diceDOM.src='dice-'+dice+'.png';
   //3. Update the round score if the rolled number was NOT a 1
if (dice!==1){
    //add score
    roundScores+=dice;
    document.querySelector('#current-'+activePlayer).textContent=roundScores;

}else{
    //next player
   nextPlayer();
}
}});


document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gamePlaying){
    //add current score
scores[activePlayer]+=roundScores;

//update the UI
document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
/*what will happen here is, when we click on hold the score will be updated but the active player will 
remain same. so to change that we have to use the exact same code as above*/
//so we have made a function nextPlayer that we are going to call here
//nextPlayer();

//check if player won the game
if (scores[activePlayer>=100]){
    document.querySelector('#name-'+activePlayer).textContent='winner!';
    document.querySelector('.dice').style.display='none';
    document.querySelector('.player-'+ activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer+'-panel').classList.remove('active');
    gamePlaying=false;
} else{
    nextPlayer();
}
}});

function nextPlayer(){
     //next player
    /*instead of if else statement,i.e
    if (activePlayer===0){
        activePlayer=1
    }else{
        activePlayer=0
    }   
    we are going to use ternary operator
    */
   activePlayer===0? activePlayer=1 : activePlayer=0;
   roundScores=0;  /*this will set the score to zero but not on the user interface */
   document.getElementById('current-0').textContent='0';
   document.getElementById('current-1').textContent='0';

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');
   //document.querySelector('.player-0-panel').classList.remove('active');
   //document.querySelector('.player-1-panel').classList.add('active');

   document.querySelector('.dice').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click',function(){
/*
what we want is, to set 
scores=[0,0];
roundScores=0;
activePlayer=0;
 and we have used it in the begening also, so to avoid repeating code we will create a function init()
*/
init();
});

function init(){
    scores=[0,0];
    roundScores=0;
    activePlayer=0;
    gamePlaying = true;
    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}