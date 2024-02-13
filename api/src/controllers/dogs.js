const Temperaments = require("../models/Temperaments");
const { getDogsFromApi } = require("../services/dogs.service");

const getDogs = async () => {
    const dogsFromApi = await getDogsFromApi();
    return dogsFromApi;
}

const getDogsByID = async (id) => {
    const dogs = await getDogs();
    const dogByID = dogs.filter(dog => dog.id == id);
    return dogByID;
}

const getDogsByName = async (name) => {
    const dogs = await getDogs();
    const dogByName = dogs.filter(dog => { console.log("nombre", dog.name, name); return dog.name.toLowerCase().includes(name.toLowerCase()) })
    if (dogByName.length > 0) {
        return dogByName
    } else {
        throw new Error(`Dog not found${name}`)
    }

}

const getTemperaments = async () => {
    try {
        //Obtengo la lista de perros
        const dogsTemp = await getDogs();
        //Array para almacenar los temperamentos
        let arrayTemperament = [];
        //itero sobre la lista de perros
        dogsTemp.map(dogs => {
            //verifico si el perro tiene temperamentos
            if (dogs.temperaments) {
                //agrego los temperamentos al array
                arrayTemperament.push(...dogs.temperaments.split(", "))
            };
        });
        //iteramos sobre el array de temperamentos
        arrayTemperament.map(temperamentName => {
            //Buscamos o creamos un temperamento en la base de datos
            Temperaments.findOrCreate({
                where: {
                    name: temperamentName,
                }
            })
        })
    } catch (error) {
        throw new Error(error);
    }
}
// para mañana agregarlos en routes!!!!
const createDog = async ({ name, image, weight, height, life_span }) => {

}


module.exports = {
    getDogs,
    getDogsByID,
    getDogsByName,
    getTemperaments
}