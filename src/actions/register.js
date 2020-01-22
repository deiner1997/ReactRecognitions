import { USER_REGISTER } from "../types";
import api from '../api';
export const registerUser = (user) =>
      ({ type: USER_REGISTER, user });
export const register = (email, username, name, password, Role, Position, Area, Location) => dispatch => api.user.signup(email, username, name, password, Role, Position, Area, Location).then(data => {
      console.log("Entra");
      dispatch(registerUser(data.user));
});