import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { VistaProfile } from "./pages/vistaProfile";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Landing } from "./pages/landing";

import { Footer } from "./component/footer";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword"
import SignUpForm from "./component/SignUpForm";
import ContactForm from "./component/ContactForm";
import RankingUser from "./component/RankingUser";
import TermsAndConditions from "./component/TermsAndConditions";
import TipsPage from "./component/TipsPage"

import "../styles/home.css";
import Ranking from "./component/Ranking";

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
                        <Route element={<Home />} path="/home" />
                        <Route element={<Landing />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<SignUpForm />} path="/signUp" />
                        <Route element={<ContactForm />} path="/contact" />
                        <Route element={<VistaProfile />} path="/vistaProfile" />
                        <Route element={<Ranking title="Top fotografias" description="Explore las fotografías de la comunidad mejor clasificados en la galería" />}path="/ranking-photo" />
                        <Route element={<Ranking title="Top creadores" description="Explore a los artistas de la comunidad mejor clasificados en la galería" />}path="/ranking-user" />
                        <Route element={<TermsAndConditions />} path="/terms" />
                        <Route element={<Ranking/>} path="/ranking-user" />
                        <Route element={<TipsPage />} path="/tips" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                    <ToastContainer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

