import React, { useState } from "react";
import Nav from "./Nav.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realiza la solicitud de autenticación a tu API
    const endpoint = "http://localhost:3000/api/authenticate";
    const data = { email, password };

    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(endpoint, config);
      const json = await response.json();

      if (response.ok) {
        // Almacena el token en el almacenamiento local (local storage)
        localStorage.setItem("token", json.token);

        // Redirige a la página de restaurantes (o a donde desees)
        window.location.href = "/restaurants";
      } else {
        setError(json.msg || "Error en la autenticación");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error en el servidor");
    }
  };

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="container">
        <h1 className="text-center">Iniciar Sesión</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin} className="mt-3 w-50 mx-auto">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center m-3">
            <button type="submit" className="btn">
              Iniciar Sesión
            </button>
          </div>
          <div className="text-center m-3">
            <Link to="/register" className="btn ">
              Registrarse
            </Link>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
