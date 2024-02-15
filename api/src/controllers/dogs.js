const { Dog, DogsTemperaments } = require("../db");
const { getDogsFromApi } = require("../services/dogs.service");

const getDogs = async () => {
    const dogsFromApi = await getDogsFromApi();
    return dogsFromApi;
}

const getDogsByID = async (id) => {
    const dogs = await getDogs();
    const dogByID = dogs.find(dog => dog.id == id);
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

const createDog = async ({ name, image, weight_min, weight_max, height_max, height_min, life_span, temperaments }) => {

    if (!name || !image || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperaments) throw Error("no hay info del nuevo perro")
    const dogNew = await Dog.create({
        name,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,

    });
    const tt = await DogsTemperaments.create({ DogId: dogNew.id, TemperamentId: temperaments })
    console.log(tt)
    // let addTemper = await Temperaments.findAll({
    //     where: { name: temperaments }
    // })
    // dogNew.addTemperaments(addTemper)

    return dogNew;
}






module.exports = {
    getDogs,
    getDogsByID,
    getDogsByName,
    createDog
}