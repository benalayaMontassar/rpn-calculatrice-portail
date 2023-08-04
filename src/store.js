import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

let logger = store => next => action => {
    console.group('dispatching', action.type);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

let composeDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeDevTools(applyMiddleware(logger, thunk)));

export default store;