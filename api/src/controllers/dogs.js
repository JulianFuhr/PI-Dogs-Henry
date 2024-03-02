const { Dog, Temperaments, DogsTemperaments } = require("../db");
const { getDogsFromApi } = require("../services/dogs.service");

//*mapa de los perros, le paso el from para indicar que vienen de la APi
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
        temperament: dog.temperament,
        from: "API",
    }));
};

//* mapa de Perros desde la DB
const mapDBDogs = (dogs) => {
    return dogs.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image,
        life_span: dog.life_span,
        weight_min: dog.weight_min,
        weight_max: dog.weight_max,
        height_min: dog.height_min,
        height_max: dog.height_max,
        //*mapeo los temps del perro y los uno en una cadena
        temperament: dog.Temperaments.map(temperament => temperament.name).join(),
        from: "DataBase",
    }));
};

const splitMed = (medida) => {
    if (medida.includes('-')) {
        //*para dividir los valores que tengan un "-" de por medio
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


//traer los perros de la API y mapeo la info de cada
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

//consulta a la BD inc temp asociados
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

//combino la info de ambos
const getAllDogs = async () => {
    const apiDogs = await getApiDogs();
    const dbInfo = await getDBDog();
    const infoTotal = [...apiDogs, ...dbInfo];
    return infoTotal;
}

//obtengo la info completa de cada
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

    //hago relacion con temps para ver si existen
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