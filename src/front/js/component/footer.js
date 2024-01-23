import React, { Component } from "react";
import "../../styles/background.css";
import rigoImageUrl from "../../img/logo1.jpeg";
import { Link } from 'react-router-dom';

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center color-back2 text-white text">
		<div className="container text-center">
			<div className="row p-4">
				<div className="col-4 text-start">
					<h4>
						<img
							src={rigoImageUrl}
							alt="logo"
							style={{ width: '40px', borderRadius: '100%', marginRight: '10px' }}
						/>
						SNAPIFY
					</h4>

					<p> Únete a nuestra comunidad </p>
					<h4>
						<i className="color-icon pe-2 fa-brands fa-discord"></i>
						<i className="color-icon pe-2 fa-brands fa-youtube"></i>
						<i className="color-icon pe-2 fa-brands fa-twitter"></i>
						<i className="color-icon pe-2 fa-brands fa-instagram"></i>
					</h4>
				</div>
				<div className="text-start col-3">
					<h4>Explorar</h4>
					<nav className="nav flex-column">
						<a className="p-0 fs-5 text-white nav-link" href="#">Galería</a>
						<a className="p-0 fs-5 text-white nav-link" href="#">Rankings</a>
						<a className="p-0 fs-5 text-white nav-link" href="#">Registrarse</a>
					</nav>
				</div>
				<div className="text-start col-5">
					<h4>Únete A Nuestro Boletín Semanal</h4>
					<p> Obtenga promociones y actualizaciones exclusivas directamente en su bandeja de entrada. </p>
					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Enter your email here" aria-label="Enter your email here">
						</input>
						<button type="button" className=" px-5 btn rounded color-call color-text"><i className="pe-2 fa-regular fa-envelope"></i>Suscribe</button>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
