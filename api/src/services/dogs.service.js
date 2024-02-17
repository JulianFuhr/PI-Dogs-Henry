const axios = require("axios");

const { DOGS_URL, API_KEY } = process.env


const getDogsFromApi = async () => {
    const url = `${DOGS_URL}/?api_key=${API_KEY}`
    const { data: dogs } = await axios.get(url);
    return dogs;
}

module.exports = {
    getDogsFromApi
}