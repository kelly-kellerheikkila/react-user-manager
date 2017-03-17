import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActionCreators from '../../common/AppActionCreators';
import * as UserActionCreators from './UserActionCreators';
import User from './components/User';

function getFormIsValid(users, userID) {
  let isValid = true;
  if (userID !== null && Object.keys(users).length > 0) {
    Object.keys(users[userID]).forEach(field => {
      if (typeof users[userID][field] !== 'undefined'
        && users[userID][field] !== null
        && typeof users[userID][field].isValid !== 'undefined'
        && users[userID][field].isValid === false) {
        isValid = false;
      }
    });
  }
  return isValid;
}

function mapStateToProps(state) {
  return {
    formIsValid: getFormIsValid(state.admin.user.users, 'XXnewXX'),
    numColumns: state.admin.user.numColumns,
    permissions: state.app.permissions,
    pkgs: state.admin.user.pkgs,
    showCreateButton: state.admin.user.showCreateButton,
    showEditFields: state.admin.user.showEditFields,
    showNewUserFields: state.admin.user.showNewUserFields,
    showTableSpinner: state.admin.user.showTableSpinner,
    showWhatIsThis: state.admin.user.showWhatIsThis,
    users: state.admin.user.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        AppActionCreators,
        UserActionCreators
      ), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
