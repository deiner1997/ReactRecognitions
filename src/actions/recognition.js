import { RECOGNITION_REGISTER } from "../types";
import api from '../api';
export const recognitionRegister = (recognize) => ({ type: RECOGNITION_REGISTER, recognize });
export const createRecognition = (description, userAssignId, usercreateId, categoryId, subcategoryId,valueId,periodId, sherpasNum, sherpascommittee,client) =>
 dispatch => api.recognition.create(description, userAssignId, usercreateId, categoryId, subcategoryId,valueId,periodId, sherpasNum, sherpascommittee,client).then(data => {
      dispatch(recognitionRegister(data.recognize));
});
