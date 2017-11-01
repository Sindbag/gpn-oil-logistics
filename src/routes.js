import React from 'react';
import { Route } from 'react-router';
import {
  App,
  NotFound,
  UserPage,
  AZSTablePage
} from 'containers';
import Auth from './containers/Auth/Auth';
import AZSPage from './containers/AZSPage/AZSPage';

export default () => {
  const routes = (
    <Route>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={App}>
        <Route path="/map" component={UserPage} />
        <Route path="/list" component={AZSTablePage} />
        <Route path="/azs/:idx" component={AZSPage} />
        <Route path="/404" component={NotFound} />
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
  );
  return routes;
};
