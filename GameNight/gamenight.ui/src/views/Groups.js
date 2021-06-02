import React, { useState, useEffect } from 'react';
import groupData from '../helpers/data/groupData';
import GroupCard from '../components/Cards/groupCard';

const Groups = (props) => {
  const userInfo = props;
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    groupData.getUserGroups(userInfo.user.id).then((response) => {
      setUserGroups(response);
    });
  }, []);

  const showGroups = () => (
    userGroups.map((group) => (
      <GroupCard key={group.id} group={group} />
    ))
  );

  return (
    <div>
      <h1>My Groups</h1>
      <div className="group-card-container">
      {showGroups()}
      </div>
    </div>
  );
};

export default Groups;
