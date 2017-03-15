import AppConstants from '../AppConstants';

class AppReducer {
  static getActivePkg(state = null, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_SET_ACTIVE_PACKAGE:
        return action.pkg;

      default:
        return state;
    }
  }

  static getPermissions(state = {}, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS:
        return Object.assign({}, action.permissions);

      default:
        return state;
    }
  }

  static getError(state = { code: null, field: null, message: null, source: null, title: null }, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL:
        // AJAX error occurred when updating the server, so reset the UI
        // and display error in a modal
        return Object.assign({}, state, {
          title: 'Oops! Something went wrong...',
          code: action.error.code,
          source: action.error.source,
          field: action.error.field,
          message: action.error.message,
        });

      default:
        return state;
    }
  }

  static getPageTitle(state = null, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_SET_PAGE_TITLE:
        return action.pageTitle;

      default:
        return state;
    }
  }

  static getShowSpinner(state = false, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_PERMISSIONS_FETCH:
        return true;

      case AppConstants.ActionTypes.APP_PERMISSIONS_FETCH_SUCCESS:
        return false;

      case AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL:
        return false;

      default:
        return state;
    }
  }

  static getShowErrorModal(state = false, action) {
    switch (action.type) {
      case AppConstants.ActionTypes.APP_CLOSE_ERROR_MODAL:
        return false;

      case AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL:
        return true;

      default:
        return state;
    }
  }
}


export default function app(state = {}, action) {
  return {
    activePkg: AppReducer.getActivePkg(state.activePkg, action),
    permissions: AppReducer.getPermissions(state.permissions, action),
    error: AppReducer.getError(state.error, action),
    pageTitle: AppReducer.getPageTitle(state.pageTitle, action),
    showErrorModal: AppReducer.getShowErrorModal(state.showErrorModal, action),
    showSpinner: AppReducer.getShowSpinner(state.showSpinner, action),
  };
}
