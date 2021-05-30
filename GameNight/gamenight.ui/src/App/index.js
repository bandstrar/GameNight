import React, { useState, useEffect } from 'react';
import './App.scss';
import firebase from 'firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import userData from '../helpers/data/userData';
import Routes from '../helpers/Routes';

fbConnection();

const App = () => {
  const [user, setUser] = useState('');
  const [realUser, setRealUser] = useState({});

  useEffect(() => {
    const removeListener = firebase.auth().onAuthStateChanged((thisUser) => {
      if (thisUser) {
        // thisUser.getIdToken().then((token) => sessionStorage.setItem('token', token));
        setUser(thisUser);
        userData.getUserByUid(user.uid).then((currentUser) => {
          setRealUser(currentUser[0]);
        });
      } else {
        setUser(false);
      }
    });
    return () => {
      removeListener();
    };
  });

  return (
    <div className="App">
    <Router>
      <Routes user={user} realUser={realUser} />
    </Router>
  </div>
  );
};

export default App;
