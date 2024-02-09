import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';
import { NavbarLoginAdmin } from "./navbarLoginAdmin";
import { NavbarLogin } from "./navbarLogin";
import { Navbar } from "./navbar";

const NavbarManager = () => {
    const [userRole, setUserRole] = useState("default");
    const { store } = useContext(Context);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            const token = sessionStorage.getItem('token');

            if (token) {
                try {
                    const decodedToken = await jwtDecode(token);
                    const currentTime = Date.now() / 1000;
                    const role = decodedToken?.role || 'default';

                    console.log('Decoded Role:', role); // Log the decoded role

                    setUserRole(role);

                    if (decodedToken.exp < currentTime) {
                        console.error('Token expired');
                        console.error('Removing token from sessionStorage');
                        sessionStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setUserRole('default'); // Set the role to default if there's an error in decoding
                }
            } else {
                setUserRole('default'); // Set the role to default if there's no token
            }
        };

        // Run the initial decoding
        checkTokenExpiration();

        // Check token expiration periodically (every 5 minutes)
        const intervalId = setInterval(checkTokenExpiration, 60000); // 300000 milliseconds = 5 minutes

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [store.isUserLoggedIn, store.isAdminLoggedIn]); // Only runs on mount and when user or admin login status changes

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
