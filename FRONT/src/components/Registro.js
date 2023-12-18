import { useState } from "react";
import Nav from "./Nav.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";

function Registro() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Nuevo estado

  const endpoint = "http://localhost:3000/api/usuarios";

  function handlerRegister(e) {
    e.preventDefault();

    // Validaciones
    if (
      (nameTouched && !validateName(name)) ||
      (emailTouched && !validateEmail(email)) ||
      (passwordTouched && !validatePassword(password))
    ) {
      setError("Por favor, revise los campos ingresados.");
      setSuccess(false); // Establecer el estado de éxito como falso
      return;
    }

    const data = {
      name,
      email,
      password,
    };

    const config = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(endpoint, config)
      .then((resp) => resp.json())
      .then((json) => {
        setError("Registro completado correctamente");
        setSuccess(true); // Establecer el estado de éxito como verdadero
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      })
      .catch((error) => {
        setError("Error al registrar. Por favor, inténtelo de nuevo.");
        setSuccess(false); // Establecer el estado de éxito como falso
        console.error(error);
      });
  }

  // Funciones de validación
  function validateName(name) {
    // Solo permite letras y espacios, y tiene un máximo de 20 caracteres
    const regex = /^[a-zA-Z\s]{1,20}$/;
    return regex.test(name);
  }

  function validateEmail(email) {
    // Utiliza una expresión regular para verificar que sea un correo válido y tiene un máximo de 50 caracteres
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    // La contraseña debe tener entre 4 y 10 caracteres
    return password.length >= 4 && password.length <= 10;
  }

  return (
    <div>
      <Nav />
      <div className="container">
        <form onSubmit={handlerRegister} className="w-50 mx-auto">
          <h1 className="text-center">Registro</h1>

          {error && (
            <div className={`alert ${success ? "alert-success" : "alert-danger"}`}>
              {error}
            </div>
          )}

          <label className="form-label">Nombre:</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameTouched(true);
            }}
            type="text"
            className="form-control"
          />
          {nameTouched && !validateName(name) && (
            <div className="alert alert-danger">
              Ingrese un nombre válido (máximo 20 caracteres).
            </div>
          )}

          <label className="form-label">Email:</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailTouched(true);
            }}
            type="email"
            className="form-control"
          />
          {emailTouched && !validateEmail(email) && (
            <div className="alert alert-danger">
              Ingrese un correo válido (máximo 50 caracteres).
            </div>
          )}

          <label className="form-label"> Contraseña:</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
            }}
            type="password"
            className="form-control"
          />
          {passwordTouched && !validatePassword(password) && (
            <div className="alert alert-danger">
              La contraseña debe tener entre 4 y 10 caracteres.
            </div>
          )}
          <div className="text-center m-3">
            <button type="submit" className="btn mt-3 fs-5">
              Registrarme
            </button>
          </div>
          <div className="text-center m-3">
            <Link to="/login" className="border-bottom border-secondary text-decoration-none text-secondary fs-5">
              Iniciar sesión
            </Link>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Registro;
