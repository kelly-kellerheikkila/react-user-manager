import UserConstants from './UserConstants';
import Utils from '../../common/Utils';
import UserMockData from './UserMockData'; // only used for mocking a REST response for demo


// noinspection JSUnusedGlobalSymbols
export function adminUserCreate(newUser) {
  return (dispatch) => {
    const url = UserConstants.ApiEndpoints.USER;
    dispatch({ type: UserConstants.ActionTypes.USER_CREATE, newUser });
    return Utils.fetch(
      `${url}?${Utils.getQueryString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      }
      , {} // mock this AJAX call due to example
    )
      .catch(error => {
        dispatch({ type: UserConstants.ActionTypes.USER_CHANGE_FAILURE });
        dispatch(Utils.fetchErrorModal(error));
      });
  };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserDelete(user) {
  return (dispatch) => {
    const url =
      `${UserConstants.ApiEndpoints.USER}/${encodeURIComponent(user.userID)}?${Utils.getQueryString()}`;
    dispatch({ type: UserConstants.ActionTypes.USER_DELETE, user });
    return Utils.fetch(`${url}?${Utils.getQueryString()}`, { method: 'DELETE' }, {}) // mock AJAX call due to example
      .then(() => dispatch({ type: UserConstants.ActionTypes.USER_DELETE_SUCCESS }))
      .catch(error => {
        dispatch({ type: UserConstants.ActionTypes.USER_CHANGE_FAILURE });
        dispatch(Utils.fetchErrorModal(error));
      });
  };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserHideNewForm() {
  return { type: UserConstants.ActionTypes.USER_HIDE_NEW_FORM };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserHideWhatIsThis() {
  return { type: UserConstants.ActionTypes.USER_HIDE_WHAT_IS_THIS };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserFetch(force = false) {
  return (dispatch, getState) => {
    // fetch users only if they have not already been fetched
    const pkgs = getState().admin.user.pkgs;
    if (Object.keys(pkgs).length > 0 && force === false) {
      return null;
    }

    const url = UserConstants.ApiEndpoints.USER;
    dispatch({ type: UserConstants.ActionTypes.USER_FETCH });
    return Utils.fetch(
      `${url}?${Utils.getQueryString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      , UserMockData.mockUsers // mock this AJAX call due to example
    )
      .then(json => {
        dispatch({
          type: UserConstants.ActionTypes.USER_FETCH_SUCCESS,
          pkgs: json.pkgs,
          users: json.users,
        });
      })
      .catch(error => { dispatch(Utils.fetchErrorModal(error)); });
  };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserShowWhatIsThis() {
  return { type: UserConstants.ActionTypes.USER_SHOW_WHAT_IS_THIS };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserShowNewForm() {
  return { type: UserConstants.ActionTypes.USER_SHOW_NEW_FORM };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserUpdateFieldValidations(userID, fieldID, errMsg, isValid, value) {
  return { type: UserConstants.ActionTypes.USER_UPDATE_VALIDATION, userID, fieldID, errMsg, isValid, value };
}

// noinspection JSUnusedGlobalSymbols
export function adminUserValueChanged(initialUser, pkg, isEnabled) {
  const user = initialUser;
  user[pkg].value = isEnabled;
  return (dispatch) => {
    const url = UserConstants.ApiEndpoints.USER_SINGLE;
    dispatch({ type: UserConstants.ActionTypes.USER_CHANGE, user, changedPkg: pkg, isEnabled });
    return Utils.fetch(
      `${url}?${Utils.getQueryString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
      , {} // mock this AJAX call due to example
    )
      .catch(error => {
        dispatch({ type: UserConstants.ActionTypes.USER_CHANGE_FAILURE });
        dispatch(Utils.fetchErrorModal(error));
      });
  };
}
