import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActionCreators from '../../common/AppActionCreators';
import * as UserActionCreators from './UserActionCreators';
import User from './components/User';

function getFormIsValid(fieldValidations) {
  let isValid = true;
  Object.keys(fieldValidations).forEach(field => {
    if (fieldValidations[field] === false) {
      isValid = false;
    }
  });
  return isValid;
}

function mapStateToProps(state) {
  return {
    fieldValidations: state.admin.user.fieldValidations,
    formIsValid: getFormIsValid(state.admin.user.fieldValidations),
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
