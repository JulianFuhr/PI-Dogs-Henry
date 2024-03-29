const { getApiDogs } = require("./dogs");
const { Temperaments } = require("../db");


const getTemperaments = async () => {
    try {
        //revisar en la bd si existen temperamentos.
        //si existe temp los devuelvo
        //si no existe obtengo los temperamentos de los perros y los inserto en la base de datos
        const temperaments = await Temperaments.findAll({ raw: true });

        if (temperaments.length > 0) {

            return temperaments
        } else {

            //Obtengo la lista de perros
            const dogsTemp = await getApiDogs();



            //pongo un array para almacenar los temps unicos
            const uniqueTemp = new Set();

            //itero sobre la lista de perros
            dogsTemp.forEach(dogs => {

                //verifico si el perro tiene temps
                if (dogs.temperament) {
                    const splitedTemperament = dogs.temperament.split(", ")

                    //agrego los temps al array y evitamos los dup
                    splitedTemperament.forEach(temp => uniqueTemp.add(temp));
                };
            })
            //para que no haya repetidos

            const uniqueTempArray = Array.from(uniqueTemp);



            //creo los temps en la BD
            await Temperaments.bulkCreate(uniqueTempArray.map(temp => ({ name: temp })))

            return Temperaments.findAll();
        };


    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    getTemperaments
}