import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import { baseUrl } from '../../helpers/config.json';

const Auth = () => {
  const loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((cred) => {
      const user = cred.additionalUserInfo.profile;
      if (cred.additionalUserInfo.isNewUser) {
        // get uid from firebase, the rest of this info is just made up, whatever registration information you're already saving to the database
        const userInfo = {
          firebaseid: cred.user.uid,
          firstname: user.given_name,
          lastname: user.family_name,
          email: user.email,
          userImage: cred.user.photoURL

          // cred here is the created, logged in user from firebase
        };
        // save the user to the the api
        axios.post(`${baseUrl}/users`, userInfo);
      }
      window.location.reload();
    });
  };

  const history = useHistory();

  const logoutClickEvent = () => {
    firebase.auth().signOut();
    history.push('/');
    window.location.reload();
  };

  const renderAuthBtn = () => {
    const user = firebase.auth().currentUser;
    let authBtn;
    if (user) {
      authBtn = <button className='btn btn-secondary mt-1 auth-btn' onClick={logoutClickEvent}>
          Logout
        </button>;
    } else {
      authBtn = <button className='btn btn-secondary mt-1 auth-btn' onClick={(e) => loginClickEvent(e)}>
          Login
        </button>;
    }
    return authBtn;
  };

  return (
    <div className='Auth'>
    {renderAuthBtn()}
  </div>
  );
};

export default Auth;
