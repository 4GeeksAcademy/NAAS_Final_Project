import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-dark text-white">
		<div class="container text-center">
			<div class="row p-4">
				<div class="col-4 text-start">
					<h4><i class="pe-2 fa-solid fa-house"></i>SNAPIFY</h4>
					<p> Únete a nuestra comunidad </p>
					<h4>
						<i class="pe-2 fa-brands fa-discord"></i>
						<i class="pe-2 fa-brands fa-youtube"></i>
						<i class="pe-2 fa-brands fa-twitter"></i>
						<i class="pe-2 fa-brands fa-instagram"></i>
					</h4>
				</div>
				<div class="text-start col-3">
					<h4>Explorar</h4>
					<nav class="nav flex-column">
						<a class="p-0 fs-5 text-white nav-link" href="#">Galería</a>
						<a class="p-0 fs-5 text-white nav-link" href="#">Rankings</a>
						<a class="p-0 fs-5 text-white nav-link" href="#">Registrarse</a>
					</nav>
				</div>
				<div class="text-start col-5">
					<h4>Únete A Nuestro Boletín Semanal</h4>
					<p> Obtenga promociones y actualizaciones exclusivas directamente en su bandeja de entrada. </p>
					<div class="input-group mb-3">
						<input type="text" class="form-control" placeholder="Enter your email here" aria-label="Enter your email here">
						</input>
						<button type="button" class=" px-5 btn btn-success"><i class="pe-2 fa-regular fa-envelope"></i>Suscribe</button>
					</div>
				</div>
			</div>
		</div>	
	</footer>
);
