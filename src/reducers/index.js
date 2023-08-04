import { combineReducers } from 'redux';
import rpnReducer from './rpnReducer';

export default combineReducers({
    rpn: rpnReducer
});