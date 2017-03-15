import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import PureComponent from './PureComponent';
import AppModal from './AppModal';

const propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  affectedItem: PropTypes.string,
  showModal: PropTypes.bool,
};

const defaultProps = {
  title: '',
  onClose() {},
  onConfirm() {},
  message: 'This action permanently deletes the record.',
  affectedItem: null,
  showModal: false,
};

class AppModalDialogConfirm extends PureComponent {
  getModalBody() {
    const itemDisplay = this.props.affectedItem !== null ?
      <p><strong>{this.props.affectedItem}</strong></p> : null;
    return (
      <div>
        <p>
          <small>{this.props.message}</small>
        </p>
        {itemDisplay}
        <p>
          <strong>Are you sure?</strong>
        </p>
      </div>
    );
  }

  render() {
    const modalBody = this.getModalBody();
    const buttons = (
      <div>
        <Button bsStyle="default" onClick={this.props.onConfirm}>OK</Button>
        <Button bsStyle="primary" onClick={this.props.onClose}>Cancel</Button>
      </div>
    );
    return (
      <AppModal
        showModal={this.props.showModal}
        size="lg"
        title={this.props.title}
        body={modalBody}
        onClose={this.props.onClose}
        showFooter
        footer={buttons}
      />
    );
  }
}

AppModalDialogConfirm.propTypes = propTypes;
AppModalDialogConfirm.defaultProps = defaultProps;
export default AppModalDialogConfirm;
