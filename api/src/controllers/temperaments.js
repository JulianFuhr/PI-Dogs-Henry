const { getDogs } = require("./dogs");
const { Temperaments } = require("../db");


const getTemperaments = async () => {
    try {
        //revisar en la bd si existen temperamentos.
        //si existe temp los devuelvo
        //si no existe obtengo los temperamentos de los perros y los inserto en la base de datos

        const temperaments = await Temperaments.findAll();
        if (temperaments.lenght > 0) {
            return temperaments
        } else {
            //Obtengo la lista de perros
            const dogsTemp = await getDogs();
            //Array para almacenar los temperamentos
            let arrayTemperament = [];
            //itero sobre la lista de perros
            dogsTemp.map(dogs => {
                //verifico si el perro tiene temperamentos
                if (dogs.temperament) {
                    //agrego los temperamentos al array
                    arrayTemperament.push(...dogs.temperament.split(", "))
                };
            })
        };

        //para que no haya repetidos
        const uniqueTemp = new Set(arrayTemperament);

        uniqueTemp.findOrCreate({
            where: {
                name: temperaments,
            }
        })

        return [...uniqueTemp]

        //iteramos sobre el array de temperamentos
        // arrayTemperament.map(temperamentName => {
        //     //Buscamos o creamos un temperamento en la base de datos
        //     Temperaments.findOrCreate({
        //         where: {
        //             name: temperamentName,
        //         }
        //     })
        // })
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    getTemperaments
}