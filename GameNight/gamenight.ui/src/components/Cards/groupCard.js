import React from 'react';
import {
  Card, CardImg, CardBody, CardTitle
} from 'reactstrap';

const GroupCard = (props) => {
  const groupInfo = props;

  return (
    <div className="card-container">
    <Card className="group-card">
      <CardImg top width="100%" className="group-card-img" src={groupInfo.group.image} alt={groupInfo.group.name} />
      <CardBody className="group-card-body">
        <CardTitle tag="h5" className="group-name">{groupInfo.group.name}</CardTitle>
      </CardBody>
    </Card>
    </div>
  );
};

export default GroupCard;
