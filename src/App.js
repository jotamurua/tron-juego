import { useEffect, useReducer, useContext} from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { PlayerContext } from "./components/playersContext/playerContext";
import Result from "./components/Result/Result";
import Start from "./components/Start/Start";
import { boardSize, gameEnded, gamePlaying, gameReady, playerFour, playerOne, playerThree, playerTwo, unit } from "./config/config";
import { useInterval } from "./hook/useInterval";
import getCellKey from "./utils/getCellKey";
import getPlayableCells from "./utils/getPlayableCells";
import playerCanchangeToDirection from "./utils/playerCanChangeToDirection";
import { sumCoordinates } from "./utils/sumCoordinates";

function App() {
const { howManyPlayers, setMultiplayer } = useContext(PlayerContext)
const players = howManyPlayers === 2 ? [playerOne, playerTwo] : howManyPlayers === 3 ? [playerOne, playerTwo, playerThree] : [playerOne, playerTwo, playerThree, playerFour]
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

  let result = null;
  const [game, gameDispatch] = useReducer(updateGame, initialState);

  const multiPlayers = game.players;
  const diedPlayers = multiPlayers.filter((player) => player.hasDied);
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
      gameDispatch({ type: "changeDirection", key });
    }
    document.addEventListener("keydown", handleKeyPress);

    return function cleanUp() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [game.gameStatus]);

  function startTwoPlayers () {
    gameDispatch({type: 'start'})
    setMultiplayer(2)
  }
  function startThreePlayers () {
    gameDispatch({type: 'start'})
    setMultiplayer(3)
  }
  function startFourPlayers () {
    gameDispatch({type: 'start'})
    setMultiplayer(4)
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
      {game.gameStatus === gameReady && <Start twoPlayers={startTwoPlayers} threePlayers={startThreePlayers} fourPlayers={startFourPlayers}/>}
    </div>
  );
}

export default App;
