import { combineReducers } from 'redux';
import app from './AppReducer';
import admin from '../../admin/AdminReducer';

// noinspection Eslint
export const rootReducer = combineReducers({
  app,
  admin,
});
