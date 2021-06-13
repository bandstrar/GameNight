import React, { useState, useEffect } from 'react';
import gameData from '../helpers/data/gameData';
import AppModal from '../components/AppModal';
import GameForm from '../components/Forms/GameForm';

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

  const getWeight = (weight) => {
    switch (weight) {
      case 0:
        return 'Light';
      case 1:
        return 'Medium-Light';
      case 2:
        return 'Medium';
      case 3:
        return 'Medium-Heavy';
      case 4:
        return 'Heavy';
      default:
        return 'No Weight Assigned';
    }
  };

  return (
    <div>
    <div className="d-flex col-wrap game-detail-body">
      <div className="mr-5 mt-3">
      <h1>{gameInfo.title}</h1>
      <h3>Player Count: {gameInfo.minPlayers}-{gameInfo.maxPlayers} Players</h3>
      <h3>Playing Time: {gameInfo.lengthInMinutes}</h3>
      <h3>Game Weight: {getWeight(gameInfo.weight)}</h3>
      <h3>Genre: {gameInfo.genre}</h3>
      <AppModal modalTitle='Update Game' buttonLabel={'Update Game'}>
        <GameForm game={gameInfo} dbUserId={gameProps.dbUser.id} onUpdate={() => getGameInfo(gameInfo.id)} />
      </AppModal>
      </div>
      <div className="ml-5">
        <img src={gameInfo.gameImage} alt={`${gameInfo.title} box art`} />
      </div>
    </div>
    </div>
  );
};

export default GameDetails;
