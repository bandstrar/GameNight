import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import groupData from '../helpers/data/groupData';
import gameNightData from '../helpers/data/gameNightData';
import groupUserData from '../helpers/data/groupUserData';
import voteData from '../helpers/data/nightGameVoteData';
import nightGameData from '../helpers/data/nightGameData';
import AppModal from '../components/AppModal';
import GameNightForm from '../components/Forms/GameNightForm';
import GameNightCard from '../components/Cards/gameNightCard';
import GroupForm from '../components/Forms/GroupForm';
import DeleteForm from '../components/Forms/DeleteForm';
import TabPanel from '../components/TabPanel';
import a11yProps from '../helpers/a11yProps';

const GroupDetails = (props) => {
  const groupDetailsProps = props;

  const [groupInfo, setGroupInfo] = useState({});
  const [gameNights, setGameNights] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [currentGroupUser, setCurrentGroupUser] = useState({});
  const [didMount, setDidMount] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(0);

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

  const getAdminUsers = (groupId) => {
    groupUserData.getAdminGroupUsers(groupId).then((res) => {
      setAdminUsers(res);
    });
  };

  const getInactiveUsers = (groupId) => {
    groupUserData.getInactiveGroupUsers(groupId).then((res) => {
      setInactiveUsers(res);
    });
  };

  const getCurrentUser = (userId, groupId) => {
    groupUserData.getCurrentGroupUser(userId, groupId).then((res) => {
      if (res) {
        setCurrentGroupUser(res);
      }
    });
  };

  const deactivateUser = (userId, groupId) => {
    groupUserData.makeGroupUserInactive(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
      getAdminUsers(groupId);
    });
  };

  const approveUser = (userId, groupId) => {
    groupUserData.approveGroupUser(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
      getAdminUsers(groupId);
    });
  };

  const makeUserAdmin = (userId, groupId) => {
    groupUserData.makeGroupUserAdmin(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
      getAdminUsers(groupId);
    });
  };

  const removeUserAdmin = (userId, groupId) => {
    groupUserData.unAdminGroupUser(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
      getAdminUsers(groupId);
    });
  };

  const deactivateButton = () => {
    const currentState = clicked;
    setClicked(!currentState);
  };

  const leaveGroup = (userId, groupId) => {
    groupUserData.deleteGroupUser(userId).then(() => {
      getActiveUsers(groupId);
      getInactiveUsers(groupId);
      getAdminUsers(groupId);
      deactivateButton();
    });
  };

  useEffect(() => {
    const groupId = groupDetailsProps.match.params.id;
    getGroupInfo(groupId);
    getGameNights(groupId);
    getActiveUsers(groupId);
    getAdminUsers(groupId);
    getInactiveUsers(groupId);
    getCurrentUser(groupDetailsProps.dbUser.id, groupId);
    setDidMount(true);
    return () => setDidMount(false);
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
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => makeUserAdmin(user.id, groupDetailsProps.match.params.id)}>Make Admin<i className="approve-button fas fa-check-circle"></i></Button>}
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => deactivateUser(user.id, groupDetailsProps.match.params.id)}>Make Inactive<i className="deactivate-button fas fa-times-circle"></i></Button>}
      </div>
    ))
  );

  const showAdminUsers = () => (
    adminUsers.map((user) => (
      <div className="d-flex col-wrap justify-content-center" key={user.id}>
      <p className="mt-2">{user.user.firstName} {user.user.lastName}</p>
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => removeUserAdmin(user.id, groupDetailsProps.match.params.id)}>Remove Admin<i className="deactivate-button fas fa-times-circle"></i></Button>}
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => deactivateUser(user.id, groupDetailsProps.match.params.id)}>Make Inactive<i className="deactivate-button fas fa-times-circle"></i></Button>}
      </div>
    ))
  );

  const showInactiveUsers = () => (
    inactiveUsers.map((user) => (
      <div className="d-flex col-wrap justify-content-center" key={user.id}>
      <p className="mt-2">{user.user.firstName} {user.user.lastName}</p>
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => makeUserAdmin(user.id, groupDetailsProps.match.params.id)}>Make Admin<i className="approve-button fas fa-check-circle"></i></Button>}
      {currentGroupUser?.admin === true && <Button className="group-button" onClick={() => approveUser(user.id, groupDetailsProps.match.params.id)}>Make Active<i className="approve-button fas fa-check-circle"></i></Button>}
      </div>
    ))
  );

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

  const confirmDelete = (groupId) => {
    voteData.removeByGroupId(groupId).then(() => {
      nightGameData.removeByGroupId(groupId).then(() => {
        gameNightData.deleteByGroupId(groupId).then(() => {
          groupUserData.deleteByGroupId(groupId).then(() => {
            groupData.deleteGroup(groupId).then(() => {
              groupDetailsProps.history.goBack();
            });
          });
        });
      });
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!didMount) {
    return null;
  }

  return (
    <div>
    <div className="d-flex col-wrap">
      <div className="single-group-header">
        <div>
    <h1>{groupInfo.name}</h1>
    </div>
    <p className="mt-5">{groupInfo.description}</p>
    {(currentGroupUser?.admin === false && currentGroupUser?.isActive === true)
    && <div className="mt-5">{clicked ? (<Button disabled>You left the group!</Button>)
      : <Button onClick={() => leaveGroup(currentGroupUser.id, groupDetailsProps.match.params.id)}>Leave Group</Button>}</div>}
    {currentGroupUser?.admin === true
    && <div className="mt-5">
      <AppModal modalTitle={'Create a Game Night'} buttonLabel={'Create a Game Night'}>
      <GameNightForm groupId={groupInfo.id} onUpdate={() => getGameNights(groupInfo.id)}/>
      </AppModal>
      <AppModal modalTitle={'Update Group'} buttonLabel={'Update Group'}>
      <GroupForm group={groupInfo} dbUserId={currentGroupUser.userId} onUpdate={() => getGroupInfo(groupInfo.id)}/>
      </AppModal>
      <AppModal modalTitle={'Delete Group'} buttonLabel={'Delete Group'}>
        <DeleteForm onDelete={() => confirmDelete(groupInfo.id)}/>
      </AppModal>
      </div>}
    {!currentGroupUser
    && <>{clicked ? (<Button disabled>Request sent!</Button>)
      : <Button onClick={() => requestToJoin()}>Request to Join This Group</Button>}</>}
    </div>
    <div>
      <img className="header-image" src={groupInfo.image} alt={groupInfo.name} />
    </div>
    </div>
    <AppBar className="tabs-bar" position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Group Members" {...a11yProps(0)} />
          <Tab label="Game Nights" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className="group-card-container">
      <div className="group-members"><div className="group-users"><h4>Group Admins</h4>
        {showAdminUsers()}
        </div>
      <div className="group-users"><h4>Active Members</h4>
        {showActiveUsers()}
        </div>
      {currentGroupUser?.admin === true && <div className="group-users">
        <h4>Inactive Members</h4>
        {showInactiveUsers()}
      </div>}</div>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="group-card-container">
      {currentGroupUser?.isActive === true && showGameNights()}
      </div>
      </TabPanel>
      </div>
  );
};

export default GroupDetails;
