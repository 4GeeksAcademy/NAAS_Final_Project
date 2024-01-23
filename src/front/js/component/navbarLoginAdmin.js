import React, { Component } from "react";
import "../../styles/background.css";
import rigoImageUrl from "../../img/logo1.jpeg";
import { Link } from 'react-router-dom';

export const NavbarLoginAdmin = () => {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top px-5">
            <div className="container-fluid px-5">

                <div className="d-flex pt-2 color-text">
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
                        <button className="btn btn-outline-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                            <span className=""><i className="avatar-login fa-solid fa-user-tie"></i></span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="offcanvas offcanvas-end text-bg-dark color-back" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <a href="#" className="offcanvas-title color-text-nav" id="offcanvasDarkNavbarLabel">
                        <h5>
                            <i className="pe-2 avatar-login fa-solid fa-lock-open"></i>ADMIN
                        </h5>
                    </a>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mx-5">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#"><i className="pe-2 fa-solid fa-user-clock color-text"></i>Set Status</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 fa-solid fa-user-pen color-text"></i>Mis Datos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-solid fa-photo-film"></i>Mis Colecciones</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-solid fa-calendar-days"></i>Mis Eventos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-solid fa-medal"></i>Mis Logros</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-regular fa-star"></i>Mis Favoritos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-solid fa-heart-circle-plus"></i>Mis Seguidores</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="pe-2 color-text fa-solid fa-user-plus"></i>A Quién Sigo</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="pe-2 color-text fa-solid fa-envelopes-bulk"></i>
                                Buzón
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-solid fa-inbox"></i>Recibidos</a></li>
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-solid fa-envelope-circle-check"></i>Sin leer</a></li>
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-regular fa-paper-plane"></i>Enviar Mensaje</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown mt-5">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="pe-2 color-text fa-solid fa-ban"></i>
                                Bannear
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-solid fa-delete-left"></i>Bannear Fotos</a></li>
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-solid fa-user-xmark"></i>Bannear Users</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="pe-2 color-text fa-solid fa-circle-plus"></i>
                                Eventos
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-regular fa-calendar-plus"></i>Crear Eventos</a></li>
                                <li><a className="dropdown-item" href="#"><i className="pe-2 color-text fa-solid fa-pen-to-square"></i>Modificar Eventos</a></li>
                            </ul>
                        </li>
                    </ul>
                    <p></p>
                    <div className="drop-nav">
                        <form className="mt-2 d-flex color-text drop-nav" role="search">
                            <h6>Soporte</h6>
                            <button className="btn btn-outline-success" type="submit"><i className="avatar-login fa-solid fa-headset"></i></button>
                        </form>
                        <form className="mt-2 d-flex color-text drop-nav" role="search">
                            <h6>Dar de baja mi cuenta</h6>
                            <button className="btn btn-outline-danger" type="submit"><i className="avatar-login fa-solid fa-user-large-slash"></i></button>
                        </form>
                        <form className="mt-2 d-flex color-text drop-nav" role="search">
                            <h5>Cerrar Sesión</h5>
                            <button className="btn btn-outline-warning" type="submit"><i className="avatar-login fa-solid fa-person-walking-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>

        </nav>
    );
};
