/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Groups from '../views/Groups';
import Games from '../views/Games';

const PrivateRoute = ({
  component: Component, dbUser, ...rest
}) => {
  const routeChecker = (route) => ((dbUser)
    ? (<Component {...route} user={dbUser} />)
    : (<h1>Please log in to view your groups.</h1>));

  return <Route {...rest} render={(props) => routeChecker(props) } />;
};

const Routes = (props) => {
  const userInfo = props;
  return (
  <Switch>
    <Route exact path='/' component={() => <Home />} />
    <PrivateRoute exact path='/my-groups' component={Groups} dbUser={userInfo.realUser} />
    <PrivateRoute exact path='/my-games' component={Games} dbUser={userInfo.realUser} />
  </Switch>
  );
};

export default Routes;
