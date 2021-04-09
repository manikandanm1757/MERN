import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './reducers/index';

const middlewares = [thunk];
const initalState = {};
const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;