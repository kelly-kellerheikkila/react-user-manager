import React, { PropTypes } from 'react';

const propTypes = {
  cols: PropTypes.number.isRequired,
};

const AppTableSpinner = ({ cols }) => (
  <tr>
    <td colSpan={cols} className="busy-indicator">
      <img src="./img/busy.gif" role="presentation" />
    </td>
  </tr>
);

AppTableSpinner.propTypes = propTypes;

export default AppTableSpinner;
