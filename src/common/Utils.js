import 'isomorphic-fetch';
import AppConstants from './AppConstants';

class Utils {
  /**
   * Compare 2 arrays - used by isSame
   *
   * @param {Array} a
   * @param {Array} b
   * @returns {boolean}
   */
  static arraysDiffer(a, b) {
    let isDifferent = false;
    if (a.length !== b.length) {
      isDifferent = true;
    } else {
      a.forEach((item, index) => {
        if (!Utils.isSame(item, b[index])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  }


  /**
   * Called by reducers to build a state value object
   *
   * @param {Object} rawData - containing key/value pairs of fields of a single object instance, w/o validation
   * @param {Object} state - current state of a single object instance (i.e. a single location, order, etc) w/validation
   *
   * @returns {object}
   */
  static buildStateValueObj(rawData, state = {}) {
    const mutableObj = state;

    Object.keys(rawData).forEach(field => {
      let addField = false;
      if (field in mutableObj) {
        // don't mess up non-form properties by converting to object
        // this is only a problem when updating an existing location
        if (typeof rawData[field] === 'object'
          && Array.isArray(rawData[field]) === false
          && rawData[field] !== null
        ) {
          addField = true;
        }
      } else {
        addField = true;
      }
      if (addField) {
        // set all validations to true, since this is pre-existing
        mutableObj[field] = {};
        mutableObj[field].value = null; // temporary null value, which will be populated in next block
        mutableObj[field].isValid = true;
        mutableObj[field].errMsg = null;
      }
      if (typeof mutableObj[field] === 'object'
        && mutableObj[field] !== null
      ) {
        mutableObj[field].value = rawData[field];
      }
    });
    return Object.assign({}, state, mutableObj);
  }


  /**
   * Check state permissions object to verify if user has a specified permission
   * Verifies ancestors in addition to specified permission
   *
   * @param {Object} permissions - Permissions object from redux state
   * @param {string} permission - Permission to check in dot notation form
   * @returns {boolean}
   */
  static checkPermission(permissions = {}, permission = '') {
    try {
      const authValue = permission.split('.').reduce((a, b) => a[b], permissions);
      if (typeof authValue === 'undefined') {
        // Permission does not exist, so return false. We can't grant permission that doesn't exist.
        return false;
      } else if (typeof authValue === 'object') {
        // Permission is an object, so treat it as true because it has at least 1 child that is true
        return true;
      }
      // Permission is the deepest descendant, so it is a boolean
      return authValue;
    } catch (e) {
      // Catch errors like 'Cannot read property of undefined', which will be thrown if a child is specified
      // but the parent does not exist, such as if the parent is false
      return false;
    }
  }


  /**
   * Deeply clone an object
   *
   * @param {Object} obj
   * @returns {*}
   */
  static clone(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== 'object') return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = Utils.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      Object.keys(obj).forEach(attr => {
        copy[attr] = Utils.clone(obj[attr]);
      });
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }


  /**
   * Parse out response status from fetch. If status === 401, redirect browser to login
   *
   * @param {Object} response
   * @returns {response}|{error}
   */
  static fetchCheckStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      // User session timed out or is invalid
      window.location = Utils.logoutURL;
    }
    const error = response.json();
    return error.then(err => {
      throw err;
    });
  }


  /**
   * Used by fetch to parse out JSON body, if response status !== 204
   *
   * @param {Object} response
   * @returns {JSON}|{null}
   */
  static fetchParseJSON(response) {
    if (response.status !== 204) {
      return response.json();
    }
    return null;
  }


  /**
   * Customized Fetch API method to simplify AJAX fetches
   *
   * @param {string} url
   * @param {Object} initialOptions -- object with Fetch API options
   * @param {Object|null} mockResponse -- response object if fetch is to be mocked for example/testing
   * @returns {Promise}
   */
  static fetch(url, initialOptions = {}, mockResponse = null) {
    if (mockResponse !== null) {
      // only do a mock response for example or testing purposes
      const promise = new Promise((resolve, reject) => {
        if (isSuccessful) {
          resolve(response);
        } else {
          reject(Error(response));
        }
      });
      return promise.then(() => mockResponse, () => mockResponse);
    }
    const options = initialOptions;
    options.headers = Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, options.headers);
    if (typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body);
    }
    return fetch(url, options)
      .then(Utils.fetchCheckStatus)
      .then(Utils.fetchParseJSON);
  }

  /**
   * Setup error object to pass in action to display in modal
   *
   * @param {Object} errorResponse -- error response passed in fetch promise
   * @returns {{type: *, error: *}} -- redux action
   */
  static fetchErrorModal(errorResponse) {
    let error = errorResponse.error;
    if (typeof error !== 'object') {
      error = {};
      if ({}.hasOwnProperty.call(errorResponse, 'message')) {
        error.message = errorResponse.message;
      }
    }
    if (!({}.hasOwnProperty.call(error, 'source'))) {
      error.source = 'AJAX';
      error.code = error.status;
    }
    if (!({}.hasOwnProperty.call(error, 'code'))) {
      if (!({}.hasOwnProperty.call(error, 'status'))) {
        error.code = error.status;
      } else {
        error.code = errorResponse.status;
      }
    }
    return { type: AppConstants.ActionTypes.APP_SHOW_ERROR_MODAL, error };
  }


  /**
   * Get a specified query string parameter value by name
   *
   * @param {string} name
   * @returns {string}
   */
  static getParameterByName(name) {
    // noinspection Eslint
    const normalizedName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${normalizedName}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  /**
   * Get value of trace query string param
   *
   * @returns {*}
   */
  static getTrace() {
    if (this.getParameterByName('trace')) {
      return this.getParameterByName('trace');
    }
    return 0;
  }

  /**
   * Create a query string that includes pid and trace params, along with any others passed in param object
   *
   * @param {Object} kwargs -- object of all params to include in query string, except pid and trace
   * @returns {string}
   */
  static getQueryString(kwargs = {}) {
    const params = Object.assign({ pid: Utils.getParameterByName('pid'), trace: Utils.getTrace() }, kwargs);
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }


  /**
   * Shallow compare objects/arrays
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {boolean}
   */
  static isSame(a, b) {
    if (typeof a !== typeof b) {
      return false;
    } else if (Array.isArray(a)) {
      return !Utils.arraysDiffer(a, b);
    } else if (typeof a === 'object' && a !== null && b !== null) {
      return !Utils.objectsDiffer(a, b);
    }
    return a === b;
  }


  /**
   * Shallow compare 2 objects -- used by isSame
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {boolean}
   */
  static objectsDiffer(a, b) {
    let isDifferent = false;
    if (Object.keys(a).length !== Object.keys(b).length) {
      isDifferent = true;
    } else {
      Object.keys(a).forEach((key) => {
        if (!Utils.isSame(a[key], b[key])) {
          isDifferent = true;
        }
      }, this);
    }
    return isDifferent;
  }
}

Utils.logoutURL = `./${window.location.href.indexOf('/pub') === -1 ? 'pub' : 'U0'}/?login=true`;

export default Utils;
