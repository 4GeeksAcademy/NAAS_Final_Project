import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { VistaProfile } from "./pages/vistaProfile";
import { MyProfile } from "./pages/myProfile";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";

import { Footer } from "./component/footer";
import ForgotPassword from "./component/ForgotPassword"
import SignUpForm from "./component/SignUpForm";
import ContactForm from "./component/ContactForm";
import Tips from "./component/Tips";

import "../styles/home.css";

const Layout = () => {
    const { store, actions } = useContext(Context);

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<SignUpForm />} path="/signUp" />
                        <Route element={<ContactForm/>} path="/contact"/>
                        <Route element={<VistaProfile />} path="/vistaProfile" />
                        <Route element={<MyProfile />} path="/myProfile/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

