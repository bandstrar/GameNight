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
  const [clicked, setClicked] = useState(false);

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

  const deactivateUser = (userId, groupId) => {
    groupUserData.makeGroupUserInactive(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
    });
  };

  const approveUser = (userId, groupId) => {
    groupUserData.approveGroupUser(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
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
      <div className="d-flex col-wrap justify-content-center" key={user.id}>
      <p className="mt-2">{user.user.firstName} {user.user.lastName}</p>
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => deactivateUser(user.id, groupDetailsProps.match.params.id)}><i className="deactivate-button fas fa-times-circle"></i></Button>}
      </div>
    ))
  );

  const showInactiveUsers = () => (
    inactiveUsers.map((user) => (
      <div className="d-flex col-wrap justify-content-center" key={user.id}>
      <p className="mt-2">{user.user.firstName} {user.user.lastName}</p>
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => approveUser(user.id, groupDetailsProps.match.params.id)}><i className="approve-button fas fa-check-circle"></i></Button>}
      </div>
    ))
  );

  const deactivateButton = () => {
    const currentState = clicked;
    setClicked(!currentState);
  };

  const requestToJoin = () => {
    const userData = {
      userId: groupDetailsProps.dbUser.id,
      groupId: groupInfo.id,
      admin: false,
      isActive: false
    };
    groupUserData.createGroupUser(userData);
    deactivateButton();
  };

  return (
    <div>
    <div className="d-flex col-wrap justify-content-end">
      <div className="single-group-header mt-5">
        <div>
    <h1>{groupInfo.name}</h1>
    </div>
    <p>{groupInfo.description}</p>
    {currentGroupUser?.admin === true && <Button>Create a game night</Button>}
    {!currentGroupUser
    && <>{clicked ? (<Button disabled>Request sent!</Button>)
      : <Button onClick={() => requestToJoin()}>Request to Join This Group</Button>}</>}
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
      {currentGroupUser?.admin === true && <div className="group-inactive-users">
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
