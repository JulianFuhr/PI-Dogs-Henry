const { Router } = require('express');
const dogRouter = require('./dogs.routes.js');
const temperamentRoute = require('./temperaments.routes.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRouter);
router.use('/temperaments', temperamentRoute);


module.exports = router;
