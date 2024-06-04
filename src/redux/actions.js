import axios from "axios";
import { GuardarLocalStorage } from "../components/LocalStorage/LocalStorage";

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CREATE_PRAYERDAY = 'CREATE_PRAYERDAY';
export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_INSTITUTION = 'GET_INSTITUTION';
export const UPDATE_INSTITUTION = 'UPDATE_INSTITUTION';

export const getProvince = () => {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/province');
        GuardarLocalStorage('provinces',response.data);
        dispatch({ type: GET_PROVINCE, payload: response.data });
    };
};

export const getActivities = (tipo, province) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/activity?tipo=${tipo}&province=${province}`);
        GuardarLocalStorage('activities',response.data);
        dispatch({ type: GET_ACTIVITIES, payload: response.data });
    };
};

export const getActivity = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/activity/${id}`);
        GuardarLocalStorage('activity',response.data);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const getPrayerDay = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/prayerday/${id}`);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const createActivity = (newActivity) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/activity', newActivity);
        dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    };
};

export const deleteActivity = (id) => {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/activity/${id}`);
        const name = "Activity";
        dispatch({ type: DELETE_ACTIVITY, payload: { id, name } });
    };
};

export const deletePrayerDay = (id) => {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/prayerday/${id}`);
        const name = "PrayerDay";
        dispatch({ type: DELETE_ACTIVITY, payload: { id, name } })
    }
}

export const createPrayerDay = (newActivity) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/prayerday', newActivity);
        dispatch({ type: CREATE_PRAYERDAY, payload: response.data });
    };
};

export const getInstitution = () => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:3001/institution/Docentes_del_Reino`);
        GuardarLocalStorage('institution',response.data);
        dispatch({ type: GET_INSTITUTION, payload: response.data });
    };
};

export const updateInstitution = (institution) => {
    return async function (dispatch) {
        const response = await axios.put(`http://localhost:3001/institution/Docentes_del_Reino`, institution);
        GuardarLocalStorage('institution',response.data);
        dispatch({ type: UPDATE_INSTITUTION, payload: response.data });
    };
};

export const updateActivity = (id,activity) => {
    return async function (dispatch) {
        const response = await axios.put(`http://localhost:3001/activity/${id}`, activity);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};

export const updatePrayerDay = (id,activity) => {
    return async function (dispatch) {
        const response = await axios.put(`http://localhost:3001/prayerday/${id}`, activity);
        dispatch({ type: GET_ACTIVITY, payload: response.data });
    };
};