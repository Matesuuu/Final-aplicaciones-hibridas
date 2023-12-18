import React, { useState } from "react";
import Nav from "./Nav.js";
import Footer from "./footer.js";

const RegistroRestaurante = () => {
  const [restauranteData, setRestauranteData] = useState({
    nombre: "",
    ubicacion: "",
    horarios: "",
    menu: [{ nombre: "", descripcion: "", precio: 0.0 }],
    reservas: [],
    reviews: [],
  });

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedMenu = [...restauranteData.menu];

    if (index !== null) {
      updatedMenu[index][field] = value;
    } else {
      setRestauranteData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }

    setRestauranteData((prevData) => ({
      ...prevData,
      menu: updatedMenu,
    }));
  };

  const handleAddMenu = () => {
    setRestauranteData((prevData) => ({
      ...prevData,
      menu: [...prevData.menu, { nombre: "", descripcion: "", precio: 0.0 }],
    }));
  };

  const handleRemoveMenu = (index) => {
    const updatedMenu = restauranteData.menu.filter((item, i) => i !== index);
    setRestauranteData((prevData) => ({
      ...prevData,
      menu: updatedMenu,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/restaurantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restauranteData),
      });

      if (response.ok) {
        console.log("Restaurante registrado correctamente");
        setRestauranteData({
          nombre: "",
          ubicacion: "",
          horarios: "",
          menu: [{ nombre: "", descripcion: "", precio: 0.0 }],
          reservas: [],
          reviews: [],
        });
      } else {
        console.error("Error al registrar el restaurante");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <Nav></Nav>
      <div className="container">
        <h2 className="text-center">Registro de Restaurante</h2>
        <form onSubmit={handleSubmit} className="mx-auto w-50">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del Restaurante:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={restauranteData.nombre}
              onChange={(e) => handleInputChange(e, null, "nombre")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ubicacion" className="form-label">
              Direccion del Restaurante:
            </label>
            <input
              type="text"
              className="form-control"
              id="ubicacion"
              name="ubicacion"
              value={restauranteData.ubicacion}
              onChange={(e) => handleInputChange(e, null, "ubicacion")}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="horarios" className="form-label">
              Horarios del Restaurante:
            </label>
            <input
              type="text"
              className="form-control"
              id="horarios"
              name="horarios"
              placeholder="De 08:00Hs a 23:00Hs"
              value={restauranteData.horarios}
              onChange={(e) => handleInputChange(e, null, "horarios")}
              required
            />
          </div>
          <div className="mb-3">
            <h3>Menú:</h3>
            <p>
              Para agregar otro plato simplemente hace click en el icono + y podrá agregar los datos
            </p>
            {restauranteData.menu.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col">
                  <label htmlFor={`nombre-${index}`} className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`nombre-${index}`}
                    name={`nombre-${index}`}
                    value={item.nombre}
                    onChange={(e) => handleInputChange(e, index, "nombre")}
                    required
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor={`descripcion-${index}`}
                    className="form-label"
                  >
                    Descripción:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`descripcion-${index}`}
                    name={`descripcion-${index}`}
                    value={item.descripcion}
                    onChange={(e) => handleInputChange(e, index, "descripcion")}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor={`precio-${index}`} className="form-label">
                    Precio:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`precio-${index}`}
                    name={`precio-${index}`}
                    value={item.precio}
                    onChange={(e) => handleInputChange(e, index, "precio")}
                    required
                  />
                </div>
                <div className="col">
                  <label
                    className="form-label"
                    style={{ visibility: "hidden" }}
                  >
                    dwadaa
                  </label>
                  <button
                    type="button"
                    className="btn form-control"
                    onClick={() => handleRemoveMenu(index)}
                  >
                    <i class="fa-solid fa-trash"></i>
                    
                  </button>
                </div>
              </div>
            ))}
            <div className="mx-auto text-center">
              <button type="button" className="btn mt-3" onClick={handleAddMenu}>
                <i className="fa-solid fa-plus"></i>
              </button>
              
            </div>
          </div>
          <div className="mx-auto text-center mt-5">
          <button type="submit" className="btn ">
            Registrar Restaurante
          </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RegistroRestaurante;
