const axios = require("axios");

const DOGS_URL = "https://api.thedogapi.com/v1/breeds/?api_key=live_ge5IEIWLStFJcMVsGjfZCvrFIPz0ZEQqFFJuVRU7XKEohQs2EF8ojn8GtwblMI6i";

const getDogsFromApi = async () => {
    const { data: dogs } = await axios.get(DOGS_URL);
    return dogs;
}

module.exports = {
    getDogsFromApi
}