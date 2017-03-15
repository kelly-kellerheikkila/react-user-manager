import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import DevTools from './common/DevTools';
import AdminRoutes from './admin/AdminRoutes';
import OtherPackageRoutes from './otherPackage/OtherPackageRoutes';
import store from './common/store';
import * as AppActionCreators from './common/AppActionCreators';

// preload permissions
store.dispatch(AppActionCreators.appFetchPermissions());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory} routes={[AdminRoutes, OtherPackageRoutes]} />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
