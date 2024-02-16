const { getDogs } = require("./dogs");
const { Temperaments } = require("../db");


const getTemperaments = async () => {
    try {
        //revisar en la bd si existen temperamentos.
        //si existe temp los devuelvo
        //si no existe obtengo los temperamentos de los perros y los inserto en la base de datos
        debugger;
        const temperaments = await Temperaments.findAll({ raw: true });
        if (temperaments.length > 0) {
            console.log("entro if");
            return temperaments
        } else {
            console.log("entro else");
            //Obtengo la lista de perros
            const dogsTemp = await getDogs();

            //pongo un array para almacenar los temps unicos
            const uniqueTemp = new Set();

            //itero sobre la lista de perros
            dogsTemp.forEach(dogs => {
                //verifico si el perro tiene temps
                if (dogs.temperament) {
                    //agrego los temps al array y evitamos los dup
                    dogs.temperament.split(", ").forEach(temp => uniqueTemp.add({ name: temp }))

                };
            })
            //para que no haya repetidos
            const uniqueTempArray = Array.from(uniqueTemp);


            //creo los temps en la BD
            await Temperaments.bulkCreate(uniqueTempArray)

            return Temperaments.findAll();
        };


    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    getTemperaments
}