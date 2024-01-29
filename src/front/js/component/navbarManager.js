// NavbarManager.js
import React from "react";
import { Navbar } from "./navbar";
import { NavbarLogin } from "./navbarLogin";
import { NavbarLoginAdmin } from "./navbarLoginAdmin";

const getNavbarComponent = (mode, onNavbarChange) => {
    switch (mode) {
        case "user":
            return <Navbar />;
        case "admin":
            return <NavbarLoginAdmin />;
        case "login":
            return <NavbarLogin onNavbarChange={onNavbarChange} />;
        default:
            return <Navbar />;
    }
};

export default getNavbarComponent;

