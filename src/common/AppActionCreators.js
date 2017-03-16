import Utils from './Utils';
import AppConstants from './AppConstants';
import AppMockData from './AppMockData'; // only used for mocking a REST response for demo

// noinspection JSUnusedGlobalSymbols
export function appCloseErrorModal() {
  return { type: AppConstants.ActionTypes.APP_CLOSE_ERROR_MODAL };
}

// noinspection JSUnusedGlobalSymbols
export function appFetchPermissions(forceAJAXMock = true) {
  // fetch users only if they have not already been fetched
  return (dispatch) => {
    const url = AppConstants.ApiEndpoints.APP_PERMISSIONS;
    const mockData = forceAJAXMock ? AppMockData.mockPermissions : null;
    dispatch({ type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH });
    return Utils.fetch(
      `${url}?${Utils.getQueryString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      , mockData // mock this AJAX call due to demo
    )
      .then(json => {
        dispatch({ type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS, permissions: json });
      })
      .catch(error => {
        dispatch(Utils.fetchErrorModal(error));
      });
  };
}


// noinspection JSUnusedGlobalSymbols
export function appSetActivePkg(pkg) {
  return { type: AppConstants.ActionTypes.APP_SET_ACTIVE_PACKAGE, pkg };
}

// noinspection JSUnusedGlobalSymbols
export function appSetPageTitle(pageTitle) {
  return { type: AppConstants.ActionTypes.APP_SET_PAGE_TITLE, pageTitle };
}
