import React, { PropTypes } from 'react';
import classNames from 'classnames';
import requiredIf from 'react-required-if';
import { ControlLabel, FormControl, FormGroup, HelpBlock, InputGroup } from 'react-bootstrap';
import Component from './Component';
import Utils from '../Utils';

const propTypes = {
  id: PropTypes.string.isRequired,
  onChange: requiredIf(PropTypes.func, props => !props.disabled),
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  datatype: PropTypes.oneOf(['string', 'numeric', 'integer', 'percent', 'currency']),
  disabled: PropTypes.bool,
  errMsg: PropTypes.string,
  helpBlock: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  upperCaseOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  autoComplete: true,
  autoFocus: false,
  datatype: 'string',
  disabled: false,
  errMsg: null,
  helpBlock: true,
  onBlur() {},
  onFocus() {},
  readOnly: false,
  required: false,
  style: {},
  value: '',
  upperCaseOnly: false,
};

class AppTextInput extends Component {
  constructor(props) {
    super();
    this.state = { value: props.value !== null ? props.value : '', errMsg: props.errMsg };
    this._bind('onBlur', 'onChange', 'onFocus');
  }

  componentDidUpdate(prevProps) {
    // If the value passed has changed, set it. If value is not passed it will
    // internally update, and this will never run
    if (!Utils.isSame(this.props.value, prevProps.value)) {
      // noinspection Eslint
      this.setState({ value: this.props.value !== null ? this.props.value : '' });
    }

    // If validations or required is changed, run a new validation
    if (
      !Utils.isSame(this.props.datatype, prevProps.datatype)
      || !Utils.isSame(this.props.required, prevProps.required)
    ) {
      this.validate();
    }

    // Update error message if one is sent from parent
    if (
      !Utils.isSame(this.props.errMsg, prevProps.errMsg)
    ) {
      // noinspection Eslint
      this.setState({ errMsg: this.props.errMsg });
    }
  }

  onBlur() {
    this.props.onBlur(this.props.id, this.state.value, this.state.errMsg);
  }

  onChange(e) {
    let value = e.target.value;
    if (this.props.upperCaseOnly) {
      value = value.toUpperCase();
    }
    const validity = this.validate(value);
    this.setState({ value, errMsg: validity.errMsg });
    this.props.onChange(this.props.id, value, validity.isValid, validity.errMsg);
  }

  onFocus() {
    this.props.onFocus(this.props.id);
  }

  validate(value) {
    const validity = { isValid: true, errMsg: null };
    if (value === '' && this.props.required) {
      validity.errMsg = 'Required';
      validity.isValid = false;
    } else if (value !== '') {
      // percent and currency should be validated as numeric
      const datatype = (
        this.props.datatype === 'percent' || this.props.datatype === 'currency'
          ? 'numeric'
          : this.props.datatype
      );
      const regexp = {
        numeric: /^[-+]?(?:\d*[.])?\d+$/,
        integer: /^(?:[-+]?(?:0|[1-9]\d*))$/,
      };

      switch (datatype) {
        case 'numeric':
          if (typeof value !== 'number') {
            if (!regexp.numeric.test(value)) {
              validity.errMsg = 'Must be a number';
              validity.isValid = false;
            }
          }
          break;

        case 'integer':
          if (!regexp.integer.test(value)) {
            validity.errMsg = 'Must be an integer';
            validity.isValid = false;
          }
          break;

        default:
          break;
      }
    }

    return validity;
  }

  render() {
    const className = {};
    let addonBefore = null;
    let addonAfter = null;

    if (this.props.className) {
      className[this.props.className] = true;
    }
    className.disabled = this.props.disabled;

    if (this.state.value === '' && this.props.required) {
      className.required = true;
    }

    switch (this.props.datatype) {
      case 'percent':
        className['text-right'] = true;
        addonAfter = (<InputGroup.Addon>%</InputGroup.Addon>);
        break;
      case 'currency':
        className['text-right'] = true;
        addonBefore = (<InputGroup.Addon>$</InputGroup.Addon>);
        break;
      case 'numeric':
        className['text-right'] = true;
        break;
      case 'integer':
        className['text-right'] = true;
        break;
      case 'string':
        break;
      default:
        break;
    }

    const formControl = (
      <FormControl
        autoComplete={this.props.autoComplete}
        autoFocus={this.props.autoFocus}
        className={classNames(className)}
        disabled={this.props.disabled}
        maxLength={this.props.maxLength}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onFocus={this.onFocus}
        placeholder={this.props.placeholder}
        readOnly={this.props.readOnly}
        style={this.props.style}
        tabIndex={this.props.tabIndex}
        type="text"
        value={this.state.value}
      />
    );

    const inputBlock = addonBefore !== null || addonAfter !== null ? (
      <InputGroup bsSize="sm">
        {addonBefore}
        {formControl}
        {addonAfter}
      </InputGroup>
    ) : formControl;

    const helpBlk = this.props.helpBlock ? <HelpBlock>{this.state.errMsg}</HelpBlock> : null;
    const controlLabel = this.props.label ? <ControlLabel>{this.props.label}</ControlLabel> : null;
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={this.state.errMsg !== null ? 'error' : null}
      >
        {controlLabel}
        {inputBlock}
        {helpBlk}
      </FormGroup>
    );
  }
}

AppTextInput.propTypes = propTypes;
AppTextInput.defaultProps = defaultProps;

export default AppTextInput;
