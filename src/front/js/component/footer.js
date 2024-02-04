import React, { Component } from "react";
import "../../styles/background.css";
import rigoImageUrl from "../../img/logo1.jpeg";
import { Link } from 'react-router-dom';

export const Footer = () => (
	<footer className="footer mobile-column mt-auto py-3 text-center color-back2 text-white text">
		<div className="mobile-column container text-center">
			<div className="row mobile-column">
				<div className="mobile-column text-center col-3">
					<h4>
						<img
							src={rigoImageUrl}
							alt="logo"
							style={{ width: '40px', borderRadius: '100%', marginRight: '10px' }}
						/>
						<Link to="/" className="color-text-nav text-decoration-none ">SNAPIFY</Link>
					</h4>

					<p> Únete a nuestra comunidad </p>
					<h4>
						<i className="color-icon pe-2 fa-brands fa-discord"></i>
						<i className="color-icon pe-2 fa-brands fa-youtube"></i>
						<i className="color-icon pe-2 fa-brands fa-twitter"></i>
						<i className="color-icon pe-2 fa-brands fa-instagram"></i>
					</h4>
				</div>
				<div className="mobile-column text-center col-4">
					<h4>Explorar</h4>
					<nav className="nav flex-column text-center">
					<Link to="/galeria" className="p-0 fs-5 text-white nav-link">Galeria</Link>
						<Link to="/ranking-photo" className="p-0 fs-5 text-white nav-link">Ranking</Link>
						<Link to="/signUp" className="p-0 fs-5 text-white nav-link">Registrarse</Link>
					</nav>
				</div>
				<div className="mobile-column p-2 text-start col-5">
					<h4>Únete A Nuestro Boletín Semanal</h4>
					<p> Obtenga promociones y actualizaciones exclusivas directamente en su bandeja de entrada. </p>
					<div className="input-group d-flex align-items-baseline">
						<input type="text" className="form-control" placeholder="Enter your email here" aria-label="Enter your email here">
						</input>
						<button type="button" className=" btn rounded color-call color-text"><i className="pe-2 fa-regular fa-envelope"></i>Suscribe</button>
					</div>
				</div>
			</div>
		</div>
	</footer>
);