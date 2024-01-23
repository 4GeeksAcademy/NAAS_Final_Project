import React, { Component } from "react";
import "../../styles/background.css";
import rigoImageUrl from "../../img/logo1.jpeg";
import { Link } from 'react-router-dom';

export const Navbar = () => {
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
					<button type="button" className=" px-5 btn brd color-call color-text"><i className=" pe-2 fa-regular fa-user"></i>Login</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};
