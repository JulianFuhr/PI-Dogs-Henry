const { Router } = require('express');
const { getTemperaments } = require('../controllers/temperaments');
const temperamentRoute = Router();

temperamentRoute.get('/', async (req, res) => {
    try {
        const temperament = await getTemperaments();
        res.send(temperament);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message })
    }
})



module.exports = temperamentRoute;