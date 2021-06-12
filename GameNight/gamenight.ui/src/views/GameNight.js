/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import gameNightData from '../helpers/data/gameNightData';
import groupData from '../helpers/data/groupData';
import nightGameData from '../helpers/data/nightGameData';
import gameData from '../helpers/data/gameData';
import groupUserData from '../helpers/data/groupUserData';
import NightGameCard from '../components/Cards/nightGameCard';
import GroupGameCard from '../components/Cards/groupGameCard';
import GameFilterForm from '../components/Forms/GameFilterForm';
import AppModal from '../components/AppModal';
import GameNightForm from '../components/Forms/GameNightForm';

const GameNight = (props) => {
  const gameNightProps = props;
  const [nightInfo, setNightInfo] = useState({});
  const [groupInfo, setGroupInfo] = useState({});
  const [nightGames, setNightGames] = useState([]);
  const [groupGames, setGroupGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [nightView, setNightView] = useState(true);
  const [didMount, setDidMount] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const getNightInfo = (nightId) => {
    gameNightData.getSingleGameNight(nightId).then((res) => {
      setNightInfo(res);
      nightGameData.getByNightId(res.id).then((re) => {
        setNightGames(re);
        gameData.getbyGroupId(res.groupId).then((response) => {
          const nightlessGames = [];
          response.forEach((game) => {
            const included = (nightGame) => nightGame.gameId === game.id;
            if (!re.some(included)) {
              nightlessGames.push(game);
            }
          });
          setGroupGames(nightlessGames);
        });
      });
      groupData.getSingleGroup(res.groupId).then((response) => {
        setGroupInfo(response);
      });
      groupUserData.getCurrentGroupUser(gameNightProps.dbUser.id, res.groupId).then((response) => {
        setCurrentUser(response);
      });
    });
  };

  const showNightGames = () => (
    nightGames.map((game) => (
      <NightGameCard key={game.id} game={game} dbUserId={gameNightProps.dbUser.id} />
    ))
  );

  const addGameToNight = (gameInfo) => {
    nightGameData.addGameToNight(gameInfo);
    getNightInfo(nightInfo.id);
  };

  const showGroupGames = () => (
    groupGames.map((game) => (
      <GroupGameCard key={game.id} game={game} nightId={nightInfo.id} addGame={addGameToNight} />
    ))
  );

  const showFilteredGames = () => (
    filteredGames.map((game) => (
      <GroupGameCard key={game.id} game={game} nightId={nightInfo.id} addGame={addGameToNight} />
    ))
  );

  const filterGames = (filterData) => {
    const gamesFiltered = groupGames.filter((game) => game.title.toLowerCase().includes(filterData.title.toLowerCase())
    && game.minPlayers >= (filterData.minNumber || 1)
    && game.maxPlayers <= (filterData.maxNumber || 99)
    && (filterData.weight !== 'any' ? game.weight === Number(filterData.weight) : game.weight >= 0)
    && game.lengthInMinutes <= (filterData.lengthInMinutes || 1000)
    && game.genre.toLowerCase().includes(filterData.genre.toLowerCase()));
    setFilteredGames(gamesFiltered);
    setFiltered(true);
  };

  useEffect(() => {
    const nightId = gameNightProps.match.params.id;
    getNightInfo(nightId);
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  const nightDate = new Date(nightInfo.date);

  return (
    <div>
      <div className="d-flex col-wrap justify-content-end">
        <div className="single-group-header mt-5">
          <div>
      <h1>{nightInfo.title}</h1>
      </div>
      <h3>{nightDate.toDateString()}</h3>
      <p>{nightInfo.description}</p>
      {currentUser.admin === true && <AppModal modalTitle={'Update Game Night'} buttonLabel={'Update Game Night'}>
      <GameNightForm night={nightInfo} groupId={groupInfo.id} onUpdate={() => getNightInfo(nightInfo.id)}/>
      </AppModal>}
      </div>
      <div>
        <img className="w-50 mt-5 mb-4" src={groupInfo.image} alt={`${groupInfo.name}`} />
      </div>
      </div>
      <div className="ml-5 d-flex justify-content-around">
      <Button onClick={() => setNightView(true)}>Game Night Games</Button>
      <Button onClick={() => setNightView(false)}>Find a Game to Add</Button>
      </div>
      {!nightView && <AppModal modalTitle='Filter Games' buttonLabel={'Filter Games'}><GameFilterForm filterGames={filterGames} /></AppModal>}
      {!nightView && <Button onClick={() => setFiltered(false)}>Clear Filter</Button>}
      <div className="group-card-container">
      {nightView ? showNightGames()
        : (filtered ? showFilteredGames() : showGroupGames())}
      </div>
    </div>
  );
};

export default GameNight;
