import React from 'react';

class Component extends React.Component {
  constructor() {
    super();
    if (this.constructor === Component) {
      throw new TypeError('Abstract class "Component" cannot be instantiated directly.');
    }
  }

  /**
   * Extracts form values out of state object in the format: this.state.field.value
   *
   * @returns object in the format: { field: value }
   */
  getFormValues() {
    const values = {};
    Object.keys(this.state).forEach(field => {
      if (typeof this.state[field] === 'object'
          && Array.isArray(this.state[field]) === false
          && this.state[field] !== null
          && {}.hasOwnProperty.call(this.state[field], 'value')
      ) {
        values[field] = this.state[field]['value'];
      }
    });
    return values;
  }

  /**
   * Binds each method in list of methods to this
   *
   * @param methods
   * @private
   */
  _bind(...methods) {
    // noinspection Eslint
    methods.forEach((method) => this[method] = this[method].bind(this));
  }
}

export default Component;
