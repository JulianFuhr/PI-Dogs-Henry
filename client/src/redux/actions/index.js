import axios from "axios"

export const GET_DOGS = "GET_DOGS"


export function getDogs() {
    return async function (dispatch) {
        const response = await axios("https://api.thedogapi.com/v1/breeds");
        console.log(response);
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}