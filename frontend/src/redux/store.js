import { createStore, applyMiddleware } from 'redux';

//@ MIDDLEWARE
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//@ ROOT REDUCER
import rootReducer from './reducer/rootReducer';

//@ MIDDLEWARE
const middleware = [thunk, logger];


//@ CREATE STORE
const store = createStore(rootReducer, applyMiddleware(...middleware));
//@@
export default store;
