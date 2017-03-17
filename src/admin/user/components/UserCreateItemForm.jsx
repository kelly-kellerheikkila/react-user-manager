import React, { PropTypes } from 'react';
import { Button, Glyphicon, Table } from 'react-bootstrap';

import Component from '../../../common/components/Component';
import AppTextInput from '../../../common/components/AppTextInput';
import AppCheckbox from '../../../common/components/AppCheckbox';
import './User.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  formIsValid: PropTypes.bool.isRequired,
  pkgs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

function getInitialState(props) {
  const initialState = {};
  Object.keys(props.users.XXnewXX).forEach(prop => {
    initialState[prop] = props.users.XXnewXX[prop];
  });
  Object.keys(props.pkgs).forEach(pkg => {
    initialState[pkg] = { errMsg: null, isValid: true, value: false };
  });
  initialState.formIsValid = false; // there are some required fields, so it's always not valid initially
  return initialState;
}

class UserCreateItemForm extends Component {
  constructor(props) {
    super();
    this.state = getInitialState(props);
    this._bind('onCancel', 'onChange', 'onSubmit', 'onUserIDChange');
  }

  onCancel() {
    this.props.actions.adminUserHideNewForm();
  }

  onChange(targetID, value, isValid, errMsg) {
    this.setState({ [targetID]: { errMsg, isValid, value } });
    this.props.actions.adminUserUpdateFieldValidations('XXnewXX', targetID, errMsg, isValid, value);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.actions.adminUserCreate(this.getFormValues());
  }

  onUserIDChange(id, value, initialIsValid, initialErrorMessage) {
    let isValid = initialIsValid;
    let errMsg = initialErrorMessage;
    if (isValid) {
      if (value in this.props.users) {
        isValid = false;
        errMsg = 'That username already exists';
      }
    }
    this.onChange(id, value, isValid, errMsg);
  }

  getPackageCells() {
    const packageCells = [];
    Object.keys(this.props.pkgs).forEach(pkg => {
      const maxUsers = this.props.pkgs[pkg]['maxUsers'];
      const currentUsers = this.props.pkgs[pkg]['currentUsers'];
      const licensesRemaining = maxUsers - currentUsers;
      const cell = (
        <td key={`new_${pkg}`}>
          <AppCheckbox
            id={pkg}
            className="User-checkbox"
            disabled={licensesRemaining <= 0}
            onChange={this.onChange}
          />
        </td>
      );
      packageCells.push(cell);
    });
    return packageCells;
  }

  getPackageHeaders() {
    const headers = [];
    Object.keys(this.props.pkgs).forEach(pkg => {
      const header = (
        <th key={pkg}>{this.props.pkgs[pkg].description}
          <div>{this.props.pkgs[pkg].description}</div>
        </th>
      );
      headers.push(header);
    });
    return headers;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Favorite Integer</th>
              <th>Favorite Numeric</th>
              {this.getPackageHeaders()}
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <AppTextInput
                  id="userID"
                  autoFocus
                  maxLength={10}
                  onChange={this.onUserIDChange}
                  errMsg={this.state.userID.errMsg}
                  placeholder="Enter Username"
                  required
                  upperCaseOnly
                  type="text"
                />
              </td>
              <td>
                <AppTextInput
                  id="fullName"
                  datatype="string"
                  maxLength={50}
                  onChange={this.onChange}
                  errMsg={this.state.fullName.errMsg}
                  required
                  type="text"
                />
              </td>
              <td>
                <AppTextInput
                  id="favInt"
                  datatype="integer"
                  maxLength={5}
                  onChange={this.onChange}
                  errMsg={this.state.favInt.errMsg}
                  style={{ width: '70px' }}
                  type="text"
                />
              </td>
              <td>
                <AppTextInput
                  id="favNum"
                  datatype="numeric"
                  maxLength={5}
                  onChange={this.onChange}
                  errMsg={this.state.favNum.errMsg}
                  style={{ width: '70px' }}
                  type="text"
                />
              </td>

              {this.getPackageCells()}

              <td>
                <Button name="saveUser" type="submit" onClick={this.onSubmit} disabled={!this.props.formIsValid}>
                  <Glyphicon glyph="file" style={{ marginRight: '5px' }} />
                  Save
                </Button>
                <Button name="cancelNewUser" type="button" onClick={this.onCancel}>
                  <Glyphicon glyph="ban-circle" style={{ marginRight: '5px' }} />
                  Cancel
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    );
  }
}

UserCreateItemForm.propTypes = propTypes;
export default UserCreateItemForm;
