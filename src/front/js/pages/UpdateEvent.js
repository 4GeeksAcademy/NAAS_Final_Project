import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const UpdateEvent = ({ eventId }) => {

    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        start_date: '',
        end_date: ''
    });

    const [categories, setCategories] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('Token not found in sessionStorage');
            console.error('User not authenticated');
            toast.error('User not authenticated');
            navigate('/');
        } else {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.sub);
            if (decodedToken.role !== 'admin') {
                console.error('User does not have admin privileges');
                toast.error('No tienes permisos');
                navigate('/');
            }
        }

    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/categories`);

                if (!response.ok) {
                    throw new Error(`Categories API request failed with status: ${response.status}`);
                }

                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                toast.error('Error al cargar las categorías. Por favor, intenta de nuevo.');
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/events`);

                if (!response.ok) {
                    throw new Error(`Events API request failed with status: ${response.status}`);
                }

                const eventsData = await response.json();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error.message);
                toast.error('Error al cargar los eventos. Por favor, intenta de nuevo.');
            }
        };

        fetchEvents();
    }, []);

    const handleEditEvent = (eventId) => {
        const eventToEdit = events.find(event => event.id === eventId);
        setFormData({
            name: eventToEdit.name,
            description: eventToEdit.description,
            category_id: eventToEdit.category_id,
            start_date: eventToEdit.start_date,
            end_date: eventToEdit.end_date
        });
        setShowEditForm(true);
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     // Verificar si eventId está definido
    //     if (!eventId) {
    //         console.error('El ID del evento no está definido');
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Error al actualizar el evento');
    //         }

    //         toast.success('Evento actualizado exitosamente');
    //         setShowEditForm(false);
    //         // Puedes agregar aquí cualquier otra lógica necesaria después de actualizar el evento, como recargar la lista de eventos, etc.
    //     } catch (error) {
    //         console.error('Error al actualizar el evento:', error.message);
    //         toast.error('Error al actualizar el evento. Por favor, intenta de nuevo.');
    //     }
    // };

    return (
        <div className="container">
            <h2>Eventos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td>{event.id}</td>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.category_id}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEditEvent(event.id)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditForm && (
                <div className="edit-form">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <input type="text" placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}>
                            <option value="">Seleccione una categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="Fecha de fin" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateEvent;
