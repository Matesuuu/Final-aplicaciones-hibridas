const express = require("express");
const cors = require("cors");

const dataBase = require("./dataBase");
const userController = require("./controllers/userController");
const restaurantController = require("./controllers/restaurantController");
const reviewController = require("./controllers/reviewController");
const reservaController = require("./controllers/reservaController");
const jwt = require("jsonwebtoken");
const Usuario = require("./models/userModel");

const secretKey = "messi";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

dataBase.on("error", () => {
  console.error("Error de conexion con MongoDB");
});

dataBase.once("open", () => {
  console.log("Conexion con MongoDB exitosa");
});

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);

  if (!authorizationHeader) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  const tokenParts = authorizationHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).json({ message: "Token no válido" });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("<h1>API REST </h1>");
});

app.get("/api/restaurantes", restaurantController.obtenerTodosRestaurantes);
app.get("/api/restaurantes/:id", restaurantController.obtenerRestaurantePorID);
app.post("/api/restaurantes", restaurantController.crearRestaurante);
app.put("/api/restaurantes/:id", restaurantController.actualizarRestaurante);
app.delete("/api/restaurantes/:id", restaurantController.eliminarRestaurante);

app.get("/api/usuarios", userController.obtenerTodosUsuarios);
app.get("/api/usuarios/:id", userController.obtenerUsuarioPorID);
app.post("/api/usuarios/auth", userController.auth);
app.post("/api/usuarios", userController.crearUsuario);
app.put("/api/usuarios/:id", userController.actualizarUsuario);
app.delete("/api/usuarios/:id", userController.eliminarUsuario);

app.post("/api/authenticate", (req, res) => {
  const { email, password } = req.body;

  Usuario.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }

      if (user.comparePassword(password)) {
        const token = jwt.sign(
          { email: user.email, _id: user._id },
          secretKey,
          { expiresIn: "1h" }
        );

        res.json({ token });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error en el servidor" });
    });
});

app.get("/api/reservas", reservaController.obtenerTodasReservas);
app.get("/api/reservas/:id", reservaController.obtenerReservaPorID);
app.post("/api/reservas", verifyToken, reservaController.crearReserva);
app.put("/api/reservas/:id", verifyToken, reservaController.actualizarReserva);
app.delete("/api/reservas/:id", verifyToken, reservaController.eliminarReserva);

app.get("/api/resenas", reviewController.obtenerTodasResenas);
app.get("/api/resenas/:id", reviewController.obtenerResenaPorID);
app.post("/api/resenas", verifyToken, reviewController.crearResena);
app.put("/api/resenas/:id", verifyToken, reviewController.actualizarResena);
app.delete("/api/resenas/:id", verifyToken, reviewController.eliminarResena);

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);
});
