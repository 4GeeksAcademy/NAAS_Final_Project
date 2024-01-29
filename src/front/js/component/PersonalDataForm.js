import React from "react";
import "../../styles/loginContainer.css";

function PersonalDataForm(){
    return(
 <div className="login-container">
      <form className="login-form">
      <h2 className='title'>Datos personales</h2>
      <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-user" style={{ color: "#7f7f7f" }} />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-user" style={{ color: "#7f7f7f" }} />
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
          <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-earth-americas" style={{ color: "#7f7f7f" }} />
            <input
              type="text"
              className="form-control"
              placeholder="Country"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
          <i className="fa-solid fa-lock" style={{ color: "#7f7f7f" }} />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-phone" style={{ color: "#7f7f7f" }} />
           
            <input
              type="number"
              className="form-control"
              placeholder="Phone"
            />
          </div>
        </div>
        <button type="submit" className="btn confirm-btn">
          Confirmar cambios
        </button>
      </form>
    </div>
    )
}

export default PersonalDataForm