import 'isomorphic-fetch';
import { config, expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as AppActionCreators from './AppActionCreators';
import AppConstants from './AppConstants';
import AppMockData from './AppMockData';

config.truncateThreshold = 0;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('AppActionCreators', () => {
  afterEach(fetchMock.restore);

  it('should close the error modal', () => {
    const actualAction = AppActionCreators.appCloseErrorModal();
    const expectedAction = { type: AppConstants.ActionTypes.APP_CLOSE_ERROR_MODAL };
    expect(actualAction).to.deep.equal(expectedAction);
  });

  it('should set the active package', () => {
    const actualAction = AppActionCreators.appSetActivePkg('Admin');
    const expectedAction = { type: AppConstants.ActionTypes.APP_SET_ACTIVE_PACKAGE, pkg: 'Admin' };
    expect(actualAction).to.deep.equal(expectedAction);
  });

  it('should set the page title', () => {
    const actualAction = AppActionCreators.appSetPageTitle('Users');
    const expectedAction = { type: AppConstants.ActionTypes.APP_SET_PAGE_TITLE, pageTitle: 'Users' };
    expect(actualAction).to.deep.equal(expectedAction);
  });

  it('should fetch a permissions object', () => {
    const url = AppConstants.ApiEndpoints.APP_PERMISSIONS;
    fetchMock.get(`begin:${url}`, AppMockData.mockPermissions);

    const expectedActions = [
      { type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH },
      { type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS, permissions: AppMockData.mockPermissions },
    ];
    const store = mockStore({ app: { permissions: {} } });

    return store.dispatch(AppActionCreators.appFetchPermissions(false))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('should catch errors fetching locations', () => {
    const url = AppConstants.ApiEndpoints.APP_PERMISSIONS;
    fetchMock.get(`begin:${url}`, 404);

    const expectedActions = [
      { type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH },
      { type: AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL },
    ];
    const store = mockStore({ app: { permissions: {} } });

    return store.dispatch(AppActionCreators.appFetchPermissions(false))
      .catch(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
