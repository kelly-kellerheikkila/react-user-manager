import React, { PropTypes } from 'react';
import { Grid } from 'react-bootstrap';
import AppErrorModal from './components/AppErrorModal';
import AppNavigation from './components/AppNavigation';

const propTypes = {
  children: PropTypes.any,
};

const App = ({ children }) => (
  <Grid fluid>
    <AppNavigation />
    <AppErrorModal />
    {children}
  </Grid>
);

App.propTypes = propTypes;
export default App;
