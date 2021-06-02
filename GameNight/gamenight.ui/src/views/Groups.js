import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
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
      <div className="d-flex col-wrap justify-content-end">
        <div className="mt-5">
          <div>
      <h1>My Groups</h1>
      </div>
      <div className="group-button-container">
      <Button className="mr-3">Find a Group</Button>
      <Button>Create a Group</Button>
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
