import React, { PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';

import Component from '../../../common/components/Component';
import AppCheckbox from '../../../common/components/AppCheckbox';
import AppModalDialogConfirm from '../../../common/components/AppModalDialogConfirm';
import Utils from '../../../common/Utils';

const propTypes = {
  actions: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
  pkgs: PropTypes.object.isRequired,
  showEditFields: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

class UserItem extends Component {
  constructor() {
    super();
    this.state = { showDeleteConfirm: false };
    this._bind('onChange', 'onDeleteCancel', 'onDeleteClicked', 'onDeleteConfirm');
  }

  onChange(id, checked) {
    const pkg = id.replace(`-${this.props.user.userID}`, '');
    this.props.actions.adminUserValueChanged(this.props.user, pkg, checked);
  }

  onDeleteCancel() {
    this.setState({ showDeleteConfirm: false });
  }

  onDeleteClicked() {
    this.setState({ showDeleteConfirm: true });
  }

  onDeleteConfirm() {
    this.setState({ showDeleteConfirm: false });
    this.props.actions.adminUserDelete(this.props.user);
  }

  getPackageCells() {
    const packageCells = [];
    Object.keys(this.props.user).forEach(pkg => {
      if (pkg !== 'userID'
        && pkg !== 'userIDErrMsg'
        && pkg !== 'formIsValid'
        && pkg !== 'fullName'
      ) {
        const maxUsers = this.props.pkgs[pkg]['maxUsers'];
        const currentUsers = this.props.pkgs[pkg]['currentUsers'];
        const licensesRemaining = maxUsers - currentUsers;
        const isEnabled = this.props.showEditFields
          && (
            licensesRemaining > 0
            || this.props.user[pkg] === true
          );
        const cell = (
          <td key={`${this.props.user.userID}.${pkg}`}>
            <AppCheckbox
              id={`${pkg}-${this.props.user.userID}`}
              checked={this.props.user[pkg]}
              className="User-checkbox"
              disabled={!isEnabled}
              onChange={this.onChange}
              title={`${pkg}: ${this.props.user[pkg] ? 'Enabled' : 'Disabled'}`}
            />
          </td>
        );
        packageCells.push(cell);
      }
    });
    return packageCells;
  }

  render() {
    const deleteButtonCol = Utils.checkPermission(this.props.permissions, 'Admin.user.delete') ? (
      <td>
        <Button onClick={this.onDeleteClicked}>
          <Glyphicon glyph="remove" style={{ marginRight: '5px' }} />
          Delete
        </Button>
        <AppModalDialogConfirm
          affectedItem={this.props.user.userID}
          message="This action permanently deletes the user."
          onClose={this.onDeleteCancel}
          onConfirm={this.onDeleteConfirm}
          showModal={this.state.showDeleteConfirm}
          title="Delete User"
        />
      </td>
    ) : (<td />);
    return (
      <tr>
        <td className={classNames({ disabled: (!this.props.showEditFields) })}>
          {this.props.user.userID}
        </td>
        <td className={classNames({ disabled: (!this.props.showEditFields) })}>
          {this.props.user.fullName}
        </td>
        {this.getPackageCells()}
        {deleteButtonCol}
      </tr>
    );
  }
}

UserItem.propTypes = propTypes;
export default UserItem;
