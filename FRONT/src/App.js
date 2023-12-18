import "./App.css";
import Nav from "./components/Nav.js";
import Footer from "./components/footer.js";
import foto1 from "./img/Foodies - Chef Top Menu.png";
import foto2 from "./img/Foodies - Food Delivery 1.png";
import foto3 from "./img/The Munchies - Dish.png";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <Nav></Nav>
      </header>
      <div class="custom-shape-divider-top-1700889482">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <img src={foto1} className="imagenBlur" alt=""></img>
          </div>
          <div className="col pt-5">
            <h1>Mi Restaurante</h1>
            <p className="fs-6 helvetica">
              Explora y alquila el restaurante ideal para cada ocasión con
              nuestra plataforma fácil de usar. Desde cenas románticas hasta
              encuentros informales, te conectamos con una variedad de opciones
              culinarias.
              ¡Empieza tu búsqueda y haz de cada comida una experiencia
              memorable!
            </p>
          </div>
        </div>
      </div>
      <section className="background-2 mt-5">
        <div className="container">
          <div className="row text-white ">
            <div className="col mt-5 mb-5">
              <h1 className="">Registra tu restaurante</h1>
              <p className="fs-6 helvetica">
                ¡Únete a nuestra red de restaurantes y lleva tu negocio
                culinario al siguiente nivel! Al registrar tu restaurante con
                nosotros, tendrás acceso a una audiencia diversa de amantes de
                la comida ansiosos por descubrir nuevas experiencias
                gastronómicas. Ofrecemos una plataforma fácil de usar para
                gestionar tu perfil, actualizar menús, y responder a reseñas
                para destacar lo mejor de tu establecimiento. Aprovecha nuestra
                visibilidad en línea y atrae a más clientes a tu puerta.
                ¡Registra tu restaurante ahora y forma parte de nuestra
                comunidad gastronómica!
              </p>

              <div className="mx-auto text-center">
                <Link
                  to="/registerRestaurant"
                  className="text-white predioButton p-2 "
                >
                  Registrar restaurante
                </Link>
              </div>
            </div>
            <div className="col">
              <img src={foto2} id="imagen-delivery" alt=""></img>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col">
              <img src={foto3} alt="" id="img-burger"></img>
            </div>
            <div className="col">
              <h1>Las mejores comidas</h1>
              <p className="fs-6 helvetica">
                Sumérgete en un festín de sabores con nuestra selección
                incomparable de comidas. Desde delicias locales hasta platos
                internacionales, nuestra plataforma te lleva en un viaje
                culinario que despierta tus sentidos. Descubre restaurantes que
                ofrecen una amplia variedad de opciones, desde platos
                tradicionales hasta creaciones innovadoras. Ya sea que busques
                comfort food o experiencias gastronómicas únicas, estamos aquí
                para satisfacer todos tus antojos. Explora nuestro catálogo
                diverso y encuentra el placer en cada bocado. ¡Deleita tu
                paladar y descubre nuevas joyas culinarias con nosotros!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default App;
