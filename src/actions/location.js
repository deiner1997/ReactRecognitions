import { LOCATION_REGISTER } from "../types";
import api from '../api';
export const locationRegister = (location) =>
      ({ type: LOCATION_REGISTER, location });

export const createLocation = (name) => dispatch => api.location.create(name).then(data => {
      dispatch(locationRegister(data.location));
      console.log(data.location)
});