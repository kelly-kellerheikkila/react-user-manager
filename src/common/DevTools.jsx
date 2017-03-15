import React from 'react';
// noinspection Eslint
import { createDevTools } from 'redux-devtools';
// noinspection Eslint
import LogMonitor from 'redux-devtools-log-monitor';
// noinspection Eslint
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    changePositionKey="ctrl-w"
    defaultIsVisible={false}
    defaultPosition="right"
    defaultSize={0.3}
    toggleVisibilityKey="ctrl-i"
  >
    <LogMonitor select={state => state} />
  </DockMonitor>
);
