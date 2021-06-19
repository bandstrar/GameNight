import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import gameData from '../helpers/data/gameData';
import UserGameCard from '../components/Cards/userGameCard';
import GameFilterForm from '../components/Forms/GameFilterForm';
import AppModal from '../components/AppModal';
import GameForm from '../components/Forms/GameForm';

const Games = (props) => {
  const userInfo = props;
  const [userGames, setUserGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [didMount, setDidMount] = useState(false);

  const getUserGames = (userId) => {
    gameData.getByUserId(userId).then((response) => {
      setUserGames(response);
    });
  };

  useEffect(() => {
    getUserGames(userInfo.user.id);
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  const showFilteredGames = () => (
    filteredGames.map((game) => (
      <UserGameCard key={game.id} game={game} />
    ))
  );

  const filterGames = (filterData) => {
    const gamesFiltered = userGames.filter((game) => game.title.toLowerCase().includes(filterData.title.toLowerCase())
    && game.minPlayers >= (filterData.minNumber || 1)
    && game.maxPlayers <= (filterData.maxNumber || 99)
    && (filterData.weight !== 'any' ? game.weight === Number(filterData.weight) : game.weight >= 0)
    && game.lengthInMinutes <= (filterData.lengthInMinutes || 1000)
    && game.genre.toLowerCase().includes(filterData.genre.toLowerCase()));
    setFilteredGames(gamesFiltered);
    setFiltered(true);
  };

  const showGames = () => (
    userGames.map((game) => (
      <UserGameCard key={game.id} game={game} />
    ))
  );

  if (!didMount) {
    return null;
  }

  return (
    <div>
      <div className="d-flex col-wrap">
        <div className="single-group-header">
          <div>
      <h1>My Games</h1>
      </div>
      <div className="group-button-container">
      <AppModal modalTitle='Add a Game' buttonLabel={'Add a Game'}>
        <GameForm dbUserId={userInfo.user.id} onUpdate={() => getUserGames(userInfo.user.id)} />
      </AppModal>
      </div>
      </div>
      <div>
        <img className="header-image" src={'https://i.imgur.com/W70zX0K.jpg'} alt={'A collection of board games.'} />
      </div>
      </div>
      <AppModal modalTitle='Filter Games' buttonLabel={'Filter Games'}><GameFilterForm filterGames={filterGames} /></AppModal>
      <Button onClick={() => setFiltered(false)}>Clear Filter</Button>
      <div className="group-card-container">
      {filtered ? showFilteredGames() : showGames()}
      </div>
    </div>
  );
};

export default Games;
