import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { NavbarLogin } from "./component/navbarLogin";
import { NavbarLoginAdmin } from "./component/navbarLoginAdmin";

import "../styles/home.css";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const basename = process.env.BASENAME || "";

    useEffect(() => {
        // Realiza la lógica de autenticación aquí y actualiza isLoggedIn e isAdmin según sea necesario.
        // Puedes obtener esta información de tu estado global, contexto, etc.
        // Este es solo un ejemplo, debes adaptarlo a tu lógica de autenticación real.

        // Simulación de una autenticación exitosa para demostración
        //setIsLoggedIn(true);
        //setIsAdmin(true);
    }, []); // El segundo argumento de useEffect vacío indica que se ejecutará solo una vez al montar el componente.

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    let navbarComponent;

    if (isAdmin) {
        navbarComponent = <NavbarLoginAdmin />;
    } else if (isLoggedIn) {
        navbarComponent = <NavbarLogin />;
    } else {
        navbarComponent = <Navbar />;
    }

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {navbarComponent}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

