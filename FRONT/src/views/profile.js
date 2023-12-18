// Profile.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Nav from "../components/Nav";
import Footer from "../components/footer";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el token desde el localStorage
    const authToken = localStorage.getItem("token");

    if (authToken) {
      // Decodificar el token para obtener los datos del usuario
      const decodedUser = jwtDecode(authToken);
      setUser(decodedUser);
    }
  }, []);

  const handleLogout = () => {
    // Limpiar el token del localStorage al cerrar sesión
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <div className="container mt-4">
        <h1>Perfil de Usuario</h1>
        {user ? (
          <div>
            <p>
              <strong>Correo Electrónico:</strong> {user.email}
            </p>
            <button className="btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <p>No se pudo cargar la información del usuario.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
