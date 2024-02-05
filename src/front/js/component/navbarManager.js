import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "./navbar";
import { Context } from "../store/appContext";
import { NavbarLoginAdmin } from "./navbarLoginAdmin";
import { jwtDecode } from 'jwt-decode';
import { NavbarLogin } from "./navbarLogin";

const NavbarManager = () => {
    const [userRole, setUserRole] = useState("default");
    const {store, actions} = useContext(Context)

    useEffect(() => {
        const decodeToken = async () => {
            const token = sessionStorage.getItem('token');

            if (token) {
                try {
                    const decodedToken = await jwtDecode(token);
                    const role = decodedToken?.role || 'default';

                    console.log('Decoded Role:', role); // Log the decoded role

                    setUserRole(role);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setUserRole('default'); // Set the role to default if there's an error in decoding
                }
            } else {
                setUserRole('default'); // Set the role to default if there's no token
            }
        };


        // Run the initial decoding
        decodeToken();

        // Listen for changes in the token (e.g., after login)
        window.addEventListener('storage', decodeToken);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('storage', decodeToken);
        };
    }, [store.isUserLoggedIn, store.isAdminLoggedIn]); // Only runs on mount

    // console.log("UserRole:", userRole);

    return (
        <div>
            {userRole === "admin" && <NavbarLoginAdmin />}
            {userRole === "user" && <NavbarLogin />}
            {userRole === "default" && <Navbar />}
        </div>
    );

};

export default NavbarManager;
