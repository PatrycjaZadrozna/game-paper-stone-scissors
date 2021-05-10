const gameSummary = {
    numbers:0,
    wins:0,
    losses:0,
    draws:0
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = document.querySelectorAll('.select img');

function handSelection(){
   game.playerHand = this.dataset.option;
   hands.forEach(hand => hand.style.boxShadow = "");
   this.style.boxShadow = ' 0 0 0 4px yellow';
}

function startGame(){
    if(game.playerHand === ""){
        return alert('choose hand')
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

function aiChoice(){
    return hands[Math.floor(Math.random()*3)].dataset.option;
}

function checkResult(player, ai){
    if(player === ai){
        return 'draw'
    }else if((player === "paper" && ai === "stone") || (player === "stone" && ai === "scissors") || (player === "scissors" && ai === "paper")){
        return "win"
    }else{
        return 'loss'
    }
}

function publishResult(player, ai, result){
    document.querySelector(`[data-summary="your-choice"]`).textContent = player;
    document.querySelector(`[data-summary="ai-choice"]`).textContent = ai;
    document.querySelector(`[data-summary="who-win"]`).textContent = "you won";
     document.querySelector(`[data-summary="who-win"]`).style.color = "green";

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if( result === "win"){
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector(`[data-summary="who-win"]`).textContent = "You won";
        document.querySelector(`[data-summary="who-win"]`).style.color = "green";
    } else if(result === "loss"){
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector(`[data-summary="who-win"]`).textContent = "Ai won";
        document.querySelector(`[data-summary="who-win"]`).style.color = "red";
    } else{
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector(`[data-summary="who-win"]`).textContent = "draw";
        document.querySelector(`[data-summary="who-win"]`).style.color = "yellow";
    }
}

hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame)