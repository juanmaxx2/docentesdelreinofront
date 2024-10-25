import axios from "axios";
import { GuardarLocalStorage, PedirLocalStorage } from "../components/LocalStorage/LocalStorage";
const API_URL = import.meta.env.VITE_API_URL;

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_PRAYERDAY = 'CREATE_PRAYERDAY';
export const GET_PROVINCES = 'GET_PROVINCES';
export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_PROVINCES_DEPARTMENT = 'GET_PROVINCES_DEPARTMENT';
export const GET_DEPARTMENT = 'GET_DEPARTMENT';
export const GET_INSTITUTION = 'GET_INSTITUTION';
export const UPDATE_INSTITUTION = 'UPDATE_INSTITUTION';
export const GET_NATIONAL_LAW = 'GET_NATIONAL_LAW';
export const GET_PROVINCE_LAW = 'GET_PROVINCE_LAW';
export const GET_NATIONAL_LAW_DELETED = 'GET_NATIONAL_LAW_DELETED';
export const GET_PROVINCE_LAW_DELETED = 'GET_PROVINCE_LAW_DELETED';
export const GET_ALL_INSTITUTION = 'GET_ALL_INSTITUTION';
export const RESET_INSTITUTIONS = 'RESET_INSTITUTIONS';
export const RESET_INSTITUTION = 'RESET_INSTITUTION';
export const RESET_ACTIVITY = 'RESET_ACTIVITY';
export const LOGIN = 'LOGIN';
export const DELETED_USERS = 'DELETED_USERS';
export const USERS = 'USERS';

//!Province
export const getProvince = (name) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/province/${name}`);
        dispatch({ type: GET_PROVINCE, payload: response.data });
    }
}

export const getProvinces = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/province`);
        GuardarLocalStorage('provinces', response.data);
        dispatch({ type: GET_PROVINCES, payload: response.data });
    };
};

export const getDepartment = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/department`);
        dispatch({ type: GET_PROVINCES_DEPARTMENT, payload: response.data });
    };
};

export const updateDepartment = (department, id) => {
    return async function (dispatch) {
        const response = await axios.put(`${API_URL}/department/${id}`, department, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: GET_DEPARTMENT, payload: response.data });
    };
};

export const updateProvince = (province, name) => {
    return async function (dispatch) {
        const response = await axios.put(`${API_URL}/province/${name}`, province, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: GET_PROVINCE, payload: response.data });
    };
};

//!Activity
export const getActivities = (tipo, province, date) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/activity?tipo=${tipo}&province=${province}&date=${date}`);
        GuardarLocalStorage('activities', response.data);
        dispatch({ type: GET_ACTIVITIES, payload: response.data });
    };
};

export const getActivity = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/activity/${id}`);
        GuardarLocalStorage('activity', response.data);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const getPrayerDay = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/prayerday/${id}`);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const createActivity = (newActivity) => {
    return async function (dispatch) {
        const response = await axios.post(`${API_URL}/activity`, newActivity, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    };
};

export const createPrayerDay = (newActivity) => {
    return async function (dispatch) {
        const response = await axios.post(`${API_URL}/prayerday`, newActivity, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: CREATE_PRAYERDAY, payload: response.data });
    };
};

export const deleteActivity = (id) => {
    return async function (dispatch) {
        await axios.delete(`${API_URL}/activity/${id}`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        const name = "Activity";
        dispatch({ type: DELETE_ACTIVITY, payload: { id, name } });
    };
};

export const deletePrayerDay = (id) => {
    return async function (dispatch) {
        await axios.delete(`${API_URL}/prayerday/${id}`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        const name = "PrayerDay";
        dispatch({ type: DELETE_ACTIVITY, payload: { id, name } })
    }
};

export const updateActivity = (id, activity) => {
    return async function (dispatch) {
        const response = await axios.put(`${API_URL}/activity/${id}`, activity, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const updatePrayerDay = (id, activity) => {
    return async function (dispatch) {
        const response = await axios.put(`${API_URL}/prayerday/${id}`, activity, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

//!Institution
export const getInstitution = (name) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/association/${name}`);
        GuardarLocalStorage('institution', response.data);
        dispatch({ type: GET_INSTITUTION, payload: response.data });
    };
};

export const getAllInstitution = (name) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/association`, {
            params: { name }
        });
        GuardarLocalStorage('institution', response.data);
        dispatch({ type: GET_ALL_INSTITUTION, payload: response.data });
    };
};

export const updateInstitution = (name, institution) => {
    return async function (dispatch) {
        const response = await axios.put(`${API_URL}/association/${name}`, institution, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        GuardarLocalStorage('institution', response.data);
        dispatch({ type: UPDATE_INSTITUTION, payload: response.data });
    };
};


//!Laws
export const getNationalLaw = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/nationallaw`);
        dispatch({ type: GET_NATIONAL_LAW, payload: response.data });
    };
};

export const getProvinceLaw = (province) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/provinciallaw/${province}`);
        dispatch({ type: GET_PROVINCE_LAW, payload: response.data });
    };
};

export const getDeletedNationalLaw = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/nationallaw/deleted`);
        dispatch({ type: GET_NATIONAL_LAW_DELETED, payload: response.data });
    };
};

export const getDeletedProvinceLaw = (province) => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/provinciallaw/deleted/${province}`);
        dispatch({ type: GET_PROVINCE_LAW_DELETED, payload: response.data });
    };
};

export const createNationalLaw = (law) => {
    return async function (dispatch) {
        await axios.post(`${API_URL}/nationallaw`, law, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const createProvinceLaw = (law) => {
    return async function (dispatch) {
        await axios.post(`${API_URL}/provinciallaw`, law, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const deleteNationalLaw = (number) => {
    return async function (dispatch) {
        await axios.delete(`${API_URL}/nationallaw/${number}`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const deleteProvinceLaw = (number, province) => {
    return async function (dispatch) {
        await axios.delete(`${API_URL}/provinciallaw?number=${number}&province=${province}`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const unDeleteNationalLaw = (number) => {
    return async function () {
        await axios.delete(`${API_URL}/nationallaw/undeleted/${number}`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const updateNationalLaw = (number, law) => {
    return async function () {
        await axios.put(`${API_URL}/nationallaw/${number}`, law, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const updateProvinceLaw = (number, province, law) => {
    return async function () {
        await axios.put(`${API_URL}/provinciallaw/${province}/${number}`, law, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

//!User
export const loginAdmin = (user) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${API_URL}/admin/login`, user);
            dispatch({ type: LOGIN, payload: response.data });
            return response.data.token;
        } catch (error) {
            return error.response.data;
        }
    };
};

export const createAcount = (user) => {
    return async function () {
        await axios.post(`${API_URL}/admin/create`, user);
    }
}

export const getAllUsers = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/admin/all`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: USERS, payload: response.data });
    }
}

export const getDeletedUsers = () => {
    return async function (dispatch) {
        const response = await axios.get(`${API_URL}/admin/alldeleted`, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
        dispatch({ type: DELETED_USERS, payload: response.data });
    }
}

export const deleteUser = (email) => {
    return async function () {
        await axios.put(`${API_URL}/admin/delete`, email, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const unDeleteUser = (email) => {
    return async function () {
        await axios.put(`${API_URL}/admin/undelete`, { email }, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

export const updateUser = (user) => {
    return async function () {
        await axios.put(`${API_URL}/admin`, user, {
            headers: {
                'Authorization': `Bearer ${PedirLocalStorage('token')}`,
            },
        });
    };
};

//!Reset
export const resetActivity = () => {
    return {
        type: RESET_ACTIVITY,
    };
};

export const resetInstitutions = () => {
    return {
        type: RESET_INSTITUTIONS,
    };
};

export const resetInstitution = () => {
    return {
        type: RESET_INSTITUTION,
    };
};