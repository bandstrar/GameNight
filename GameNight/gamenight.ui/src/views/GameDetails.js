import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import gameData from '../helpers/data/gameData';

const GameDetails = (props) => {
  const gameProps = props;
  const [gameInfo, setGameInfo] = useState({});
  const [didMount, setDidMount] = useState(false);

  const getGameInfo = (gameId) => {
    gameData.getSingleGame(gameId).then((response) => {
      setGameInfo(response);
    });
  };

  useEffect(() => {
    const gameId = gameProps.match.params.id;
    getGameInfo(gameId);
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div>
    <div className="game-detail-body">
    <div className="d-flex col-wrap justify-content-center">
      <div>
      <h1>{gameInfo.title}</h1>
      <h3>Player Count: {gameInfo.minPlayers}-{gameInfo.maxPlayers} Players</h3>
      <h3>Playing Time: {gameInfo.lengthInMinutes}</h3>
      <h3>Game Weight: {gameInfo.weight}</h3>
      <h3>Genre: {gameInfo.genre}</h3>
      <Button onClick={() => gameProps.history.goBack()}>Back to My Games</Button>
      </div>
      <div>
        <img src={gameInfo.gameImage} alt={`${gameInfo.title} box art`} />
      </div>
    </div>
    </div>
    </div>
  );
};

export default GameDetails;
