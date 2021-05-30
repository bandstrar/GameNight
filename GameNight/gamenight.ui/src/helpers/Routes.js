import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={() => <Home />} />
  </Switch>
);

export default Routes;
