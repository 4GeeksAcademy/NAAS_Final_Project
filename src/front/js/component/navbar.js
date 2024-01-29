import React, { useState, useContext } from "react";
import rigoImageUrl from "../../img/logo1.jpeg";
import { NavbarLogin } from "./navbarLogin";
import { NavbarLoginAdmin } from "./navbarLoginAdmin";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [showLoginModal, setShowLoginModal] = useState(false);
    

    const handleLoginUser = () => {
        actions.loginUser();
        setShowLoginModal(false);
    };
    
    const handleLoginAdmin = () => {
        actions.loginAdmin();
        setShowLoginModal(false);
    };

    const handleOpenModal = () => {
        // Abre el modal y resetea el estado de login
        setShowLoginModal(true);
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
                        SNAPIFY
                    </h4>
                </div>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active color-text-nav" aria-current="page" href="#"><i className="pe-2 fa-solid fa-store"></i>Galería</a>
                    </li>
                    <li className="nav-item">
                        <a className="color-text-nav nav-link" href="#"><i className="pe-2 fa-solid fa-arrow-trend-up"></i>Rankings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link color-text-nav" href="#"><i className="pe-2 fa-brands fa-space-awesome"></i>Eventos</a>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className=" px-5 btn brd color-call color-text"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={handleOpenModal}
                        >
                            <i className=" pe-2 fa-regular fa-user"></i>Login
                        </button>
                    </li>
                </ul>
            </div>

            {/* Renderiza el componente del usuario o el administrador según el estado */}
            {store.isUserLoggedIn && <NavbarLogin onNavbarChange={() => actions.isUserLoggedIn(false)} />}
            {store.isAdminLoggedIn && <NavbarLoginAdmin onNavbarChange={() => actions.isAdminLoggedIn(false)} />}
			<div className={`modal fade ${showLoginModal ? 'show' : ''}`} id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={!showLoginModal}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">Modo Desarrollador</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowLoginModal(false)}></button>
						</div>
						<div className="modal-body text-dark">
							Prueba alguno de los otros Navbar
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleLoginUser}>Login User</button>
							<button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={handleLoginAdmin}>Login Admin</button>
						</div>
					</div>
				</div>
			</div>
			
		</nav>
	);
};
