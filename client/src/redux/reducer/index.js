import { GET_DOGS } from "../actions";


let initialState = { allDogs: [], usersCopy: [], posts: [] };

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                usersCopy: action.payload
            };
        default:
            return state;
    }
}


export default rootReducer;