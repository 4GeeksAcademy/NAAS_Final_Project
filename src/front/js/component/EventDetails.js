import React, { useContext, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "../../styles/events.css"
import { Timer } from "./Timer";
import { Context } from "../store/appContext";



export const EventsDetails = () => {
    const { store, actions } = useContext(Context);
    const { event_id } = useParams();

    useEffect(() => {
        actions.getEvent(event_id)
    }, [event_id])

    const currentEvent = store.currentEvent || {};

    return (
        <div className="main-container color-back3">
            <div id="eventContainer">
                <div className="description">
                    <h2 style={{ fontSize: "40px", color: "#FE5201" }}>{currentEvent.name}</h2>
                    <div className="info">
                        <div className="mini-container">
                            <p className="mt-2">{currentEvent.photo_category}</p>
                        </div>
                        <div className="mini-container">
                            <p className="mt-2">Fecha</p>
                        </div>
                    </div>

                </div>
                <div className="d-flex flex-column" style={{ marginTop: "30px" }}>
                    <Timer />
                    <button className="btn color-call button-event">
                        <i className="fa-solid fa-plus me-2" style={{ color: "#ffffff" }} />Unirme
                    </button>
                    <Link to="/terms">
                        <button className="btn button-event" style={{ background: "#FE5201" }}>Bases y condiciones</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}