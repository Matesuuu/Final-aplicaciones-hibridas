const Restaurante = require('../models/restaurantModel');


exports.crearRestaurante = async (req, res) => {
    try {
      const { nombre, ubicacion, horarios, menu, reviews, reservas } = req.body;
  
      if (!nombre || !ubicacion || !horarios || !menu) {
        return res.status(400).json({
          msg: 'Faltan campos',
        });
      }
  
      const nuevoRestaurante = new Restaurante({
        nombre,
        ubicacion,
        horarios,
        menu, 
        reviews, 
        reservas, 
      });
      console.log(nuevoRestaurante);
      await nuevoRestaurante.save();
  
      res.status(201).json({
        msg: 'Restaurante registrado correctamente',
        id: nuevoRestaurante._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };


exports.obtenerTodosRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.find();
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

exports.obtenerRestaurantePorID = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurante = await Restaurante.findById(id);

    if (!restaurante) {
      return res.status(404).json({ msg: 'Restaurante no encontrado' });
    }

    res.status(200).json(restaurante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};


exports.actualizarRestaurante = async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion, horarios, menu, reviews, reservas } = req.body;
  
    try {
      const restaurante = await Restaurante.findById(id);
  
      if (!restaurante) {
        return res.status(404).json({ msg: 'Restaurante no encontrado' });
      }
  
      restaurante.nombre = nombre;
      restaurante.ubicacion = ubicacion;
      restaurante.horarios = horarios;
      restaurante.menu = menu;
      restaurante.reviews = reviews; 
      restaurante.reservas = reservas; 
  
      await restaurante.save();
  
      res.status(200).json({
        msg: 'Restaurante actualizado correctamente',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };

exports.eliminarRestaurante = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurante = await Restaurante.findById(id);

    if (!restaurante) {
      return res.status(404).json({ msg: 'Restaurante no encontrado' });
    }

    await restaurante.remove();

    res.status(200).json({
      msg: 'Restaurante eliminado correctamente',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

