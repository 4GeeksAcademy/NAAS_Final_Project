import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Timer } from "../component/Timer";

export const ActiveEvents = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        // Llamar a la acción para obtener todos los eventos al montar el componente
        actions.getAllEvents();
    }, [store.events]);

    const handleJoinOrLeaveEvent = async (event_id) => {
        const token = sessionStorage.getItem('token');

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
        <div className="container">
            <div className="main-container" style={{ marginTop: "80px" }}>
                {store.events.map(event => (
                    <div key={event.id} className="event-container" style={{ background: "#2B2B2B", marginTop: "80px" }}>
                        <div className="description">
                            <h2 style={{ fontSize: "40px", color: "#FE5201" }}>{event.name}</h2>
                            <div className="info">
                                <div className="mini-container">
                                    <p className="mt-2">{event.photo_category}</p>
                                </div>
                                <div className="mini-container">
                                    <p className="mt-2">Fecha: {event.start_date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column" style={{ marginTop: "30px" }}>
                            <Timer event_id={event.id} />
                            <button
                                className="btn color-call button-event"
                                onClick={() => handleJoinOrLeaveEvent(event.id)}
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
                ))}
            </div>
        </div>
    );
};
