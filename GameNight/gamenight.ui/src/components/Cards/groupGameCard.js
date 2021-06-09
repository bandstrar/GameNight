import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

const GroupGameCard = (props) => {
  const gameInfo = props;

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/game/${gameInfo.game.id}`}><CardImg top width="100%" className="game-card-img" src={gameInfo.game.gameImage} alt={gameInfo.game.title} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">{gameInfo.game.title}</CardTitle>
        <Button onClick={() => gameInfo.addGame({ gameId: gameInfo.game.id, gameNightId: gameInfo.nightId, votes: 0 })}>Add to Game Night</Button>
      </CardBody>
    </Card>
    </div>
  );
};

export default GroupGameCard;
