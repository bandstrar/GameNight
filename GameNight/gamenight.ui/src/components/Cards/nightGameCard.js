import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NightGameCard = (props) => {
  const gameInfo = props;

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/game/${gameInfo.game.game.id}`}><CardImg top width="100%" className="game-card-img" src={gameInfo.game.game.gameImage} alt={gameInfo.game.game.title} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">{`${gameInfo.game.game.title} - ${gameInfo.game.votes}`} {gameInfo.game.votes === 1 ? 'vote' : 'votes'}</CardTitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default NightGameCard;
