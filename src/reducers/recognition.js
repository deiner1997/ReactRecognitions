import { RECOGNITION_REGISTER } from "../types";

export default function recognition(state = {}, action = {}) 
{  switch (action.type) 
  { case RECOGNITION_REGISTER:      return action.recognize;
    default:                return state;
  }
}