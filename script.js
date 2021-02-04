const statusDisplay = document.querySelector(".game--status");


let gameActive = true;

let currentPlayer = "X";

let gameState= ["","","","","","","","",""];

const winningMessage =()=> `Player ${currentPlayer} has won!`;

const drawMessage =()=> `Game ended in a draw`;

const currentPlayersTurn =()=> `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayersTurn();


function handleCellPlayer(clickedCell, clickedCellIndex){
   
    gameState[clickedCellIndex] = currentPlayer;

    clickedCell.innerHTML = currentPlayer;

    
}

const winningCondidtions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ]

    function handlePlayerChange(){
   
         currentPlayer = currentPlayer === "X"?"0":"X";
         statusDisplay.innerHTML = currentPlayersTurn();
      
    }

    function handleResultValidation(){

        let rountWon = false;
     
        for(let i=0; i<winningCondidtions.length; i++){
        
            const winningCondidtion = winningCondidtions[i];

            let a = gameState[winningCondidtion[0]];
            let b = gameState[winningCondidtion[1]];
            let c = gameState[winningCondidtion[2]];

            if( a==="" || b==="" || c===""){
                continue;
            }
            if(a===b && b===c){
                rountWon = true;
                break;
            }

        }

        if(rountWon){
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if(roundDraw){
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();

    }



function handleCellClick(clickedCellEvent){ 
 

    const clickedCell = clickedCellEvent.target;
    
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if(gameState[clickedCellIndex] !== "" || !gameActive )
    {
        return;
    }

    //if everythink is fine
    
    //change the stste of cell

    //check anybody won after the click

    handleCellPlayer(clickedCell,clickedCellIndex);

    handleResultValidation();

}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState= ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayersTurn();
    document.querySelectorAll(".cell")
            .forEach((cell)=>(cell.innerHTML=""));

}

document.querySelectorAll(".cell")
.forEach((cell)=>cell.addEventListener("click",handleCellClick));

 document.querySelector(".game--restart").addEventListener("click",handleRestartGame);

