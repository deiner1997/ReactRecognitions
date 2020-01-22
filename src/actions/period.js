import { PERIOD_REGISTER } from "../types";
import api from '../api';
export const periodRegister = (period) => ({ type: PERIOD_REGISTER, period });
export const createPeriod = (name, startdate,enddate,status) => dispatch => api.period.create(name, startdate,enddate,status).then(data => {
      dispatch(periodRegister(data.period));
});
