import React, { useState } from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import nightGameData from '../../helpers/data/nightGameData';

const GroupGameCard = (props) => {
  const gameInfo = props;
  const [clicked, setClicked] = useState(false);

  const addGameToNight = (gameData) => {
    nightGameData.addGameToNight(gameData);
    setClicked(true);
  };

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/game/${gameInfo.game.id}`}><CardImg top width="100%" className="group-card-img" src={gameInfo.game.gameImage} alt={gameInfo.game.title} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">{gameInfo.game.title}</CardTitle>
        {clicked ? <Button disabled>Game added!</Button>
          : <Button onClick={() => addGameToNight({ gameId: gameInfo.game.id, gameNightId: gameInfo.nightId, votes: 0 })}>Add to Game Night</Button>}
      </CardBody>
    </Card>
    </div>
  );
};

export default GroupGameCard;
