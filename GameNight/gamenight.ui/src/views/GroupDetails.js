import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import groupData from '../helpers/data/groupData';
import gameNightData from '../helpers/data/gameNightData';
import GameNightCard from '../components/Cards/gameNightCard';

const GroupDetails = (props) => {
  const groupDetailsProps = props;

  const [groupInfo, setGroupInfo] = useState({});
  const [gameNights, setGameNights] = useState([]);
  // const [activeUsers, setActiveUsers] = useState([]);
  // const [inactiveUsers, setInactiveUsers] = useState([]);

  const getGroupInfo = (groupId) => {
    groupData.getSingleGroup(groupId).then((res) => {
      setGroupInfo(res);
    });
  };

  const getGameNights = (groupId) => {
    gameNightData.getAllGroupGameNights(groupId).then((res) => {
      setGameNights(res);
    });
  };

  useEffect(() => {
    const groupId = groupDetailsProps.match.params.id;
    getGroupInfo(groupId);
    getGameNights(groupId);
  }, []);

  const showGameNights = () => (
    gameNights.map((night) => (
      <GameNightCard key={night.id} night={night} />
    ))
  );

  return (
    <div>
    <div className="d-flex col-wrap justify-content-end">
      <div className="mt-5">
        <div>
    <h1>{groupInfo.name}</h1>
    </div>
    <p>{groupInfo.description}</p>
    <div>
    <Button>Create a game night</Button>
    </div>
    </div>
    <div>
      <img className="w-75 mt-5 mb-4" src={groupInfo.image} alt={groupInfo.name} />
    </div>
    </div>
    <div className="group-card-container">
    {showGameNights()}
    </div>
  </div>
  );
};

export default GroupDetails;
