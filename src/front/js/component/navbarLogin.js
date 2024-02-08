import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"
import "../../styles/background.css";
import rigoImageUrl from "../../img/logo1.jpeg";
import { Context } from "../store/appContext";


export const NavbarLogin = () => {
  const { store, actions } = useContext(Context);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const Swal = require('sweetalert2')
  const handleLogout = () => {
    actions.logout();
    // Redirige al usuario al home después de cerrar sesión
    // Puedes ajustar la ruta según tus necesidades
    window.location.href = "/";
  };

  function handleClick(event) {
    // Prevenir la navegación predeterminada
    event.preventDefault();

    // Mostrar la alerta de SweetAlert
    Swal.fire({
      title: '¡Próximamente disponible!',
      icon: 'info',
      confirmButtonText: 'Entendido'
    });
  }

  const handleDeactivateAccount = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  }

  const confirmDeactivateAccount = () => {
    fetch('https://musical-giggle-6qrggjvx7742xr44-3001.app.github.dev/api/deactivate_account', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (response.ok) {
          actions.logout();

          window.location.href = "/login";
        } else {
          console.error('Error deactivating account. Please, contact our support');
        }
      })
      .catch(error => console.error("Error deactivating account:", error));
    setShowConfirmation(false);
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-5">
      <div className="container-fluid px-5">
        <div className="d-flex pt-2 color-text">
          <h4>
            <img
              src={rigoImageUrl}
              alt="logo"
              style={{ width: '40px', borderRadius: '100%', marginRight: '10px' }}
            />
            <Link to="/" className="color-text-nav text-decoration-none ">SNAPIFY</Link>
          </h4>
        </div>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/galeria" className="nav-link active color-text-nav">
              <i className="pe-2 fa-solid fa-store"></i>Galería
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ranking-photo" className="nav-link active color-text-nav">
              <i className="pe-2 fa-solid fa-store"></i>Ranking
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link color-text-nav">
              <i className="pe-2 fa-brands fa-space-awesome"></i>Eventos
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
              <span className=""><i className="avatar-login fa-regular fa-circle-user"></i></span>
            </button>
          </li>
        </ul>
      </div>
      <div className="offcanvas offcanvas-end text-bg-dark color-back" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div className="offcanvas-header">
          <Link to="/vistaProfile">
            <button className="offcanvas-title color-text-nav color-back" id="offcanvasDarkNavbarLabel">
              <h5><i className="pe-2 avatar-login fa-solid fa-user-gear"></i>Mi perfil</h5>
            </button>
          </Link>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mx-5">
            <li className="nav-item">
              <button onClick={() => actions.toggleStatus()} className={`nav-link ${store.statusActive ? 'text-danger' : 'text-success'}`} aria-current="page">
                <i className={`pe-2 fa-solid fa-user-clock ${store.statusActive ? 'text-danger' : 'text-success'}`}></i>Cambiar Estado
              </button>
            </li>
            <li className="nav-item ">
              <Link to="/vistaProfile" onClick={() => actions.setVistaElement("PersonalDataForm")} className="nav-link color-text-nav">
                <i className="pe-2 fa-solid fa-user-pen color-text"></i>Mis Datos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vistaProfile" onClick={() => actions.setVistaElement("Photos")} className="nav-link color-text-nav">
                <i className="pe-2 color-text fa-solid fa-photo-film"></i>Mis Colecciones
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vistaProfile" onClick={() => actions.setVistaElement("Eventos")} className="nav-link color-text-nav">
                <i className="pe-2 fa-brands fa-space-awesome"></i>Mis Eventos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vistaProfile" onClick={() => actions.setVistaElement("Logros")} className="nav-link color-text-nav">
                <i className="pe-2 color-text fa-solid fa-medal"></i>Mis Logros
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vistaProfile" onClick={() => actions.setVistaElement("Favoritos")} className="nav-link color-text-nav">
                <i className="pe-2 color-text fa-regular fa-star"></i>Mis Favoritos
              </Link>
            </li>
            <li className="nav-item">
              {/* Utiliza una función para manejar el evento onClick */}
              <Link to="/vistaProfile" onClick={handleClick} className="nav-link color-text-nav">
                <i className="pe-2 color-text fa-solid fa-heart-circle-plus"></i>Mis Seguidores
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vistaProfile" onClick={handleClick} className="nav-link color-text-nav">
                <i className="pe-2 color-text fa-solid fa-user-plus"></i>A Quién Sigo
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="pe-2 color-text fa-solid fa-envelopes-bulk"></i>Buzón<span className="p-2 badge bg-secondary">4</span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><Link to="#" className="dropdown-item"><i className="pe-2 color-text fa-solid fa-inbox"></i>Recibidos</Link></li>
                <li><Link to="#" className="dropdown-item"><i className="pe-2 color-text fa-solid fa-envelope-circle-check"></i>Sin leer<span className="p-2 badge bg-secondary">4</span></Link></li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li><Link to="#" className="dropdown-item"><i className="pe-2 color-text fa-regular fa-paper-plane"></i>Enviar Mensaje</Link></li>
              </ul>
            </li>
          </ul>
          <p></p>
          <div className="drop-nav">
            <form className="mt-2 d-flex color-text drop-nav" role="search">
              <h6>Soporte</h6>
              <Link to="/contact">
                <button className="btn btn-outline-success" type="submit"><i className="avatar-login fa-solid fa-headset"></i></button>
              </Link>
            </form>
            <form className="mt-2 mb-5 d-flex color-text drop-nav" role="search">
              <h5>Cerrar Sesión</h5>
              <Link to="/">
                <button className="btn btn-outline-warning" type="button" onClick={handleLogout}>
                  <i className="avatar-login fa-solid fa-person-walking-arrow-right"></i>
                </button>
              </Link>
            </form>
            <form className="mt-2 d-flex color-text drop-nav" role="search">
              <h6>Dar de baja mi cuenta</h6>
              <button className="btn btn-outline-danger" type="button" onClick={(event) => handleDeactivateAccount(event)}><i className="avatar-login fa-solid fa-user-large-slash"></i></button>
            </form>
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>¿Estás seguro de que deseas desactivar tu cuenta? ¡Una vez hecho no podrás recuperarla!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={confirmDeactivateAccount}>
                  Confirmar
                </Button>
                <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </nav>
  );
};
