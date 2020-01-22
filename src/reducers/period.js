import { PERIOD_REGISTER } from "../types";

export default function period(state = {}, action = {}) 
{  switch (action.type) 
  { case PERIOD_REGISTER:      return action.period;
    default:                return state;
  }
}