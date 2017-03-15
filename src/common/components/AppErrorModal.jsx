import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import * as AppActionCreators from '../AppActionCreators';

import PureComponent from './PureComponent';
import AppModal from './AppModal';

const propTypes = {
  actions: PropTypes.object,
  error: PropTypes.object,
  showErrorModal: PropTypes.bool,
};

class AppErrorModal extends PureComponent {
  constructor() {
    super();
    this._bind('onCloseErrorModal');
  }

  onCloseErrorModal() {
    this.props.actions.appCloseErrorModal();
  }

  getErrorModalBody() {
    return (
      <div id="error-body">
        <p className="error-message">{this.props.error.message}</p>
        <p className="error-details">
          (Source: {this.props.error.source},
          Code: {this.props.error.code})
        </p>
      </div>
    );
  }

  render() {
    if (this.props.showErrorModal) {
      return (
        <AppModal
          showModal={this.props.showErrorModal}
          title={this.props.error.title}
          body={this.getErrorModalBody()}
          onClose={this.onCloseErrorModal}
          showFooter
        />
      );
    }
    return null;
  }
}
AppErrorModal.propTypes = propTypes;


function mapStateToProps(state) {
  return {
    error: state.app.error,
    showErrorModal: state.app.showErrorModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, AppActionCreators), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppErrorModal);
