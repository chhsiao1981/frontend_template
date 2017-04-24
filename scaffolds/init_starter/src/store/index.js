import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers'
import api from '../middlewares/api'
import DevTools from '../DevTools'

const logger = createLogger({
  level: 'info',
  collapsed: false
});

var finalCreateStore = compose(
  applyMiddleware(
    thunk,
    api,
    logger,
  ),
  DevTools.instrument(),
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if(process.env.NODE_ENV === 'production'|| !module.hot)
    return store

  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers');
    store.replaceReducer(nextReducer);
  });

  return store;
}
