import React, { useState, useEffect } from 'react';
import {
  Card, CardImg, CardBody, CardTitle, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import nightGameVoteData from '../../helpers/data/nightGameVoteData';

const NightGameCard = (props) => {
  const gameInfo = props;
  const [gameVotes, setGameVotes] = useState([]);

  const getGameVotes = (nightGameId) => {
    nightGameVoteData.getByNightGameId(nightGameId).then((response) => {
      if (response) {
        setGameVotes(response);
      }
    });
  };

  const addVote = (voteInfo) => {
    nightGameVoteData.addVote(voteInfo).then(() => {
      getGameVotes(gameInfo.game.id);
    });
  };

  const removeVote = (nightGameId, userId) => {
    nightGameVoteData.removeVote(nightGameId, userId).then(() => {
      getGameVotes(gameInfo.game.id);
    });
  };

  const included = (gameVote) => gameVote.userId === gameInfo.dbUserId;

  useEffect(() => {
    getGameVotes(gameInfo.game.id);
  }, []);

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/game/${gameInfo.game.game.id}`}><CardImg top width="100%" className="game-card-img" src={gameInfo.game.game.gameImage} alt={gameInfo.game.game.title} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">
          {`${gameInfo.game.game.title} - ${gameVotes.length}`} {gameVotes.length === 1 ? 'vote' : 'votes'}
          {gameVotes.some(included) ? <Button className='group-button deactivate-button' onClick={() => removeVote(gameInfo.game.id, gameInfo.dbUserId)}>
            <i className="fas fa-minus-circle"></i></Button>
            : <Button className='group-button approve-button' onClick={() => addVote({ nightGameId: gameInfo.game.id, userId: gameInfo.dbUserId })}>
              <i className="fas fa-plus-circle"></i></Button>}
          </CardTitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default NightGameCard;
