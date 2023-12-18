import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.js";
import Footer from "../components/footer.js";

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerRestaurantes = async () => {
      const endpoint = "http://localhost:3000/api/restaurantes";

      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
          setRestaurantes(data);
        } else {
          setError("Error al obtener los restaurantes");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        setError("Error en el servidor");
      }
    };

    obtenerRestaurantes();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Nav></Nav>
      <div className="container mt-4" style={{ flex: 1 }}>
        <h1>Restaurantes</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          {restaurantes.length === 0 ? (
            <p className="text-center">No hay restaurantes para mostrar.</p>
          ) : (
            <div className="row">
              {restaurantes.map((restaurante) => (
                <div key={restaurante._id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{restaurante.nombre}</h5>
                      <p className="card-text">
                        Direccion: {restaurante.ubicacion}
                      </p>
                      <p className="card-text">
                        Horarios: {restaurante.horarios}
                      </p>

                      <Link
                        to={`/restaurants/${restaurante._id}`}
                        className="btn"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Restaurantes;
