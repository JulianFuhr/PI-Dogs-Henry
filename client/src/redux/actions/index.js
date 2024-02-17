import axios from "axios"

export const GET_DOGS = "GET_DOGS"

const DOGS_URL = "http://localhost:3001"


export function getDogs() {
    return async function (dispatch) {
        const response = await axios(`${DOGS_URL}/dogs`);
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}