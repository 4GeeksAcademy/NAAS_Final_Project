import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../styles/loginContainer.css";
import { testData3 } from "../component/testData";

function PersonalDataForm() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    country: "",
    email: ""
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error("Token no encontrado en sessionStorage");
          return;
        }

        const response = await fetch(process.env.BACKEND_URL + "/api/user-data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from backend:", data); // Verificar datos recibidos
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error("Token no encontrado en sessionStorage");
        return;
      }

      const response = await fetch(`${process.env.BACKEND_URL}/api/update-user-data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log("Datos del usuario actualizados con éxito:", updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (
    <div className='mobile-column contaniner-fluid d-flex color-back py-5 my-5'>
  <div className='container-fluid d-flex align-items-center p-1'>
    <div>
      <img className="container" src={testData3[6].fotoUrl} alt="Avatar" />
    </div>
  </div>
  <div className="container-fluid p-1">
    <form className="container">
      <h2 className='title text-center'>Datos personales</h2>
      <div className="mb-3">
        <label htmlFor="firstname" className="label-color">Nombre:</label>
        <div className="input-icon">
          <i className="fa-solid fa-user" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="label-color">Apellido:</label>
        <div className="input-icon">
          <i className="fa-solid fa-user" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="label-color">Nombre de usuario:</label>
        <div className="input-icon">
          <i className="fa-solid fa-user" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="label-color">Teléfono:</label>
        <div className="input-icon">
          <i className="fa-solid fa-phone" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="label-color">País:</label>
        <div className="input-icon">
        <i className="fa-solid fa-phone" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <Link to={"/forgot-password"}>
          <button type="button" className="btn btn-link forgot-password-btn">
            Cambiar contraseña
          </button>
        </Link>
      </div>

      {editMode ? (
        <button type="button" className="btn confirm-btn" onClick={handleSave}>
          Guardar cambios
        </button>
      ) : (
        <div className="d-flex justify-content-center">
        <button type="button" className="btn confirm-btn" onClick={handleEdit}>
          Editar
        </button>
        </div>
      )}
    </form>
  </div>
</div>

  )
}

export default PersonalDataForm;

