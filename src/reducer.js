import {combineReducers} from 'redux';
import auth from './reducers/auth';
import user from './reducers/user';
import period from './reducers/period'
import recognition from './reducers/recognition';
import catalogue from './reducers/catalogue';
import location from './reducers/location';


export default combineReducers({ auth, user, period,recognition,catalogue,location });