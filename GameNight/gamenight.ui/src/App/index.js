import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import Routes from '../helpers/Routes';
import fbConnection from '../helpers/data/connection';
import userData from '../helpers/data/userData';

fbConnection();

class App extends React.Component {
    state = {
      user: '',
      realUser: {},
    };

    componentDidMount() {
      this.removeListener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // user.getIdToken().then((token) => sessionStorage.setItem('token', token));
          this.setState({ user });
          userData.getUserByUid(user.uid).then((currentUser) => {
            this.setState({ realUser: currentUser[0] });
          });
        } else {
          this.setState({ user: false });
        }
      });
    }

    componentWillUnmount() {
      this.removeListener();
    }

    render() {
      return (
      <div className="App">
        <Router>
          <Routes user={this.state.user} realUser={this.state.realUser} />
        </Router>
      </div>
      );
    }
}

export default App;
