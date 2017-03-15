import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from './DevTools';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    DevTools.instrument()
  )
);

export default store;
