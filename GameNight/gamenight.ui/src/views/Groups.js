import React, { useState, useEffect } from 'react';
import groupData from '../helpers/data/groupData';
import GroupCard from '../components/Cards/groupCard';
import AppModal from '../components/AppModal';
import GroupForm from '../components/Forms/GroupForm';

const Groups = (props) => {
  const userInfo = props;
  const [userGroups, setUserGroups] = useState([]);

  const getGroups = (userId) => {
    groupData.getUserGroups(userId).then((response) => {
      setUserGroups(response);
    });
  };

  useEffect(() => {
    getGroups(userInfo.user.id);
  }, []);

  const showGroups = () => (
    userGroups.map((group) => (
      <GroupCard key={group.id} group={group} />
    ))
  );

  return (
    <div>
      <div className="d-flex col-wrap justify-content-end">
        <div className="mt-5">
          <div>
      <h1>My Groups</h1>
      </div>
      <div className="group-button-container">
      <AppModal modalTitle={'Create a Group'} buttonLabel={'Create a Group'}><GroupForm dbUserId={userInfo.user.id} onUpdate={() => getGroups(userInfo.user.id)}/></AppModal>
      </div>
      </div>
      <div>
        <img className="w-50 mt-5 mb-4" src={'https://i.imgur.com/HLoG7EM.jpg'} alt={'A group of young adults playing a board game.'} />
      </div>
      </div>
      <div className="group-card-container">
      {showGroups()}
      </div>
    </div>
  );
};

export default Groups;
