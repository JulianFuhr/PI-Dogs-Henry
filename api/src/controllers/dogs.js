const { Dog, DogsTemperaments } = require("../db");
const { getDogsFromApi } = require("../services/dogs.service");

const mapDogs = (dogs) => {
    return dogs.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        life_span: dog.life_span,
        weight_min: parseFloat(dog.weight.metric.slice(0, 2).trim()),
        weight_max: parseFloat(dog.weight.metric.slice(4).trim()),
        height_min: parseFloat(dog.height.metric.slice(0, 2).trim()),
        height_max: parseFloat(dog.height.metric.slice(4).trim())
    }));
};

const getDogs = async () => {
    try {
        const dogsFromApi = await getDogsFromApi()
        const mapeoDogs = mapDogs(dogsFromApi);

        console.log(mapeoDogs);
        return mapeoDogs;
    } catch (error) {
        console.error(error);
        throw new Error('Error al traer los datos de la API')
    }
}


const getDBDog = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: DogsTemperaments,
            attributes: ['name'],
            trough: {
                attributes: [],
            },
        }
    })
    console.log(dogsDB);
    return dogsDB;
}

const getAllDogs = async () => {
    const apiDogs = await getDogs();
    const dbInfo = await getDBDog();
    const infoTotal = [...apiDogs, ...dbInfo];
    return infoTotal;
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

    if (!name || !image || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperaments) {
        throw Error("no hay info del nuevo perro")
    }

    //creamos el perro en la BD
    const dogNew = await Dog.create({
        name,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,

    });

    //hago relacion cona temps para ver si existen
    if (temperaments && temperaments.length > 0) {
        for (const temperamentId of temperaments) {
            await DogsTemperaments.create({ DogId: dogNew.id, TemperamentId: temperamentId });

        }
    }

    return dogNew;
}






module.exports = {
    getDogs,
    getDogsByID,
    getDogsByName,
    createDog,
    getDBDog,
    getAllDogs
}