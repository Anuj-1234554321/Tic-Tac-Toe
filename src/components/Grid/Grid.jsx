import { useState } from "react";
import isWinner from "../../helpers/checkWinner";
import Card from "../Cards/Card";
function Grid({numberOfCards}) {
    const[board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); 
    const [winner, setWinner] = useState(null);

    function onPlay(index){
        if(turn == true){
            board[index] = "O";
        }else{
            board[index] = "X";
        }
       const win = isWinner(board, turn ? "O" : "X");
        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }
    function resetGame(){
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return(
        <div>
            {
                winner && (
                    <>
                    <h1 className="text-4xl font-bold text-red-500">{winner} wins!</h1>
                    <button onClick={resetGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play Again</button>
                    </>
                )
            }
            <h className = "text-black text-2xl font-bold"> Current Turn: {(turn) ? "O" : "X"}</h>
            <div className="flex flex-wrap bg-black justify-center items-center w-[600px] h-[600px]">
            {board.map((card, index) => (
                <Card key={index} gameEnd={(winner) ? true : false} player={card} onPlay = {onPlay} index = {index}/>
            ))}
        </div>
        </div>

    );


}
export default Grid;