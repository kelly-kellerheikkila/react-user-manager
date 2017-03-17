import React, { PropTypes } from 'react';
import { Button, Col, Glyphicon, Row, Table } from 'react-bootstrap';

import Utils from '../../../common/Utils';
import PureComponent from '../../../common/components/PureComponent';
import AppTableSpinner from '../../../common/components/AppTableSpinner';
import UserCreateItemForm from './UserCreateItemForm';
import UserItem from './UserItem';

const propTypes = {
  actions: PropTypes.object.isRequired,
  formIsValid: PropTypes.bool.isRequired,
  numColumns: PropTypes.number.isRequired,
  permissions: PropTypes.object.isRequired,
  pkgs: PropTypes.object.isRequired,
  showCreateButton: PropTypes.bool.isRequired,
  showEditFields: PropTypes.bool.isRequired,
  showNewUserFields: PropTypes.bool.isRequired,
  showTableSpinner: PropTypes.bool.isRequired,
  showWhatIsThis: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
};

class User extends PureComponent {
  constructor() {
    super();
    this._bind('onCreateUserButtonClicked', 'onHideWhatIsThis', 'onShowWhatIsThis');
  }

  componentDidMount() {
    this.props.actions.appSetActivePkg('Admin');
    this.props.actions.appSetPageTitle('Users');
    this.props.actions.adminUserFetch();
  }

  onCreateUserButtonClicked() {
    this.props.actions.adminUserShowNewForm();
  }

  onHideWhatIsThis() {
    this.props.actions.adminUserHideWhatIsThis();
  }

  onShowWhatIsThis() {
    this.props.actions.adminUserShowWhatIsThis();
  }

  getCreateItemButton() {
    if (this.props.showCreateButton && Utils.checkPermission(this.props.permissions, 'Admin.user.create')) {
      return (
        <Row>
          <Col sm={12}>
            <hr />
            <Button name="createUserButton" onClick={this.onCreateUserButtonClicked} bsSize="small">
              <Glyphicon glyph="file" style={{ marginRight: '5px' }} />
              New User
            </Button>
          </Col>
        </Row>
      );
    }
    return null;
  }

  getCreateItemForm() {
    if (this.props.showNewUserFields) {
      return (
        <UserCreateItemForm
          actions={this.props.actions}
          formIsValid={this.props.formIsValid}
          pkgs={this.props.pkgs}
          users={this.props.users}
        />
      );
    }
    return null;
  }

  getPkgHeaders() {
    const headers = [];
    Object.keys(this.props.pkgs).forEach(pkg => {
      let licenseColor = '#070';
      const maxUsers = this.props.pkgs[pkg].maxUsers;
      const currentUsers = this.props.pkgs[pkg].currentUsers;
      const licensesRemaining = maxUsers - currentUsers;
      if (licensesRemaining < 2) {
        licenseColor = '#B00';
      } else if (licensesRemaining < 3) {
        licenseColor = '#FF8000';
      }
      const header = (
        <th key={pkg}>
          {this.props.pkgs[pkg].description}<br />
          ({currentUsers}/{maxUsers})
          <div>
            {this.props.pkgs[pkg].description}<br />
            <span style={{ color: licenseColor }}>
              ({currentUsers}/{maxUsers} Licenses)
            </span>
          </div>
        </th>
      );
      headers.push(header);
    });
    return headers;
  }

  getTableBody() {
    if (this.props.showTableSpinner) {
      return (
        <tbody><AppTableSpinner cols={this.props.numColumns} /></tbody>
      );
    } else if (Object.keys(this.props.users).length > 0) {
      const licenseItems = [];
      Object.keys(this.props.users).forEach(key => {
        if (key !== 'XXnewXX') { // don't show the new user placeholder
          licenseItems.push(this.getUserItem(this.props.users[key]));
        }
      });
      return (
        <tbody>
          {licenseItems}
        </tbody>
      );
    }
    return (
      <tbody>
        <tr>
          <td colSpan={this.props.numColumns} style={{ textAlign: 'center' }}>
            No licensed users were found.
          </td>
        </tr>
      </tbody>
    );
  }

  getUserItem(user) {
    return (
      <UserItem
        actions={this.props.actions}
        permissions={this.props.permissions}
        key={user.userID.value}
        pkgs={this.props.pkgs}
        showEditFields={this.props.showEditFields}
        user={user}
      />
    );
  }

  getWhatIsThis() {
    if (this.props.showWhatIsThis) {
      return (
        <div id="whatIsThis" style={{ paddingBottom: '10px' }}>
          <Button onClick={this.onHideWhatIsThis}>
            <Glyphicon glyph="remove" style={{ marginRight: '5px' }} />
            Hide
          </Button>
          <p>
            This is a simple ReactJS/Redux example of an admin user module, such as what would be used as part of a
            larger
            platform. Features of this demo include:
          </p>
          <ul>
            <li>Create new users, assign package licenses to them, remove licenses, and delete users</li>
            <li>Count of current licensed users vs. max licensed users is maintained throughout</li>
            <li>As the number of user licenses changes, the color of the license count will change from green to orange
              to red encouraging the admin user to purchase more licenses
            </li>
            <li>If the number of current licenses used reaches the max licenses, the UI will prevent further users from
              being licensed in that package
            </li>
            <li>Permissions are checked to see if you have access to create users or delete them (you do)</li>
            <li>An example second package "Other Package" is included to demo how multiple packages/modules would be
              structured in the code (you can access Other Package by going to the Packages dropdown above)
            </li>
            <li>Username must be in all capitals</li>
            <li>Table uses fixed headers</li>
            <li>Users displayed in alphabetical order, according to username</li>
            <li>Realtime validation of form data</li>
          </ul>
          <p>
            The packages shown are dynamically generated and would normally be returned in the REST response.
            All data is mocked, so there is no actual REST API server behind this demo, though it would be trivial to
            create one in Python, PHP, etc.
          </p>
          <p>
            The demo was written by Kelly Keller-Heikkila. Source code is available
            at <a href="https://github.com/kelly-kellerheikkila/react-user-manager">Github</a>. If interested in how
            Kelly can help your development efforts, feel free to reach her
            at <a href="mailto:kelly@keller-heikkila.org">kelly@keller-heikkila.org</a>.
          </p>
        </div>
      );
    }
    return (
      <Button onClick={this.onShowWhatIsThis} style={{ marginBottom: '10px' }}>
        <Glyphicon glyph="question-sign" style={{ marginRight: '5px' }} />
        What is this demo?
      </Button>
    );
  }


  render() {
    return (
      <section id="Users">
        {this.getWhatIsThis()}
        {this.getCreateItemButton()}
        {this.getCreateItemForm()}
        <hr />
        <Row>
          <section className="table-section" style={{ paddingTop: '50px' }}>
            <div className="table-container">
              <Table bordered condensed hover responsive className="table-fixed-header">
                <thead className={!this.props.showEditFields ? 'disabled' : null}>
                  <tr>
                    <th>
                      Username
                      <div>Username</div>
                    </th>
                    <th>
                      Full Name
                      <div>Full Name</div>
                    </th>
                    <th>
                      Favorite Integer
                      <div>Favorite Integer</div>
                    </th>
                    <th>
                      Favorite Numeric
                      <div>Favorite Numeric</div>
                    </th>
                    {this.getPkgHeaders()}
                    <th />
                  </tr>
                </thead>
                {this.getTableBody()}
              </Table>
            </div>
          </section>
        </Row>
      </section>
    );
  }
}

User.propTypes = propTypes;

export default User;
