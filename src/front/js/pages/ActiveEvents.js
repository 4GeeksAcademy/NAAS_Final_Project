import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Timer } from "../component/Timer";
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ActiveEvents = () => {
    const { store, actions } = useContext(Context);
    const [isUserJoined, setIsUserJoined] = useState(false);

    useEffect(() => {
        actions.getAllEvents();
        actions.getUserJoinedEvent();
    }, [isUserJoined]);

    const handleJoinOrLeaveEvent = async (event_id) => {


        const existingEvent = store.userEvents?.find(userEvent => userEvent.id === event_id);

        console.log(existingEvent);

        if (existingEvent) {
            await actions.leaveEvent(event_id);
            setIsUserJoined(!isUserJoined);
        } else {
            actions.joinEvent(event_id)
                .then(() => {
                    toast.success('¡Te has unido al evento con éxito!');
                    setIsUserJoined(!isUserJoined);
                })
                .catch(error => {
                    if (error.response && error.response.status === 400) {
                        toast.error('¡Ya estás unido a este evento!');
                    } else {
                        console.error('Error al unirse al evento:', error);
                    }
                });
        }
    };

    const isUserJoinedEvent = (event_id) => {
        return store.userEvents.some(userEvent => userEvent.id === event_id);
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
                                    <p className="mt-2">Categoria: {event.photo_category}</p>
                                </div>
                                <div className="mini-container">
                                    <p className="mt-2">Fecha Inicio: {moment(event.start_date).format("dddd, MMMM Do YYYY")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column" style={{ marginTop: "30px" }}>
                            {event.end_date && <Timer endDate={event.end_date} />}
                            {isUserJoinedEvent(event.id, store.userEvents) ? (
                                <button
                                    className="btn color-call button-event"
                                    onClick={() => handleJoinOrLeaveEvent(event.id)}
                                    disabled={store.leavingEvent}>
                                    {store.leavingEvent ? "Dándome de baja..." : "Dar de baja"}
                                </button>
                            ) : (
                                <button
                                    className="btn color-call button-event"
                                    onClick={() => handleJoinOrLeaveEvent(event.id)}
                                    disabled={store.joiningEvent}>
                                    {store.joiningEvent ? "Uniéndome..." : "Unirme"}
                                </button>
                            )}
                            <Link to={`/events/${event.id}`}>
                                <button className="btn button-event" style={{ background: "#FE5201" }}>Ver evento</button>
                            </Link>
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

export default ActiveEvents;