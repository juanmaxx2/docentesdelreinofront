import { GET_DEPARTMENT, GET_PROVINCES_DEPARTMENT, GET_NATIONAL_LAW_DELETED, GET_PROVINCE_LAW_DELETED, DELETED_USERS, USERS, RESET_ACTIVITY, LOGIN, RESET_INSTITUTION, RESET_INSTITUTIONS, GET_ALL_INSTITUTION, GET_PROVINCE_LAW, GET_NATIONAL_LAW, GET_PROVINCE, GET_PROVINCES, GET_ACTIVITIES, GET_ACTIVITY, CREATE_ACTIVITY, CREATE_PRAYERDAY, GET_INSTITUTION, DELETE_ACTIVITY, UPDATE_INSTITUTION } from "./actions";

const initialState = {
    activities: [],
    activity: {},
    province: {},
    provinces: {},
    institution: {},
    institutions: {},
    law: {},
    lawDeleted: {},
    provinceLaw: {},
    provinceLawDeleted: {},
    token: {},
    users: {},
    deletedUsers: {},
    departments: [],
    department: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROVINCE:
            return { ...state, province: action.payload };
        case GET_PROVINCES:
            return { ...state, provinces: action.payload };
        case GET_PROVINCES_DEPARTMENT:
            return { ...state, departments: action.payload };
        case GET_DEPARTMENT:
            return { ...state, department: action.payload };
        case GET_ACTIVITIES:
            return { ...state, activities: action.payload };
        case GET_ACTIVITY:
            return { ...state, activity: action.payload };
        case CREATE_ACTIVITY:
            return { ...state, activities: action.payload };
        case CREATE_PRAYERDAY:
            return { ...state, activities: action.payload };
        case GET_ALL_INSTITUTION:
            return { ...state, institutions: action.payload };
        case GET_INSTITUTION:
            return { ...state, institution: action.payload };
        case DELETE_ACTIVITY:
            return {
                ...state, activities: state.activities.filter((act) => {
                    if (action.payload.name == "Activity" && act.city && act.id == action.payload.id) return false;
                    if (action.payload.name == "PrayerDay" && act.url && act.id == action.payload.id) return false;
                    return true;
                })
            };
        case UPDATE_INSTITUTION:
            return { ...state, institution: action.payload };
        case GET_NATIONAL_LAW:
            return { ...state, law: action.payload };
        case GET_NATIONAL_LAW_DELETED:
            return { ...state, lawDeleted: action.payload };
        case GET_PROVINCE_LAW:
            return { ...state, provinceLaw: action.payload };
        case GET_PROVINCE_LAW_DELETED:
            return { ...state, provinceLawDeleted: action.payload };
        case LOGIN:
            return { ...state, token: action.payload };
        case USERS:
            return { ...state, users: action.payload };
        case DELETED_USERS:
            return { ...state, deletedUsers: action.payload };
        case RESET_INSTITUTIONS:
            return {
                ...state,
                institutions: [],
            };
        case RESET_INSTITUTION:
            return {
                ...state,
                institution: {},
            };
        case RESET_ACTIVITY:
            return {
                ...state,
                activity: {},
            };
        default:
            return { ...state };
    };
};

export default rootReducer;