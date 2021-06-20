/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
import DeleteForm from '../components/Forms/DeleteForm';
import voteData from '../helpers/data/nightGameVoteData';
import TabPanel from '../components/TabPanel';
import a11yProps from '../helpers/a11yProps';

const GameNight = (props) => {
  const gameNightProps = props;
  const [nightInfo, setNightInfo] = useState({});
  const [groupInfo, setGroupInfo] = useState({});
  const [nightGames, setNightGames] = useState([]);
  const [groupGames, setGroupGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [value, setValue] = useState(0);

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
    nightGameData.addGameToNight(gameInfo).then(() => {
      getNightInfo(nightInfo.id);
    });
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

  const confirmDelete = (nightId) => {
    voteData.removeByNightId(nightId).then(() => {
      nightGameData.removeByNightId(nightId).then(() => {
        gameNightData.deleteGameNight(nightId).then(() => {
          gameNightProps.history.goBack();
        });
      });
    });
  };

  useEffect(() => {
    const nightId = gameNightProps.match.params.id;
    getNightInfo(nightId);
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!didMount) {
    return null;
  }

  const nightDate = new Date(nightInfo.date);

  return (
    <div>
      <div className="d-flex col-wrap">
        <div className="single-group-header">
          <div>
      <h1>{nightInfo.title}</h1>
      </div>
      <h3 className="mt-5">{nightDate.toDateString()}</h3>
      <p className="mt-5">{nightInfo.description}</p>
      {currentUser.admin === true
      && <div className="mt-5"><AppModal modalTitle={'Update Game Night'} buttonLabel={'Update Game Night'}>
      <GameNightForm night={nightInfo} groupId={groupInfo.id} onUpdate={() => getNightInfo(nightInfo.id)}/>
      </AppModal>
      <AppModal modalTitle='Delete Game Night' buttonLabel={'Delete Game Night'}>
      <DeleteForm onDelete={() => confirmDelete(nightInfo.id)} />
        </AppModal></div>}
      </div>
      <div>
        <img className="header-image" src={groupInfo.image} alt={`${groupInfo.name}`} />
      </div>
      </div>
      <AppBar className="tabs-bar" position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Game Night Games" {...a11yProps(0)} />
          <Tab label="Find a Game to Add" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div className="group-card-container">
      {showNightGames()}
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AppModal modalTitle='Filter Games' buttonLabel={'Filter Games'}><GameFilterForm filterGames={filterGames} /></AppModal>
      <Button onClick={() => setFiltered(false)}>Clear Filter</Button>
      <div className="group-card-container">
      {(filtered ? showFilteredGames() : showGroupGames())}
      </div>
      </TabPanel>
      </div>
  );
};

export default GameNight;
