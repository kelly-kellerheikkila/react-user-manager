import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Component from './Component';
import Utils from '../Utils';

import './AppCheckbox.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  partial: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
};

const defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  required: false,
};

class AppCheckbox extends Component {
  constructor(props) {
    super();
    this.state = { checked: props.checked };
    this._bind('onChange');
  }

  componentDidUpdate(prevProps) {
    // If the checked passed has changed, set it. If checked is not passed it will
    // internally update, and this will never run
    if (!Utils.isSame(this.props.checked, prevProps.checked)) {
      // noinspection Eslint
      this.setState({ checked: this.props.checked });
    }
  }

  onChange(e) {
    this.setState({ checked: e.target.checked });
    this.props.onChange(this.props.id, e.target.checked, true);
  }

  render() {
    const className = { 'app-checkbox': true };
    if (this.props.className !== '') {
      className[this.props.className] = true;
    }
    if (this.props.required && !this.state.checked) {
      className.required = true;
    }
    if (this.props.partial) {
      className.partial = true;
    }
    className.disabled = this.props.disabled;

    return (
      <div className={classNames(className)}>
        <input
          id={this.props.id}
          type="checkbox"
          name={this.props.id}
          disabled={this.props.disabled}
          checked={this.state.checked}
          onChange={this.onChange}
          tabIndex={this.props.tabIndex}
        />
        <label
          htmlFor={this.props.id}
          title={this.props.title}
          className={this.props.labelClassName}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

AppCheckbox.propTypes = propTypes;
AppCheckbox.defaultProps = defaultProps;

export default AppCheckbox;
