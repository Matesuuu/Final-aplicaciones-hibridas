const Reserva = require("../models/reservaModel");
const Usuario = require("../models/userModel");
const Restaurante = require("../models/restaurantModel");

exports.crearReserva = async (req, res) => {
  try {
    const { restauranteId, usuarioId, fecha, hora } = req.body;
    console.log(restauranteId, usuarioId, fecha, hora);

    if (!restauranteId || !usuarioId || !fecha || !hora) {
      return res.status(400).json({
        msg: "Faltan campos obligatorios",
      });
    }

    const restaurante = await Restaurante.findById(restauranteId);
    const usuario = await Usuario.findById(usuarioId);

    if (!restaurante || !usuario) {
      return res.status(404).json({
        msg: "Restaurante o usuario no encontrado",
      });
    }

    const nuevaReserva = new Reserva({
      restaurante: restauranteId,
      usuario: usuarioId,
      fecha,
      hora,
    });

    await nuevaReserva.save();

    usuario.reservas.push(nuevaReserva);
    restaurante.reservas.push(nuevaReserva);

    await usuario.save();
    await restaurante.save();

    res.status(201).json({
      msg: "Reserva registrada correctamente",
      id: nuevaReserva._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerTodasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerReservaPorID = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora } = req.body;

  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    reserva.fecha = fecha;
    reserva.hora = hora;

    await reserva.save();

    res.status(200).json({
      msg: "Reserva actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    await reserva.remove();

    res.status(200).json({
      msg: "Reserva eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
