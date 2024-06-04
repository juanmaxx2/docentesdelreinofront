import { GET_PROVINCE, GET_ACTIVITIES, GET_ACTIVITY, CREATE_ACTIVITY, CREATE_PRAYERDAY, GET_INSTITUTION, DELETE_ACTIVITY, UPDATE_INSTITUTION } from "./actions";

const initialState = {
    activities: [],
    activity: {},
    provinces: {},
    institution: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROVINCE:
            return { ...state, provinces: action.payload };
        case GET_ACTIVITIES:
            return { ...state, activities: action.payload };
        case GET_ACTIVITY:
            return { ...state, activity: action.payload };
        case CREATE_ACTIVITY:
            return { ...state, activities: action.payload };
        case CREATE_PRAYERDAY:
            return { ...state, activities: action.payload };
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
            return { ...state, institution: action.payload};
        default:
            return { ...state };
    };
};

export default rootReducer;