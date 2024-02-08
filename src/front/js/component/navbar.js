import React, { useState, useContext } from "react";
import rigoImageUrl from "../../img/logo1.jpeg";
import { NavbarLogin } from "./navbarLogin";
import { NavbarLoginAdmin } from "./navbarLoginAdmin";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();


    const handleLoginUser = () => {
        actions.loginUser();
        setShowLoginModal(false);
    };

    const handleLoginAdmin = () => {
        actions.loginAdmin();
        setShowLoginModal(false);
    };

    // const handleOpenModal = () => {
    //     // Abre el modal y resetea el estado de login
    //     setShowLoginModal(true);
    // };

    const navigateToLogin = () => {
        navigate("/login")
    }

    const handleToggleStyle = () => {
        actions.toggleGlobalStyle('claro', '.e-claro');
    };
    const handleToggleStyle1 = () => {
        actions.toggleGlobalStyle('claro1', '.e-claro');
    };
    const handleToggleStyle2 = () => {
        actions.toggleGlobalStyle('claro2', '.e-claro');
    };

    return (
        <nav className="navbar color-back color-text px-5">
            <div className="container-fluid">
                <div className="d-flex pt-2">
                    <h4>
                        <img
                            src={rigoImageUrl}
                            alt="logo"
                            style={{ width: '40px', borderRadius: '100%', marginRight: '10px' }}
                        />
                        <Link to="/" className="color-text-nav text-decoration-none ">SNAPIFY</Link>
                    </h4>
                </div>
                {/* Resto del contenido del Layout */}
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-dark" onClick={handleToggleStyle}>Claro</button>
                    <button type="button" class="btn btn-outline-dark" onClick={handleToggleStyle1}>Daltónico</button>
                    <button type="button" class="btn btn-outline-dark" onClick={handleToggleStyle2}>Flash</button>
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
                        <button
                            type="button"
                            className=" px-5 btn brd color-call color-text"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={navigateToLogin}
                        >
                            <i className=" pe-2 fa-regular fa-user"></i>Iniciar sesión
                        </button>
                    </li>
                </ul>
            </div>

            {/* Renderiza el componente del usuario o el administrador según el estado */}
            {store.isUserLoggedIn && <NavbarLogin onNavbarChange={() => actions.isUserLoggedIn(false)} />}
            {store.isAdminLoggedIn && <NavbarLoginAdmin onNavbarChange={() => actions.isAdminLoggedIn(false)} />}


        </nav >
    );
};
