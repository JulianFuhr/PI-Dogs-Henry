const axios = require("axios");

const DOGS_URL = "https://api.thedogapi.com/v1/breeds/";

const getDogsFromApi = async () => {
    const { data: dogs } = await axios.get(DOGS_URL);
    return dogs;
}

module.exports = {
    getDogsFromApi
}