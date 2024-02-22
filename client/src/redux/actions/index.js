import axios from "axios"

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_ALL_TEMPERAMENT = "GET_ALL_TEMPERAMENT";
export const SORT_FILTER_A_Z = "SORT_FILTER_A_Z";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const API_DB_FILTER = "API_DB_FILTER";
export const RESET_FILTER = "RESET_FILTER";
export const SORT_FILTER_WEIGHT = "SORT_FILTER_WEIGHT";
export const RESET_DOG = "RESET_DOG";
export const RESET_LOADING = "RESET_LOADING";
export const RESET_DOGS = "RESET_DOGS";





const DOGS_URL = "http://localhost:3001"


export function getDogs() {
    return async function (dispatch) {
        const dog = await axios(`${DOGS_URL}/dogs`);
        return dispatch({ type: GET_DOGS, payload: dog.data })
    }
};


export const getDogById = (id) => async (dispatch) => {
    try {
        const dogById = await axios(`${DOGS_URL}/dogs/${id}`);
        return dispatch({ type: GET_DOG_BY_ID, payload: dogById.data });
    } catch (error) {
        const dogsIdNoSearch = [];
        return dispatch({ type: GET_DOGS_BY_NAME, payload: dogsIdNoSearch })
    }
}


export const getAllTemperaments = () => async (dispatch) => {
    try {
        const allTemperaments = await axios(`${DOGS_URL}/temperaments`)
        const temperamentsSorted = allTemperaments.data.sort((a, b) => a.name.localeCompare(b.name));
        return dispatch({ type: GET_ALL_TEMPERAMENT, payload: temperamentsSorted });
    } catch (error) {
        throw new Error(error);
    }
};


export const getDogsByName = (name) => async (dispatch) => {
    try {
        const dogsName = await axios(`${DOGS_URL}/dogs/name?name=${name}`);
        return dispatch({ type: GET_DOGS_BY_NAME, payload: dogsName.data });
    } catch (error) {
        const dogsNameNoSearch = []
        return dispatch({ type: GET_DOGS_BY_NAME, payload: dogsNameNoSearch })
    }
};


export const sortFilterAZ = (dogs, value) => {
    try {
        let dogSorted = []
        if (value === "ASC") {
            dogSorted = dogs.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (value === "DESC") {
            dogSorted = dogs.sort((a, b) => b.name.localeCompare(a.name))
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_A_Z, payload: dogSorted })
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const temperamentFilter = (dogs, value) => {
    try {
        let dogFilter = dogs.filter(dog => dog.temperament?.toUpperCase().includes(value.toUpperCase()));
        return function (dispatch) {
            dispatch({ type: TEMPERAMENT_FILTER, payload: dogFilter })
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const apiDbFilter = (dogs, value) => {
    try {

        let dogFilter = []
        dogs.forEach(dog => {
            if (dog.from === value) dogFilter.push(dog);

        });
        return function (dispatch) {
            dispatch({ type: API_DB_FILTER, payload: dogFilter });
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const sortFilterLH = (dogs, value) => {
    try {
        let dogsSorted = []
        if (value === "high-low") {
            dogsSorted = dogs.sort(
                (a, b) =>
                    (a.minWeight < b.minWeight) ? 1 : (a.minWeight > b.minWeight) ? -1 : 0);
        }
        if (value === "low-high") {
            dogsSorted = dogs.sort(
                (a, b) =>
                    (a.minWeight > b.minWeight) ? 1 : (a.minWeight < b.minWeight) ? -1 : 0);
        }
        return function (dispatch) {
            dispatch({ type: SORT_FILTER_WEIGHT, payload: dogsSorted })
        }
    } catch (error) {
        throw new Error(error)
    }
};


export const resetFilter = () => {
    return function (dispatch) {
        dispatch({ type: RESET_FILTER })
    }
};


export const resetDog = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOG })
    }
};


export const resetLoading = () => {
    return function (dispatch) {
        dispatch({ type: RESET_LOADING })
    }
};


export const resetDogs = () => {
    return function (dispatch) {
        dispatch({ type: RESET_DOGS })
    }
}