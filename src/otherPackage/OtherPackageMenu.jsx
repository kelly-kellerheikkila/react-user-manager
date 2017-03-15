import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Utils from '../common/Utils';
import * as AppActionCreators from '../common/AppActionCreators';

import PureComponent from '../common/components/PureComponent';
import './OtherPackageMenu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  permissions: PropTypes.object.isRequired,
};

class OtherPackageMenu extends PureComponent {
  componentDidMount() {
    this.props.actions.appSetActivePkg('OtherPackage');
    this.props.actions.appSetPageTitle('Menu');
  }

  getLinks() {
    const optionOneLink = this.getOptionOneLink();
    const optionTwoLink = this.getOptionTwoLink();
    if (optionOneLink || optionTwoLink) {
      return (
        <div className="col-sm-3">
          <div className="list-group">
            <span className="list-group-item active">Other Package Menu</span>
            <div className="menu-items">
              {optionOneLink}
              {optionTwoLink}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  getOptionOneLink() {
    if (Utils.checkPermission(this.props.permissions, 'OtherPackage.optionOne')) {
      return (
        <div className="list-group-item disabled">
          Option One
        </div>
      );
    }
    return null;
  }

  getOptionTwoLink() {
    if (Utils.checkPermission(this.props.permissions, 'OtherPackage.optionTwo')) {
      return (
        <div className="list-group-item disabled">
          Option Two
        </div>
      );
    }
    return null;
  }


  render() {
    return (
      <section id="OtherPackageMenu">
        <hr />
        <div className="row">
          {this.getLinks()}
        </div>
      </section>
    );
  }
}

OtherPackageMenu.propTypes = propTypes;


function mapStateToProps(state) {
  return {
    permissions: state.app.permissions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        AppActionCreators
      ), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherPackageMenu);
