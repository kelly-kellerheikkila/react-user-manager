import keyMirror from 'keymirror';
import AppConstants from '../../common/AppConstants';

class UserConstants {
}

UserConstants.ApiEndpoints = {
  USER: `${AppConstants.SERVER_BASE_URL}/api/admin/users`,
  USER_SINGLE: `${AppConstants.SERVER_BASE_URL}/api/admin/user`,
};

UserConstants.ActionTypes = keyMirror({
  USER_CHANGE: null,
  USER_CHANGE_FAILURE: null,
  USER_DELETE: null,
  USER_DELETE_SUCCESS: null,
  USER_FETCH: null,
  USER_FETCH_SUCCESS: null,
  USER_HIDE_NEW_FORM: null,
  USER_HIDE_WHAT_IS_THIS: null,
  USER_NEW_SUBMIT: null,
  USER_SHOW_NEW_FORM: null,
  USER_SHOW_WHAT_IS_THIS: null,
  USER_UPDATE_VALIDATION: null,
});

export default UserConstants;
