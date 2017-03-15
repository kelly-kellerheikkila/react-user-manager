import React, { PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PureComponent from './PureComponent';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  showFooter: PropTypes.bool,
  body: PropTypes.element,
  footer: PropTypes.element,
  title: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'small', 'lg', 'large']),
};

const defaultProps = {
  size: 'sm',
  title: 'Oops! Something went wrong...',
};

class AppModal extends PureComponent {
  getFooter() {
    if (this.props.showFooter) {
      const footer = this.props.footer ? this.props.footer : (
        <Button bsStyle="primary" onClick={this.props.onClose}>
          Close
        </Button>
      );
      return (
        <Modal.Footer>
          {footer}
        </Modal.Footer>
      );
    }
    return null;
  }

  render() {
    const footer = this.getFooter();
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.onClose}
        bsSize={this.props.size}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.props.body}</div>
        </Modal.Body>
        {footer}
      </Modal>
    );
  }
}

AppModal.propTypes = propTypes;
AppModal.defaultProps = defaultProps;
export default AppModal;
