import { CATALOGUE_REGISTER } from "../types";

export default function catalogue(state = {}, action = {}) 
{  switch (action.type) 
  { case CATALOGUE_REGISTER:      return action.catalogue;
    default:                return state;
  }
}