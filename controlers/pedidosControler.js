const Pedidos = require("../models/Pedidos");
const { validationResult } = require("express-validator");


exports.index = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const option = {
      page,
      limit: parseInt(limit),
      sort: { date: "desc" }
    }

    const pedidos = await Pedidos.paginate( {}, option);
    res.status(200).json( pedidos );
  } catch (error) {
    console.log(error.message, 'Error pedidosControler funcion index');
    res.status(500).json({ msg: "Error en la consulta" });
  }
};


exports.store = async (req, res) => {
  //Verificar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Creamos el Pedidos
  let pedidos = new Pedidos(req.body);

  await pedidos.save();
  res.status(200).json(pedidos);
};


exports.update = async (req, res) => {
  try {
    const pedidosId = req.params.id;
    let pedidos = await Pedidos.findByIdAndUpdate({ _id: pedidosId}, { $set: req.body}, { new: true});

    res.status(201).json({
      msg: "Pedido actualizado",
      obj: pedidos,
    });
  } catch (error) {
    console.log(error, 'Error pedidosControler funcion update');
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
