import { useEffect, useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Result from "./components/Result/Result";
import Start from "./components/Start/Start";
import { boardSize, gameEnded, gamePlaying, gameReady, playerOne, playerTwo, unit } from "./config/config";
import { useInterval } from "./hook/useInterval";
import getCellKey from "./utils/getCellKey";
import getPlayableCells from "./utils/getPlayableCells";
import playerCanchangeToDirection from "./utils/playerCanChangeToDirection";
import { sumCoordinates } from "./utils/sumCoordinates";


const players = [playerOne, playerTwo];

const initialState = {
  players,
  playableCells: getPlayableCells(
    boardSize,
    unit,
    players.map((player) => getCellKey(player.position.x, player.position.y))
  ),
  gameStatus: gameReady
};
function updateGame(game, action) {
  if (action.type === 'start') {
    return {...initialState, gameStatus: gamePlaying}
  }
  if (action.type === 'restart') {
    return {...initialState, gameStatus: gameReady}
  }
  if (action.type === "move") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      position: sumCoordinates(player.position, player.direction),
    }));

    const newPlayersWithCollision = newPlayers.map((player) => {
      const myCellKey = getCellKey(player.position.x, player.position.y);
      return {
        ...player,
        hasDied:
          !game.playableCells.includes(myCellKey) ||
          newPlayers
            .filter((p) => p.id !== player.id)
            .map((p) => getCellKey(p.position.x, p.position.y))
            .includes(myCellKey)
      };
    });

    const newOcupiedCells = game.players.map((player) =>
      getCellKey(player.position.x, player.position.y)
    );

    const playableCells = game.playableCells.filter((playableCell) => {
      return !newOcupiedCells.includes(playableCell);
    });

    return {
      players: newPlayersWithCollision,
      playableCells: playableCells,
      gameStatus: newPlayersWithCollision.filter(player => player.hasDied).length === 0 ? gamePlaying : gameEnded
    };
  }
  if (action.type === "changeDirection") {
    const newPlayers = game.players.map((player) => ({
      ...player,
      direction:
        player.keys[action.key] &&
        playerCanchangeToDirection(player.direction, player.keys[action.key])
          ? player.keys[action.key]
          : player.direction
    }));

    return {
      players: newPlayers,
      playableCells: game.playableCells,
      gameStatus: game.gameStatus
    };
  }
}
function App() {
  let result = null;
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  const players = game.players;
  const diedPlayers = players.filter((player) => player.hasDied);
  if (diedPlayers.length > 0) {
    console.log(diedPlayers);
  }
  useInterval(
    function () {
      gameDispatch({ type: "move" });
    },
    game.gameStatus !== gamePlaying ? null : 100
  );

  useEffect(function () {
    function handleKeyPress(event) {
      const key = `${event.keyCode}`;
      if (key === '13') {
        if (game.gameStatus === gameReady){
          handleStart()
        }
        if (game.gameStatus === gameEnded){
          handleRestart()
        }
      }
      gameDispatch({ type: "changeDirection", key });
    }
    document.addEventListener("keydown", handleKeyPress);

    return function cleanUp() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [game.gameStatus]);

  function handleStart () {
    gameDispatch({type: 'start'})
  }

  function handleRestart() {
    
    gameDispatch({type: 'restart'})

  }
  if (game.gameStatus===gameEnded) {
    const winningPlayers = game.players.filter(player => !player.hasDied);
    if (winningPlayers.length === 0) {
      result = 'Empate';
    } else {
      result = `Ganador: ${winningPlayers.map((player) => `Jugador ${player.id}`).join(',')}`;
    }
  }

  return (
    <div className="App">
      <Board players={game.players} gameStatus={game.gameStatus}/>
      {game.gameStatus === gameEnded && <Result onClick={handleRestart} result={result}/>} 
      {game.gameStatus === gameReady && <Start onClick={handleStart}/>}
    </div>
  );
}

export default App;
