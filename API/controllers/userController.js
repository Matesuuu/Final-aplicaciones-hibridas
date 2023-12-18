const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const clave = "appKey";

exports.crearUsuario = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "Faltan campos",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }

    const passHash = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: passHash,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      clave,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      msg: "Usuario registrado correctamente",
      id: newUser._id,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerTodosUsuarios = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.obtenerUsuarioPorID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    user.name = name;
    await user.save();

    res.status(200).json({
      msg: "Usuario actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await user.remove();

    res.status(200).json({
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.auth = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica en la db si existe el usuario
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Usuario inválido" });
    }

    // Comparar la contraseña, retorna un boolean
    const passwordValido = await bcrypt.compare(password, user.password);

    if (!passwordValido) {
      return res.status(401).json({ msg: "Contraseña inválida" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, clave, {
      expiresIn: "1h",
    });

    res.status(201).json({
      msg: "Autenticación correcta",
      token,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
