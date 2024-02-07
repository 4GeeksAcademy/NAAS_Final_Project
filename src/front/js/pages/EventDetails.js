import React, { useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Timer } from "../component/Timer";


const EventsDetails = () => {
    const { store, actions } = useContext(Context);
    const { event_id } = useParams();
    const currentEvent = store.currentEvent || {};

    const handleJoinOrLeaveEvent = async () => {
        const token = sessionStorage.getItem('token');
        console.log('Token:', token);
        // Evitar intentos adicionales si ya estamos procesando la solicitud
        if (store.joiningEvent || store.leavingEvent) {
            return;
        }

        if (store.userJoinedEvent) {
            actions.leaveEvent(event_id);
        } else {
            actions.joinEvent(event_id);
        }
    };

    return (
        <div className="e-claro main-container" style={{ marginTop: "80px" }}>
            <div className="e-claro" id="eventContainer">
                <div className="description">
                    <h2 style={{ fontSize: "40px", color: "#FE5201" }}>{currentEvent.name}</h2>
                    <div className="e-claro info">
                        <div className="e-claro mini-container">
                            <p className="mt-2">{currentEvent.photo_category}</p>
                        </div>
                        <div className="e-claro mini-container">
                            <p className="mt-2"> {currentEvent.end_date}</p>
                        </div>
                    </div>
                </div>
                <div className="e-claro d-flex flex-column" style={{ marginTop: "30px" }}>
                    <Timer />
                    <button
                        className="btn color-call button-event"
                        onClick={handleJoinOrLeaveEvent}
                        disabled={store.joiningEvent || store.leavingEvent}>

                        {store.joiningEvent || store.leavingEvent ? (
                            <span>{store.joiningEvent ? "Uniéndome..." : "Dándome de baja..."}</span>
                        ) : (
                            <>
                                <i className="fa-solid fa-plus me-2" style={{ color: "#ffffff" }} />
                                {store.userJoinedEvent ? "Dar de baja" : "Unirme"}
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
