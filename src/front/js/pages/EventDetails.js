import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Timer } from "../component/Timer";
import { toast } from 'react-toastify';

const EventsDetails = () => {
    const { store, actions } = useContext(Context);
    const { event_id } = useParams();
    const [isUserJoined, setIsUserJoined] = useState(false);

    useEffect(() => {
        actions.getEvent(event_id);
        actions.getUserJoinedEvent().then(() => {
            setIsUserJoined(store.userEvents.some(userEvent => userEvent.id === event_id));
        });
    }, [event_id]);

    const currentEvent = store.currentEvent || {};

    const handleJoinOrLeaveEvent = async () => {
        const existingEvent = store.userEvents?.find(userEvent => userEvent.id === event_id);

        if (existingEvent) {
            await actions.leaveEvent(event_id);
            setIsUserJoined(false);
        } else {
            actions.joinEvent(event_id)
                .then(() => {
                    toast.success('¡Te has unido al evento con éxito!');
                    setIsUserJoined(true);
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

    if (!currentEvent.name) {
        return (
            <div className="main-container" style={{ marginTop: "80px" }}>
                <div id="eventContainer" style={{ background: "#2B2B2B", marginTop: "80px" }}>
                    <h2 style={{ fontSize: "24px", color: "#FE5201" }}>El evento no existe</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container" style={{ marginTop: "80px" }}>
            <div id="eventContainer" style={{ background: "#2B2B2B", marginTop: "80px" }}>
                <div className="description">
                    <h2 style={{ fontSize: "40px", color: "#FE5201" }}>{currentEvent.name}</h2>
                    <div className="info">
                        <div className="mini-container">
                            <p className="mt-2">{currentEvent.photo_category}</p>
                        </div>
                        <div className="mini-container">
                            <p className="mt-2">{currentEvent.description}</p>
                        </div>
                        <div className="mini-container">
                            <p className="mt-2"> {currentEvent.end_date}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ marginTop: "30px" }}>
                    <Timer endDate={currentEvent.end_date} />
                    {isUserJoined ? (
                        <button
                            className="btn color-call button-event"
                            onClick={handleJoinOrLeaveEvent}
                            disabled={store.leavingEvent}>

                            {store.leavingEvent ? "Dándome de baja..." : "Dar de baja"}
                        </button>
                    ) : (
                        <button
                            className="btn color-call button-event"
                            onClick={handleJoinOrLeaveEvent}
                            disabled={store.joiningEvent}>

                            {store.joiningEvent ? "Uniéndome..." : "Unirme"}
                        </button>
                    )}
                    <Link to="/terms">
                        <button className="btn button-event" style={{ background: "#FE5201" }}>Bases y condiciones</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventsDetails;
