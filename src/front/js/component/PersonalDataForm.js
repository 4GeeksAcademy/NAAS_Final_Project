// PersonalDataForm.js
import React, { useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { testData3 } from "../component/testData";

function PersonalDataForm() {
  const [editMode, setEditMode] = useState(false);
  const [UserData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    country: "",
    email: ""
  });

  const {store, actions} = useContext(Context)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.getUserData();
        setUserData(store.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [store.dataUser]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Llama a la acción updateUserData con los datos del usuario
      await actions.updateUserData(UserData);
      setEditMode(false);
      toast.success('Saved data');

    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
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
            value={UserData.firstname}
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
            value={UserData.lastname}
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
            value={UserData.username}
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
            value={UserData.phone}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="label-color">País:</label>
        <div className="input-icon">
        <i className="fa-solid fa-globe" style={{ color: "#7f7f7f" }} />
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            id="country"
            value={UserData.country}
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
          Guardar
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