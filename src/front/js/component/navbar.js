import React, { useState } from "react";
import rigoImageUrl from "../../img/logo1.jpeg";
import { NavbarLogin } from "./navbarLogin";
import { NavbarLoginAdmin } from "./navbarLoginAdmin";

export const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

	const handleNavbarChange = (mode) => {
        console.log("Changing navbar mode to:", mode);
        setNavbarMode(mode);
    };

    const handleLoginUser = () => {
        setIsUserLoggedIn(true);
        setIsAdminLoggedIn(false);
        setShowLoginModal(false);
    };

    const handleLoginAdmin = () => {
        setIsUserLoggedIn(false);
        setIsAdminLoggedIn(true);
        setShowLoginModal(false);
    };

    const handleOpenModal = () => {
        // Abre el modal y resetea el estado de login
        setIsUserLoggedIn(false);
        setIsAdminLoggedIn(false);
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
                        <a className="nav-link active color-text" aria-current="page" href="#"><i className="pe-2 fa-solid fa-store"></i>Galería</a>
                    </li>
                    <li className="nav-item">
                        <a className="color-text nav-link" href="#"><i className="pe-2 fa-solid fa-arrow-trend-up"></i>Rankings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link color-text" href="#"><i className="pe-2 fa-brands fa-space-awesome"></i>Eventos</a>
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
            {isUserLoggedIn && <NavbarLogin onNavbarChange={() => setIsUserLoggedIn(false)} />}
            {isAdminLoggedIn && <NavbarLoginAdmin onNavbarChange={() => setIsAdminLoggedIn(false)} />}
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

