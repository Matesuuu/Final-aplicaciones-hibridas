import "../App.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-section mt-5">
      <div className="container">
        <div className="footer-cta pt-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-3">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>¿De donde somos?</h4>
                  <span>Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-3">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Escribinos</h4>
                  <span>2323522637</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-3">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Envianos un correo</h4>
                  <span>mirestaurante@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-5">
              <div className="footer-widget">
                <div className="footer-logo"></div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Link utiles</h3>
                </div>
                <ul>
                  <li>
                    <Link to="/login">Iniciar sesión</Link>
                  </li>

                  <li>
                    <Link to="/registerRestaurant">Registrar restaurante</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
              <div className="footer-widget">
                <div className="footer-social-icon">
                  <span>Seguinos</span>
                  <i className="fa-brands fa-linkedin-in"></i>
                  <i className="fab fa-twitter twitter-bg"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>© 2023 Derechos reservados Mi Restaurante</p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
