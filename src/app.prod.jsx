import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import AdminRoutes from './admin/AdminRoutes';
import store from './common/store';
import * as AppActionCreators from './common/AppActionCreators';

// preload permissions
store.dispatch(AppActionCreators.appFetchPermissions());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory} routes={[AdminRoutes]} />
    </div>
  </Provider>,
  document.getElementById('app')
);
