const { Router } = require('express');
const dogRouter = Router();
const { getDogs, getDogsByID, getDogsByName, getTemperaments } = require("../controllers/dogs")

// Ruta GET para obtener información de un perro

dogRouter.get('/', async (req, res) => {
    try {
        const dogs = await getDogs();
        res.send(dogs);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

dogRouter.get('/name', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const dogsName = await getDogsByName(name);
            res.send(dogsName);
        } else if (!name) {
            res.status(400).json({ error: "debe ingresar el nombre a buscar" })
        };
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    };
});

dogRouter.get('/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    const dog = await getDogsByID(idRaza);
    res.send(dog);
});

// dogRouter.get('/temperaments', async (req, res) => {
//     const temperaments = await getTemperaments(temperaments)
// })


dogRouter.post('/', async (req, res) => {
    try {
        const { name, image } = req.body;
        const newDog = await createDog({ name, image, weight, height, life_span })
        res.send(newDog)
    } catch (error) {

    }
})


module.exports = dogRouter;