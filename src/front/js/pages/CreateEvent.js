import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import "../../styles/createvent.css";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        start_date: '',
        end_date: ''
    });

    const [categories, setCategories] = useState([]);
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

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/event/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Evento creado exitosamente');
                navigate('/events');
            } else {
                throw new Error(data.message || 'Error al crear evento');
            }
        } catch (error) {
            console.error('Error al crear evento:', error.message);
            toast.error('Error al crear evento. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="container">
            <div className='row justify-content-center mt-3 mb-3'>
                <div className='col-lg-6'>
                    <div className='card p-5 shadow rounded custom-form text-white' style={{ backgroundColor: '#212529', borderRadius: '15px' }}>
                        <h2 className='text-center mb-4 card-title' style={{ color: '#F75101', fontWeight: 'bold' }}>Crear Nuevo Evento</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input type="text" className="form-control custom-input" placeholder='Nombre del Evento' name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Descripción:</label>
                                <textarea className="form-control custom-input" name="description" placeholder='Descripción del Evento' value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Categoría:</label>
                                <select className="form-control custom-input" name="category_id" value={formData.category_id} onChange={handleChange} required>
                                    <option value="">Selecciona una Categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Fecha de inicio:</label>
                                <input type="datetime-local" className="form-control custom-input" name="start_date" value={formData.start_date} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Fecha de fin:</label>
                                <input type="datetime-local" className="form-control custom-input" name="end_date" value={formData.end_date} onChange={handleChange} required />
                            </div>
                            <div className='d-grid'>
                                <button type="submit" className="btn btn-primary btn-block custom-btn mt-2">Crear Evento</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
