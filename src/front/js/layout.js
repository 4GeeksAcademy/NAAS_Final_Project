import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import getNavbarComponent from "./component/navbarManager"; // Importa la función

import { Footer } from "./component/footer";
import ForgotPassword from "./component/ForgotPassword"
import SignUpForm from "./component/SignUpForm";
import ContactForm from "./component/ContactForm";
import Tips from "./component/Tips";

import "../styles/home.css";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [navbarMode, setNavbarMode] = useState("default");

    // Función para cambiar el estado del Navbar
    const handleNavbarChange = (mode) => {
        setNavbarMode(mode);
    };

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {getNavbarComponent(navbarMode, handleNavbarChange)} {/* Añade handleNavbarChange aquí */}
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<SignUpForm />} path="/signUp" />
                        <Route element={<ContactForm/>} path="/contact"/>
                        <Route element={<Tips/>} path="/tips"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

