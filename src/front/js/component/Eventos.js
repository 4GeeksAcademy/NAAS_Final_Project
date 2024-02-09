import React, { useContext, useState, useEffect } from "react"
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import checkTokenAndRedirect from "../utils/checkToken"
import "../../styles/events.css"

export const Eventos = () => {
    const { store, actions } = useContext(Context);
    const [userJoinedEvents, setUserJoinedEvents] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = sessionStorage.getItem('token'); // Obtener el token aquí
            const isValidToken = checkTokenAndRedirect(token);
            if (!isValidToken) {
                toast.error('¡Debe volver a iniciar sesión!');
                navigate('/login');
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await actions.getUserJoinedEvent();
                setUserJoinedEvents(events);
            } catch (error) {
                console.error('Error fetching user events:', error);
                if (error.response && error.response.status === 404) {
                    console.log('No se encontraron eventos para el usuario.');
                    // Puedes mostrar un mensaje al usuario o realizar otra acción según sea necesario
                } else {
                    // Manejar otros errores de manera adecuada
                    // Por ejemplo, mostrar una notificación de error al usuario
                    toast.error('Ocurrió un error al cargar los eventos del usuario. Por favor, inténtalo de nuevo más tarde.');
                }
            }
        };

        fetchData();
    }, [actions.getUserJoinedEvent]);

    const handleLeaveEvent = async (event_id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, darme de baja'
        });

        if (result.isConfirmed) {
            await actions.leaveEvent(event_id);
            // Actualizar la lista de eventos después de darse de baja
            const updatedEvents = await actions.getUserJoinedEvent();
            setUserJoinedEvents(updatedEvents);
            Swal.fire(
                '¡Evento eliminado!',
                'Haz sido dado de baja exitosamente',
                'success'
            );
        }
    };

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
                                <button className="btn color-call" style={{ width: "100%" }} onClick={() => handleLeaveEvent(event.id)}>
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
                    <Link to={"/events"} style={{ margin: "0 auto" }}>
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
