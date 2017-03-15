import keyMirror from 'keymirror';

class AppConstants {}

AppConstants.SERVER_BASE_URL = 'https://example.com';

AppConstants.ApiEndpoints = {
  APP_PERMISSIONS: `${AppConstants.SERVER_BASE_URL}/api/permissions`,
};

AppConstants.ActionTypes = keyMirror({

  // null action will always be ignored. Used if action creator has conditional and might not always send action
  APP_NULL: null,

  APP_PERMISSIONS_FETCH: null,
  APP_PERMISSIONS_FETCH_SUCCESS: null,
  APP_CLOSE_ERROR_MODAL: null,
  APP_SET_ACTIVE_PACKAGE: null,
  APP_SET_PAGE_TITLE: null,
  APP_SHOW_ERROR_MODAL: null,
});

export default AppConstants;
