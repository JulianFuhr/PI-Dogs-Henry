const { Router } = require('express');
const dogRouter = Router();
const { getAllDogs, getDogsByID, getDogsByName, createDog } = require("../controllers/dogs")

// Ruta GET para obtener información de un perro

dogRouter.get('/', async (req, res) => {
    try {
        const dogs = await getAllDogs();
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

        const { name, image, height_min, height_max, weight_min, weight_max, life_span, temperaments } = req.body;

        const dogNew = await createDog({
            name,
            image,
            height_max,
            height_min,
            weight_min,
            weight_max,
            life_span,
            temperaments
        })

        res.send(dogNew)
    } catch (error) {
        console.error("error", error);
        return res.status(404).json(error.message)
    }

})
// como depurar node.js

module.exports = dogRouter;