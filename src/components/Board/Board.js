import './Board.css'
import { useEffect, useRef } from 'react'
import { boardSize, gameReady, unit } from '../../config/config';




const Board = ({players, gameStatus}) => {
const canvasRef = useRef();
useEffect(function() {
  if (gameStatus === gameReady){
    const canvas= canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0,0, boardSize, boardSize)

    context.beginPath();
    context.strokeStyle = '#94167F';
    for (let i = unit * 2; i <= boardSize; i += unit *2){
        context.moveTo(i,0);
        context.lineTo(i, boardSize);

    }
    for (let i = unit * 2; i <= boardSize; i += unit *2){
        context.moveTo(0,i);
        context.lineTo(boardSize, i );

    }
    context.stroke();
    context.closePath();
  }
    
}, [gameStatus]);

  useEffect(function() {
    const context = canvasRef.current.getContext('2d');
    players.forEach(player => {
      context.fillStyle = player.color;
      context.fillRect(player.position.x, player.position.y, unit, unit);
    });
  }, [players])
  return (
    <>
    <canvas ref={canvasRef} width={boardSize} height={boardSize} className='board'/>
    <div className='instrucciones'>
      {players.map(player => (
        <div className='instrucciones-jugador'
        style={{color: player.color}}
        key= {player.id}>
         {`${player.id}: ${player.instructions}`}
        </div>
      ))}
    </div>
    </>
  )
}

export default Board