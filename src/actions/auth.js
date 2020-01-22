import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from '../api';
//import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = (user) => ({  type: USER_LOGGED_IN, user  });
export const userLoggedOut = () => ({   type: USER_LOGGED_OUT   });


//thunk actions
export const login = (email,password) => dispatch =>api.user.login(email,password).then(data => 
 {    console.log(data)
     window.localStorage.setItem('jwt', data.token);   
       dispatch(userLoggedIn(data.user));    
 });

export const logout = () => dispatch => 
{  window.localStorage.removeItem('jwt');
   dispatch(userLoggedOut());   
};

