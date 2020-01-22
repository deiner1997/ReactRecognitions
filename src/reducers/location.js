import { LOCATION_REGISTER } from "../types";

export default function location(state = {}, action = {}) 
{  switch (action.type) 
  { case LOCATION_REGISTER:      return action.location;
    default:                return state;
  }
}