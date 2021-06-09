import React, { useState } from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import nightGameData from '../../helpers/data/nightGameData';

const NightGameCard = (props) => {
  const gameInfo = props;
  const [voted, setVoted] = useState(false);

  const addVote = (nightGameId) => {
    nightGameData.addVoteToGame(nightGameId).then(() => {
      setVoted(true);
      gameInfo.onUpdate();
    });
  };

  const removeVote = (nightGameId) => {
    nightGameData.removeVoteFromGame(nightGameId).then(() => {
      setVoted(false);
      gameInfo.onUpdate();
    });
  };

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/game/${gameInfo.game.game.id}`}><CardImg top width="100%" className="game-card-img" src={gameInfo.game.game.gameImage} alt={gameInfo.game.game.title} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">
          {`${gameInfo.game.game.title} - ${gameInfo.game.votes}`} {gameInfo.game.votes === 1 ? 'vote' : 'votes'}
          {voted ? <Button onClick={() => removeVote(gameInfo.game.id)}>-</Button>
            : <Button onClick={() => addVote(gameInfo.game.id)}>+</Button>}
          </CardTitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default NightGameCard;
