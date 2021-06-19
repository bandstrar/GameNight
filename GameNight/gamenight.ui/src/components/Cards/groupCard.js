import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

const GroupCard = (props) => {
  const groupInfo = props;

  return (
    <div className="card-container">
    <Card className="group-card">
      <Link to={`/group/${groupInfo.group.id}`}><CardImg top width="100%" className="game-card-img" src={groupInfo.group.image} alt={groupInfo.group.name} /></Link>
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">{groupInfo.group.name}</CardTitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default GroupCard;
