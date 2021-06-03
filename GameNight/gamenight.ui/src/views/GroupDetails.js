import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import groupData from '../helpers/data/groupData';
import gameNightData from '../helpers/data/gameNightData';
import groupUserData from '../helpers/data/groupUserData';
import GameNightCard from '../components/Cards/gameNightCard';

const GroupDetails = (props) => {
  const groupDetailsProps = props;

  const [groupInfo, setGroupInfo] = useState({});
  const [gameNights, setGameNights] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [currentGroupUser, setCurrentGroupUser] = useState({});

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

  const getActiveUsers = (groupId) => {
    groupUserData.getActiveGroupUsers(groupId).then((res) => {
      setActiveUsers(res);
    });
  };

  const getInactiveUsers = (groupId) => {
    groupUserData.getInactiveGroupUsers(groupId).then((res) => {
      setInactiveUsers(res);
    });
  };

  const getCurrentUser = (userId, groupId) => {
    groupUserData.getCurrentGroupUser(userId, groupId).then((res) => {
      setCurrentGroupUser(res);
    });
  };

  useEffect(() => {
    const groupId = groupDetailsProps.match.params.id;
    getGroupInfo(groupId);
    getGameNights(groupId);
    getActiveUsers(groupId);
    getInactiveUsers(groupId);
    getCurrentUser(groupDetailsProps.dbUser.id, groupId);
  }, []);

  const showGameNights = () => (
    gameNights.map((night) => (
      <GameNightCard key={night.id} night={night} />
    ))
  );

  const showActiveUsers = () => (
    activeUsers.map((user) => (
      <p key={user.id}>{user.user.firstName} {user.user.lastName}</p>
    ))
  );

  const showInactiveUsers = () => (
    inactiveUsers.map((user) => (
      <p key={user.id}>{user.user.firstName} {user.user.lastName}</p>
    ))
  );

  return (
    <div>
    <div className="d-flex col-wrap justify-content-end">
      <div className="single-group-header mt-5">
        <div>
    <h1>{groupInfo.name}</h1>
    </div>
    <p>{groupInfo.description}</p>
    <Button>Create a game night</Button>
    </div>
    <div>
      <img className="w-50 mt-5 mb-4" src={groupInfo.image} alt={groupInfo.name} />
    </div>
    </div>
    <div className="d-flex col-wrap">
      <div className="d-flex col-wrap">
      <div className="group-active-users">
        <h4>Active Members</h4>
        {showActiveUsers()}
      </div>
      {currentGroupUser.admin === true && <div className="group-inactive-users">
        <h4>Inactive Members</h4>
        {showInactiveUsers()}
      </div>}
      </div>
    <div className="group-card-container">
    {showGameNights()}
    </div>
    </div>
  </div>
  );
};

export default GroupDetails;
