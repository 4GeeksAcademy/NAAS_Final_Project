import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        start_date: '',
        end_date: ''
    });
    const [categories, setCategories] = useState([]);

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
                // Esperar un momento antes de limpiar los campos y redirigir
                setTimeout(() => {
                    setFormData({
                        name: '',
                        description: '',
                        category_id: '',
                        start_date: '',
                        end_date: ''
                    });
                    // Redirigir a la página de eventos después de limpiar los campos
                    window.location.href = "/events";
                }, 1000); // Esperar 1 segundo antes de limpiar y redirigir (puedes ajustar este valor según tus necesidades)
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
            <h2>Crear Nuevo Evento</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Categoría:</label>
                    <select className="form-control" name="category_id" value={formData.category_id} onChange={handleChange} required>
                        <option value="">Selecciona una categoría</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha de inicio:</label>
                    <input type="datetime-local" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Fecha de fin:</label>
                    <input type="datetime-local" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Crear Evento</button>
            </form>
        </div>
    );
};

export default CreateEvent;
