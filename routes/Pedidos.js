//Rutas de Clientes
const express = require("express");
const router = express.Router();
const pedidosControler = require("../controlers/pedidosControler");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/auth");

//Crear un Pedidos
//api/pedidos
router.get("/", pedidosControler.index);

router.post("/register", [check("numero", "El numero es obligatorio").not().isEmpty()], pedidosControler.store );

router.put("/update/:id", pedidosControler.update );

// router.put("/active_desactive/:id", pedidosControler.active_desactive );

module.exports = router;
