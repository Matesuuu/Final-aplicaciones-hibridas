const Review = require("../models/reviewModel");
const Usuario = require("../models/userModel");
const Restaurante = require("../models/restaurantModel");

exports.crearResena = async (req, res) => {
  try {
    const { userId, restaurantId, rating, comment } = req.body;

    console.log(userId, restaurantId, rating);

    if (!userId || !restaurantId || rating === undefined) {
      return res.status(400).json({
        msg: "Faltan campos obligatorios",
      });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({
        msg: "La calificación debe estar entre 1 y 10",
      });
    }

    const user = await Usuario.findById(userId);
    const restaurante = await Restaurante.findById(restaurantId);

    if (!user || !restaurante) {
      return res.status(404).json({
        msg: "Usuario o restaurante no encontrado",
      });
    }

    const nuevaResena = new Review({
      user: userId,
      restaurant: restaurantId,
      rating,
      comment,
    });

    await nuevaResena.save();

    user.reviews.push(nuevaResena);
    restaurante.reviews.push(nuevaResena);

    await user.save();
    await restaurante.save();

    res.status(201).json({
      msg: "Reseña registrada correctamente",
      id: nuevaResena._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerTodasResenas = async (req, res) => {
  try {
    const resenas = await Review.find();
    res.status(200).json(resenas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerResenaPorID = async (req, res) => {
  const { id } = req.params;

  try {
    const resena = await Review.findById(id);

    if (!resena) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    res.status(200).json(resena);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.actualizarResena = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const resena = await Review.findById(id);

    if (!resena) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({
        msg: "La calificación debe estar entre 1 y 10",
      });
    }

    resena.rating = rating;
    resena.comment = comment;

    await resena.save();

    res.status(200).json({
      msg: "Reseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.eliminarResena = async (req, res) => {
  const { id } = req.params;

  try {
    const resena = await Review.findById(id);

    if (!resena) {
      return res.status(404).json({ msg: "Reseña no encontrada" });
    }

    await resena.remove();

    res.status(200).json({
      msg: "Reseña eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
