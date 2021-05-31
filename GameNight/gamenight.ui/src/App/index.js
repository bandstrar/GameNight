/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import Routes from '../helpers/Routes';
import MyNavbar from '../components/MyNavbar';
import fbConnection from '../helpers/data/connection';
import userData from '../helpers/data/userData';

fbConnection();

const App = () => {
  const [fbUser, setFbUser] = useState('');
  const [dbUser, setDbUser] = useState({});

  useEffect(() => {
    const removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user.getIdToken().then((token) => sessionStorage.setItem('token', token));
        setFbUser(user);
        userData.getUserByUid(user.uid).then((currentUser) => {
          setDbUser(currentUser[0]);
        });
      } else {
        setFbUser(false);
      }
    });
    return () => {
      removeListener();
    };
  }, []);

  return (
      <div className="App">
        <Router>
          <MyNavbar realUser={dbUser} />
          <Routes user={fbUser} realUser={dbUser} />
        </Router>
      </div>
  );
};

export default App;
