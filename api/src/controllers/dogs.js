const { Dog, Temperaments, DogsTemperaments } = require("../db");
const { getDogsFromApi } = require("../services/dogs.service");

const mapDogs = (dogs) => {
    return dogs.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        life_span: dog.life_span,
        weight_min: splitMed(dog.weight.metric).min,
        weight_max: splitMed(dog.weight.metric).max,
        height_min: splitMed(dog.height.metric).min,
        height_max: splitMed(dog.height.metric).max,
        temperament: dog.temperament
    }));
};

const mapDBDogs = (dogs) => {
    console.log(dogs);
    return dogs.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        life_span: dog.life_span,
        weight_min: dog.weight_min,
        weight_max: dog.weight_max,
        height_min: dog.height_min,
        height_max: dog.height_max,
        temperament: dog.Temperaments.map(temperament => temperament.name).join()
    }));
};

const splitMed = (medida) => {
    if (medida.includes('-')) {
        const medidaSplited = medida.trim().split('-')
        const medidaMax = medidaSplited[1]
        const medidaMin = medidaSplited[0]

        return {
            min: parseFloat(medidaMin),
            max: parseFloat(medidaMax),
        }


    } else {
        return {
            min: parseFloat(medida),
            max: parseFloat(medida),
        }
    }
}



const getApiDogs = async () => {
    try {
        const dogsFromApi = await getDogsFromApi()
        const mapeoDogs = mapDogs(dogsFromApi);

        return mapeoDogs;
    } catch (error) {
        console.error(error);
        throw new Error('Error al traer los datos de la API')
    }
}


const getDBDog = async () => {
    const dogsDB = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return mapDBDogs(dogsDB);
}

const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    const dbInfo = await getDBDog();
    const infoTotal = [...apiDogs, ...dbInfo];
    return infoTotal;
}

const getDogsByID = async (id) => {
    const dogs = await getAllDogs();
    const dogByID = dogs.find(dog => dog.id == id);
    return dogByID;
}

const getDogsByName = async (name) => {
    const dogs = await getAllDogs();
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
    getApiDogs,
    getDogsByID,
    getDogsByName,
    createDog,
    getDBDog,
    getAllDogs
}