import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../common/App';
import OtherPackageMenu from './OtherPackageMenu';

export default (
  <Route path="/otherPackage" component={App}>
    <IndexRoute component={OtherPackageMenu} />
  </Route>
);
