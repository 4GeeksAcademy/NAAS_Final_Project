import React, { useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Timer } from "../component/Timer";

const EventsDetails = () => {
    const { store, actions } = useContext(Context);
    const { event_id } = useParams();
    const currentEvent = store.currentEvent || {};

    const handleJoinEvent = async () => {
        const token = sessionStorage.getItem('token');
    console.log('Token:', token);
        // Evitar intentos adicionales si ya estamos procesando la solicitud
        if (store.joiningEvent) {
            return;
        }

        actions.joinEvent(event_id);
    };

    return (
        <div className="main-container color-back3" style={{marginTop: "80px"}}>
            <div id="eventContainer">
                <div className="description">
                    <h2 style={{ fontSize: "40px", color: "#FE5201" }}>{currentEvent.name}</h2>
                    <div className="info">
                        <div className="mini-container">
                            <p className="mt-2">{currentEvent.photo_category}</p>
                        </div>
                        <div className="mini-container">
                            <p className="mt-2">Fecha: {currentEvent.date}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ marginTop: "30px" }}>
                    <Timer />
                    <button
                        className="btn color-call button-event"
                        onClick={handleJoinEvent}
                        disabled={store.joiningEvent}
                    >
                        {store.joiningEvent ? (
                            <span>Uniéndome...</span>
                        ) : (
                            <>
                                <i className="fa-solid fa-plus me-2" style={{ color: "#ffffff" }} />Unirme
                            </>
                        )}
                    </button>
                    <Link to="/terms">
                        <button className="btn button-event" style={{ background: "#FE5201" }}>Bases y condiciones</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventsDetails;