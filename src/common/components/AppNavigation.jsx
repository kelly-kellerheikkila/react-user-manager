import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import PureComponent from './PureComponent';
import * as AppActionCreators from '../AppActionCreators';

const propTypes = {
  actions: PropTypes.object,
  activePkg: PropTypes.oneOf(['Admin', 'OtherPackage']),
  permissions: PropTypes.object,
  pageTitle: PropTypes.string,
  showSpinner: PropTypes.bool,
};


class AppNavigation extends PureComponent {
  getLinks() {
    const links = [];
    if (Object.keys(this.props.permissions).length > 0) {
      if (this.props.permissions.Admin) {
        links.Admin = { elementType: 'link', url: '/', label: 'Admin' };
      }
      if (this.props.permissions.OtherPackage) {
        links.OtherPackage = { elementType: 'link', url: '/otherPackage', label: 'Other Package' };
      }
    }
    return links;
  }

  getNavLink(link, key) {
    let linkClass = '';
    if (this.props.activePkg === key) {
      linkClass = 'active';
    }
    return (
      <LinkContainer to={link.url} eventKey={key} key={key}>
        <MenuItem className={linkClass} eventKey={key} key={key}>
          {link.label}
        </MenuItem>
      </LinkContainer>
    );
  }

  render() {
    const queryString = {};
    const links = this.getLinks();
    const navLinks = [];
    Object.keys(links).forEach(key => {
      navLinks.push(this.getNavLink(links[key], key, queryString));
    });

    let breadcrumb;
    if (Object.keys(links).length > 0 && this.props.activePkg !== null && this.props.pageTitle !== null) {
      breadcrumb = (
        <h4
          className="navbar-text"
          id="navbarTitle"
          style={{ paddingLeft: '16px', color: '#efefef' }}
        >
          {links[this.props.activePkg]['label']} - {this.props.pageTitle}
        </h4>
      );
    } else {
      breadcrumb = null;
    }

    return (
      <Navbar inverse fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <img src="./img/kelly.jpg" style={{ height: '50px', margin: 0, padding: 0 }} role="presentation" />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {breadcrumb}
          <Nav pullRight>
            <NavDropdown eventKey={1} title="Packages" id="navbar-menu" className="nav">
              {navLinks}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
AppNavigation.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    activePkg: state.app.activePkg,
    permissions: state.app.permissions,
    pageTitle: state.app.pageTitle,
    showSpinner: state.app.showSpinner,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, AppActionCreators), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
