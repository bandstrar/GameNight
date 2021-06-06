import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import gameNightData from '../helpers/data/gameNightData';
import groupData from '../helpers/data/groupData';
import nightGameData from '../helpers/data/nightGameData';
import gameData from '../helpers/data/gameData';
import NightGameCard from '../components/Cards/nightGameCard';
import GroupGameCard from '../components/Cards/groupGameCard';

const GameNight = (props) => {
  const gameNightProps = props;
  const [nightInfo, setNightInfo] = useState({});
  const [groupInfo, setGroupInfo] = useState({});
  const [nightGames, setNightGames] = useState([]);
  const [groupGames, setGroupGames] = useState([]);
  const [nightView, setNightView] = useState(true);

  const getNightInfo = (nightId) => {
    gameNightData.getSingleGameNight(nightId).then((res) => {
      setNightInfo(res);
      nightGameData.getByNightId(res.id).then((re) => {
        setNightGames(re);
      });
      groupData.getSingleGroup(res.groupId).then((response) => {
        setGroupInfo(response);
      });
      gameData.getbyGroupId(res.groupId).then((response) => {
        setGroupGames(response);
      });
    });
  };

  const showNightGames = () => (
    nightGames.map((game) => (
      <NightGameCard key={game.id} game={game} />
    ))
  );

  const showGroupGames = () => (
    groupGames.map((game) => (
      <GroupGameCard key={game.id} game={game} nightId={nightInfo.id} />
    ))
  );

  useEffect(() => {
    const nightId = gameNightProps.match.params.id;
    getNightInfo(nightId);
  }, []);

  return (
    <div>
      <div className="d-flex col-wrap justify-content-end">
        <div className="single-group-header mt-5">
          <div>
      <h1>{nightInfo.title}</h1>
      </div>
      <p>{nightInfo.description}</p>
      </div>
      <div>
        <img className="w-50 mt-5 mb-4" src={groupInfo.image} alt={`${groupInfo.name}`} />
      </div>
      </div>
      <div className="d-flex justify-content-around">
      <Button onClick={() => setNightView(true)}>Game Night Games</Button>
      <Button onClick={() => setNightView(false)}>Find a Game to Add</Button>
      </div>
      <div className="group-card-container">
      {nightView ? showNightGames() : showGroupGames()}
      </div>
    </div>
  );
};

export default GameNight;
