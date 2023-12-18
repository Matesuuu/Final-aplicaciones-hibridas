import { Link } from "react-router-dom";
import React from "react";
import logo from "../logo.png";
import { jwtDecode } from "jwt-decode";

function Nav() {
  // Obtener el token desde el localStorage
  const authToken = localStorage.getItem("token");

  return (
    <header className="bg-primary text-white text-center mb-5">
      <nav
        className="navbar navbar-light navbar-expand-lg tahoma fs-5"
        id="offcanvasNavbarLabel"
      >
        <div className="container-fluid">
          <div className="d-inline-block ">
            {" "}
            <Link to="/">
              <img
                className="d-inline-block ms-3"
                src={logo}
                width="150px"
                alt="logo de Mi Restaurante"
              />
             
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header bg-primary">
              <Link to="/">
                <picture>
                  <img
                    className="pt-4 pb-4 px-4 img-fluid"
                    src={logo}
                    width="150px"
                    alt="Logo de mi restaurante"
                  />
                </picture>
              </Link>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body bg-primary">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-5">
              <li className="nav-item links dropdown ms-5">
                  <Link to="/" className="nav-link text-white">
                    Home
                  </Link>
                </li>
                <li className="nav-item links dropdown ms-5">
                  <Link to="/restaurants" className="nav-link text-white">
                    Restaurantes
                  </Link>
                </li>
                {/* Verificar si hay un token */}
                {authToken ? 
                (
                  // Mostrar saludo personalizado si hay un token
                  <li className="nav-item ms-5">
                    <Link className="nav-link links text-white" to="/profile">
                      Hola, {jwtDecode(authToken).email}
                    </Link>
                  </li>
                ) : (
                  // Mostrar enlace de inicio de sesión si no hay token
                  <li className="nav-item links dropdown ms-5">
                    <Link to="/login" className="nav-link text-white">
                      Iniciar Sesión
                    </Link>
                  </li>
                )}
                
                <li className="nav-item   dropdown ms-5">
                  <Link
                    to="/registerRestaurant"
                    className="nav-link text-white predioButton"
                  >
                    Registrar restaurante
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
