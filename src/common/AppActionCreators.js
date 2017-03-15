import Utils from './Utils';
import AppConstants from './AppConstants';
import AppMockData from './AppMockData'; // only used for mocking a REST response for demo

// noinspection JSUnusedGlobalSymbols
export function appCloseErrorModal() {
  return { type: AppConstants.ActionTypes.APP_CLOSE_ERROR_MODAL };
}

// noinspection JSUnusedGlobalSymbols
export function appFetchPermissions() {
  // fetch users only if they have not already been fetched
  return (dispatch, getState) => {
    let permissions = getState().app.permissions;
    if (Object.keys(permissions).length > 0) {
      return null;
    }

    permissions = localStorage.getItem('permissions');
    if (permissions !== null) {
      // Permissions previously retrieved and is in local storage
      permissions = JSON.parse(permissions);
      dispatch({ type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS, permissions });
    } else {
      const url = AppConstants.ApiEndpoints.APP_PERMISSIONS;
      dispatch({ type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH });
      Utils.fetch(
        `${url}?${Utils.getQueryString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        , AppMockData.mockPermissions // mock this AJAX call due to example
      )
        .then(json => {
          // save to local storage to avoid unnecessary hits to server, even outside of Redux
          localStorage.setItem('permissions', JSON.stringify(json));
          dispatch({ type: AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS, permissions: json });
        })
        .catch(error => {
          dispatch(Utils.fetchErrorModal(error));
        });
    }
    return null;
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
