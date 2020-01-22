import { CATALOGUE_REGISTER } from "../types";
import api from '../api';
export const catalogueRegister = (catalogue) =>
      ({ type: CATALOGUE_REGISTER, catalogue });

export const createCatalogue = (title,locationId,category) => dispatch => api.catalogue.create(title,locationId,category).then(data => {
      dispatch(catalogueRegister(data.catalogue));
});