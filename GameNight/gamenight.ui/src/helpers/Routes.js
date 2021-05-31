import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Groups from '../views/Groups';
import Games from '../views/Games';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={() => <Home />} />
    <Route exact path='/my-groups' component={() => <Groups />} />
    <Route exact path='/my-games' component={() => <Games />} />
  </Switch>
);

export default Routes;
