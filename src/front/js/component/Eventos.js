
import React, { useContext, useState, useEffect } from "react"
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import "../../styles/events.css"

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const [userJoinedEvents, setUserJoinedEvents] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const events = await actions.getUserJoinedEvent();
            setUserJoinedEvents(events);
        };
    
        fetchData();
    }, [actions.getUserJoinedEvent]);

    return (
        <div className="events mobile-column">
            {userJoinedEvents.length > 0 ? (
                userJoinedEvents.map((event) => (
                    <div key={event.id} className="event-container">
                        <div className="info-container p-2">
                            <h3>{event.name}</h3>
                            <p className="color-text2">{event.photo_category}</p>
                        </div>
                        <div className="btn-container">
                            <div className="btn-icon">
                                <Link to={`/events/${event.id}`}>
                                    <button className="btn color-call" style={{ width: "100%" }}>
                                        <i className="fa-solid fa-plus" style={{ color: "#ffffff" }} />
                                        Ver evento
                                    </button>
                                </Link>
                            </div>
                            <div className="btn-icon">
                                <button className="btn color-call" style={{ width: "100%" }}>
                                    <i className="fa-regular fa-circle-xmark" style={{ color: "#ffffff" }}></i>
                                    Dar de baja
                                </button>
                            </div>
                        </div>
                    <div>
                    </div>
                    </div>
                ))
            ) : (
                <div className="d-flex  flex-column justify-content-center mt-2 mb-2">
                    <p style={{ color: "white", margin: "0 auto" }}>No estás registrado en ningún evento.</p>
                    <Link to={"/events"} style={{margin: "0 auto"}}>
                    <button className="btn color-call" style={{ color: "white", marginTop: "10px" }}>
                        <i className="fa-solid fa-plus" style={{ color: "#ffffff" }} />
                        Ver eventos
                    </button>
                    </Link>
                </div>
            )}
        </div>
    )
};
