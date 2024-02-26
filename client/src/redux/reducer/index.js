import {
    GET_DOGS,
    GET_DOG_BY_ID,
    GET_DOGS_BY_NAME,
    GET_ALL_TEMPERAMENT,
    SORT_FILTER_A_Z,
    TEMPERAMENT_FILTER,
    API_DB_FILTER,
    RESET_FILTER,
    SORT_FILTER_WEIGHT,
    RESET_DOG,
    RESET_LOADING,
    RESET_DOGS

} from "../actions";


let initialState = {
    dogsFromBE: [],
    dogs: [],
    dog: [],
    temperaments: [],
    loading: false,
    filter: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return { ...state, dogsFromBE: action.payload, dogs: action.payload, filter: true, loading: true }
        case GET_ALL_TEMPERAMENT:
            return { ...state, temperaments: action.payload }
        case GET_DOG_BY_ID:
            return { ...state, dog: action.payload, loading: true }
        case GET_DOGS_BY_NAME:
            return { ...state, dogs: action.payload, filter: true, loading: true }
        case SORT_FILTER_A_Z:
            return { ...state, dogs: action.payload, filter: true, loading: true }
        case TEMPERAMENT_FILTER:
            return { ...state, dogs: action.payload, filter: true }
        case API_DB_FILTER:
            return { ...state, dogs: action.payload, filter: true }
        case SORT_FILTER_WEIGHT:
            return { ...state, dogs: action.payload, filter: true }
        case RESET_FILTER:
            return { ...state, filter: false }
        case RESET_DOG:
            return { ...state, dog: [] }
        case RESET_DOGS:
            return { ...state, dogs: [] }
        case RESET_LOADING:
            return { ...state, loading: false }
        default:
            return { ...state };
    }
}


export default rootReducer;