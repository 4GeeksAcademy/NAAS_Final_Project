import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from "./pages/home";
import { VistaProfile } from "./pages/vistaProfile";
import injectContext from "./store/appContext";
import NavbarManager from "./component/navbarManager";
import { Landing } from "./pages/landing";
import { Galeria } from "./pages/galeria";

import { Footer } from "./component/footer";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"
import SignUpForm from "./pages/SignUpForm";
import ContactForm from "./pages/ContactForm";
import TermsAndConditions from "./pages/TermsAndConditions";
import TipsPage from "./pages/TipsPage"
import EventsDetails from "./pages/EventDetails";

import "../styles/home.css";
import Ranking from "./component/Ranking";
import PasswordUpdate from "./pages/PasswordUpdate";
import PhotoUploader from "./pages/PhotoUploader";
import { ActiveEvents } from "./pages/ActiveEvents";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
import PhotoDetail from "./pages/PhotoDetail";
import { AboutUs } from "./pages/AboutUs";

const Layout = () => {
    const { store, actions } = useContext(Context);

    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;



    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <NavbarManager />
                    <Routes>
                        <Route element={<Home />} path="/home" />
                        <Route element={<Landing />} path="/" />
                        <Route element={<Galeria />} path="/galeria" />
                        <Route element={<Login onLogin={actions.loginUser} />} path="/login" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<PasswordUpdate />} path="/password-update" />
                        <Route element={<SignUpForm />} path="/signUp" />
                        <Route element={<ContactForm />} path="/contact" />
                        <Route element={<VistaProfile />} path="/vistaProfile" />
                        <Route element={<PhotoDetail />} path="/photo-detail/:photoUrl" />
                        <Route element={<Ranking title="Top fotografias" description="Explore las fotografías de la comunidad mejor clasificados en la galería" />} path="/ranking-photo" />
                        <Route element={<Ranking title="Top creadores" description="Explore a los artistas de la comunidad mejor clasificados en la galería" />} path="/ranking-user" />
                        <Route element={<TermsAndConditions />} path="/terms" />
                        <Route element={<TipsPage />} path="/tips" />
                        <Route element={<ActiveEvents />} path="/events" />
                        <Route element={<EventsDetails />} path="/events/:event_id" />
                        <Route element={<PhotoUploader />} path="/photo-uploader" />
                        <Route element={<CreateEvent />} path="/create-event" />
                        <Route element={<UpdateEvent />} path="/update-event" />
                        <Route element={<AboutUs />} path="/about-us" />
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
