import React from 'react';

const Home = (props) => {
  const homeProps = props;

  return (
    <div className="home-view">
      <div className="home-container">
        <h1>Welcome to GameNight!</h1>
        {homeProps.dbUser
          ? <><p>The goal of GameNight is to make your next game night easier by choosing the
          board games your group will play ahead of time. This means more time for gaming!</p>

          <p>First you’ll need to create a group and invite your friends, or join a group that
          someone else has already made.</p>

          <p>Next you should start adding games that you own to your GameNight game
          collection. This makes it easy to find and choose games to play on your next game
          night!</p>

          <p>Then you can start planning your next game night with your group! Have fun!</p></>
          : <><h2>Log in to get started!</h2></>
        }
          </div>
    </div>
  );
};

export default Home;
