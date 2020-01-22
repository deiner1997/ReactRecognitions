import axios from "axios";
export const URL = "http://localhost:3001/";
export default
        {
                user: {
                        login: (email, password) => axios.post(`${URL}signIn/`, { email, password }).then(res => res.data),
                        signup: (email, username, name, password, Role, Position, Area, Location) =>
                                axios.post(`${URL}register/`, { email, username, name, password, Role, Position, Area, Location }).then(res => res.data),
                        getUserById: (userId) => axios.get(`${URL}getuser/${userId}`).then(res => res.data),
                        getUsers: () => axios.get(`${URL}getusers/`).then(res => res.data),
                        getUsersStatusFalse: () => axios.get(`${URL}getusersStatus/`).then(res => res.data),
                        updateUser: (_id, name, Role, Position, Area, Location) => axios.put(`${URL}user/${_id}`, { name, Role, Position, Area, Location }).then(
                                console.log("Called"),
                                res => res.data),
                        updateUserStatus: (userId, status) => axios.put(`${URL}userStatus/${userId}`, {status}).then(
                                console.log("Called"),
                                res => res.data),
                },
                location: {
                        getlocations: () => axios.get(`${URL}locations/`)
                                .then(res => res.data),
                        getLocationById: (locationId) => axios.get(`${URL}location/${locationId}`).then(res => res.data),
                        create: (name) => axios.post(`${URL}location/`, { name }).then(res => res.data),
                },
                role: {
                        getRoles: () => axios.get(`${URL}roles/`)
                                .then(res => res.data),
                        getRoleById: (roleId) => axios.get(`${URL}role/${roleId}`).then(res => res.data),

                }
                ,
                area: {
                        getAreas: () => axios.get(`${URL}areas/`)
                                .then(res => res.data),
                        getAreaById: (areaId) => axios.get(`${URL}area/${areaId}`).then(res => res.data),
                }
                ,
                position: {
                        getPositions: () => axios.get(`${URL}positions/`)
                                .then(res => res.data),
                        getPositionById: (positionId) => axios.get(`${URL}position/${positionId}`).then(res => res.data),

                },
                period: {
                        getPeriods: () => axios.get(`${URL}periods/`)
                                .then(res => res.data),
                        getPeriodActived: () => axios.get(`${URL}period-actived/`)
                                .then(res => res.data),
                        getPeriodById: (periodId) => axios.get(`${URL}period/${periodId}`).then(res => res.data),
                        create: (name, startdate, enddate, status) => axios.post(`${URL}period/`, { name, startdate, enddate, status }).then(res => res.data),
                        updatePeriod: (_id, name, startdate, enddate, status) => axios.put(`${URL}period/${_id}`, { name, startdate, enddate, status }).then(
                                res => res.data),
                },
                subcategory: {
                        getSubcategories: () => axios.get(`${URL}subcategories/`)
                                .then(res => res.data),
                },
                category: {
                        getCategories: () => axios.get(`${URL}categories/`)
                                .then(res => res.data),

                },
                value: {
                        getValues: () => axios.get(`${URL}values/`)
                                .then(res => res.data),
                },
                recognition: {
                        create: (description, userAssignId, usercreateId, categoryId, subcategoryId, valueId, periodId, sherpasNum, sherpascommittee, client) =>
                                axios.post(`${URL}recognize/`, { description, userAssignId, usercreateId, categoryId, subcategoryId, valueId, periodId, sherpasNum, sherpascommittee, client })
                                        .then(res => res.data),
                        aprove: () => axios.get(`${URL}approve/`).then(res => res.data),
                        update: (recognizeId, status) => axios.put(`${URL}recognize/${recognizeId}`, { status }).then(
                                res => res.data),
                        getRecognize: (recognizeId) =>  axios.get(`${URL}recognize/${recognizeId}`).then(
                                res => res.data),
                        updateInfo: (recognizeId,description, userAssignId, usercreateId, categoryId, subcategoryId, valueId, periodId, client,sherpasNum,sherpascommittee) =>
                        axios.put(`${URL}recognizeinfo/${recognizeId}`, { description, userAssignId, usercreateId, categoryId,subcategoryId, valueId, periodId, client,sherpasNum,sherpascommittee })
                                .then(res => res.data),
                        delete: (recognizeId) => axios.delete(`${URL}recognize/${recognizeId}`).then(
                                res => res.data)
                },
                infoRecognition: {
                        getRecognitionByUser: (userId) => axios.get(`${URL}recognitions_user/${userId}`).then(res => res.data),
                        searchByMonth: (startdate,enddate) => axios.get(`${URL}search_by_month/${startdate}&${enddate}`).then(res => res.data),
                        searchByCategory: (categoryId) => axios.get(`${URL}search_by_category/${categoryId}`).then(res => res.data),
                        searchBySubcategory: (subcategoryId) => axios.get(`${URL}search_by_subcategory/${subcategoryId}`).then(res => res.data),
                        getRecognitionByUserPeriod: (userId,periodId) => axios.get(`${URL}recognitions_period/${userId}&${periodId}`).then(res => res.data),
                        getPendingRecognitions: () => axios.get(`${URL}information_pending/`).then(res => res.data),
                        getReceiveRecognitions: () => axios.get(`${URL}information_assign/`).then(res => res.data),
                        getSendRecognitions: () => axios.get(`${URL}information_created/`).then(res => res.data),
                        getPointsTotalUserPeriod: (userId) => axios.get(`${URL}acomulate_table_actual_user/${userId}`).then(res => res.data),
                        getPointsTotalUserPeriodSelected: (userId, periodId) => axios.get(`${URL}acomulate_table_select_user_period/${userId}&${periodId}`).then(res => res.data),
                        getPointsTotalAllActualPeriod: (areaId) => axios.get(`${URL}acomulate_table_actual_area/${areaId}`).then(res => res.data),
                        getPointsTotalAllPeriodSelected: (areaId,periodId) => axios.get(`${URL}acomulate_table_select_area_period/${areaId}&${periodId}`).then(res => res.data),
                
                },
                catalogue: {
                        create: (title,locationId,category) => axios.post(`${URL}catalogue/`, { title,locationId,category })
                                        .then(res => res.data),
                        getCatalogueByCategoryandLocation: (category,locationId)  => axios.get(`${URL}catalogue_category_location/${category}&${locationId}`).then(res => res.data),
                },
                shopping: {
                        create: (catalogueId) => axios.post(`${URL}shopping/`, {catalogueId })
                        .then(res => res.data),
                        getShoppingUser: () => axios.get(`${URL}shopping_user/`).then(res => res.data),
                        getShoppings: () => axios.get(`${URL}shoppings/`).then(res => res.data),
                        update: (shoppingId, status) => axios.put(`${URL}shopping/${shoppingId}`, { status }).then(
                                res => res.data),

                }
        };