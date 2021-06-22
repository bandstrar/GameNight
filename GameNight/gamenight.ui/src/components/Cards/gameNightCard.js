import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

const GameNightCard = (props) => {
  const nightInfo = props;

  const nightDate = new Date(nightInfo.night.date);

  return (
    <div className="card-container">
    <Card className="group-card">
      <CardBody className="group-card-body">
      <Link className="game-night-link navbar-links nav-font" to={`/gameNight/${nightInfo.night.id}`}><CardTitle tag="h5" className="group-name">{nightInfo.night.title}</CardTitle></Link>
      <CardSubtitle tag="h5">{nightDate.toDateString()}</CardSubtitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default GameNightCard;
