import UserConstants from './UserConstants';
import AppConstants from '../../common/AppConstants';
import * as UserActionCreators from './UserActionCreators';

class UserReducer {
  static getFieldValidations(state = { fullName: false, userID: false }, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_SHOW_NEW_FORM:
        // set all validations to true, since this is pre-existing
        return { fullName: false, userID: false };

      case UserConstants.ActionTypes.USER_UPDATE_VALIDATION:
        return Object.assign({}, state, { [action.fieldID]: action.isValid });

      default:
        return state;
    }
  }

  static getNumColumns(state = 2, action, pkgs) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_FETCH:
        return Object.keys(pkgs).length + 2;

      case UserConstants.ActionTypes.USER_FETCH_SUCCESS:
        return Object.keys(pkgs).length + 2;

      default:
        return state;
    }
  }

  static getPkgs(state = {}, action, users = {}) {
    const mutablePkgs = state;
    const mutableFreshPkgs = {};

    const recalculateCurrentUsers = (pkg, isEnabled) => {
      const currentUserChange = isEnabled ? 1 : -1;
      return state[pkg].currentUsers + currentUserChange;
    };

    const deepMerge = (pkg, prop, value) => {
      const mutablePkg = state[pkg];
      mutablePkg[prop] = value;
      return mutablePkg;
    };

    switch (action.type) {
      case UserConstants.ActionTypes.USER_CHANGE:
        return Object.assign({}, state,
          {
            [action.changedPkg]:
            deepMerge(action.changedPkg, 'currentUsers', recalculateCurrentUsers(action.changedPkg, action.isEnabled)),
          });

      case UserConstants.ActionTypes.USER_CHANGE_FAILURE:
        // go fetch users again
        UserActionCreators.adminUserFetch(true);
        return null;

      case UserConstants.ActionTypes.USER_DELETE:
        Object.keys(action.user).forEach(pkg => {
          if (pkg !== 'userID' && pkg !== 'formIsValid' && pkg !== 'userIDErrMsg' && pkg !== 'fullName') {
            if (action.user[pkg]) {
              mutablePkgs[pkg].currentUsers = recalculateCurrentUsers(pkg, false);
            }
          }
        });
        return Object.assign({}, state, mutablePkgs);

      case UserConstants.ActionTypes.USER_FETCH_SUCCESS:
        action.pkgs.forEach(pkg => {
          mutableFreshPkgs[pkg.id] = pkg;
          mutableFreshPkgs[pkg.id].currentUsers = 0;
          Object.keys(users).forEach(user => {
            if (users[user][pkg.id]) {
              mutableFreshPkgs[pkg.id].currentUsers++;
            }
          });
        });
        return Object.assign({}, mutableFreshPkgs);

      case UserConstants.ActionTypes.USER_NEW_SUBMIT:
        Object.keys(action.newUser).forEach(pkg => {
          if (pkg !== 'userID'
            && pkg !== 'formIsValid'
            && pkg !== 'userIDErrMsg'
            && pkg !== 'fullName'
            && action.newUser[pkg]) {
            mutablePkgs[pkg].currentUsers = recalculateCurrentUsers(pkg, action.newUser[pkg]);
          }
        });
        return Object.assign({}, state, mutablePkgs);

      default:
        return state;
    }
  }

  static getShowCreateButton(state = false, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_HIDE_NEW_FORM:
        return true;

      case UserConstants.ActionTypes.USER_NEW_SUBMIT:
        return true;

      case UserConstants.ActionTypes.USER_SHOW_NEW_FORM:
        return false;

      case UserConstants.ActionTypes.USER_FETCH:
        return false;

      case UserConstants.ActionTypes.USER_FETCH_SUCCESS:
        return true;

      default:
        return state;
    }
  }

  static getShowEditFields(state = true, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_HIDE_NEW_FORM:
        return true;

      case UserConstants.ActionTypes.USER_NEW_SUBMIT:
        return true;

      case UserConstants.ActionTypes.USER_SHOW_NEW_FORM:
        return false;

      default:
        return state;
    }
  }

  static getShowNewUserFields(state = false, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_HIDE_NEW_FORM:
        return false;

      case UserConstants.ActionTypes.USER_NEW_SUBMIT:
        return false;

      case UserConstants.ActionTypes.USER_SHOW_NEW_FORM:
        return true;

      default:
        return state;
    }
  }

  static getShowTableSpinner(state = true, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_FETCH:
        return true;

      case UserConstants.ActionTypes.USER_FETCH_SUCCESS:
        return false;

      case AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL:
        return false;

      default:
        return state;
    }
  }

  static getShowWhatIsThis(state = false, action) {
    switch (action.type) {
      case UserConstants.ActionTypes.USER_HIDE_WHAT_IS_THIS:
        return false;

      case UserConstants.ActionTypes.USER_SHOW_WHAT_IS_THIS:
        return true;

      default:
        return state;
    }
  }

  static getUsers(state = {}, action) {
    const mutableFreshUsers = {};
    const mutableUsers = state;
    const pkgCurrentUsers = [];

    switch (action.type) {
      case UserConstants.ActionTypes.USER_CHANGE:
        return Object.assign({}, state, { [action.user.userID]: action.user });

      case UserConstants.ActionTypes.USER_DELETE:
        delete mutableUsers[action.user.userID];
        return Object.assign({}, state, mutableUsers);

      case UserConstants.ActionTypes.USER_FETCH_SUCCESS:
        action.users.forEach(user => {
          mutableFreshUsers[user.userID] = user;
          Object.keys(user).forEach(pkg => {
            if (pkg !== 'fullName' && pkg !== 'userID' && user[pkg]) {
              pkgCurrentUsers[pkg] = pkgCurrentUsers[pkg] ? pkgCurrentUsers[pkg] + 1 : 1;
            }
          });
        });
        return Object.assign({}, mutableFreshUsers);

      case UserConstants.ActionTypes.USER_FETCH:
        return {};

      case UserConstants.ActionTypes.USER_NEW_SUBMIT:
        mutableUsers[action.newUser.userID] = action.newUser;
        return Object.assign({}, state, mutableUsers);

      default:
        return state;
    }
  }


  static user(state = {}, action) {
    const users = UserReducer.getUsers(state.users, action);
    const pkgs = UserReducer.getPkgs(state.pkgs, action, users);
    return {
      fieldValidations: UserReducer.getFieldValidations(state.fieldValidations, action),
      numColumns: UserReducer.getNumColumns(state.numColumns, action, pkgs),
      pkgs,
      showCreateButton: UserReducer.getShowCreateButton(state.showCreateButton, action),
      showEditFields: UserReducer.getShowEditFields(state.showEditFields, action),
      showNewUserFields: UserReducer.getShowNewUserFields(state.showNewUserFields, action),
      showTableSpinner: UserReducer.getShowTableSpinner(state.showTableSpinner, action),
      showWhatIsThis: UserReducer.getShowWhatIsThis(state.showWhatIsThis, action),
      users,
    };
  }
}

export default UserReducer;
