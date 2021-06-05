import React, { useState, useEffect } from 'react';
import gameNightData from '../helpers/data/gameNightData';

const GameNight = (props) => {
  const gameNightProps = props;
  const [nightInfo, setNightInfo] = useState({});

  const getNightInfo = (nightId) => {
    gameNightData.getSingleGameNight(nightId).then((res) => {
      setNightInfo(res);
    });
  };

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
        <img className="w-50 mt-5 mb-4" src={'https://i.imgur.com/HLoG7EM.jpg'} alt={'A group of young adults playing a board game.'} />
      </div>
      </div>
      <div className="group-card-container">
      {}
      </div>
    </div>
  );
};

export default GameNight;
