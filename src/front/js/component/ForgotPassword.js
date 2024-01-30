import React from 'react'
import "../../styles/loginContainer.css";
import { Link } from 'react-router-dom';
import { Welcome } from './welcome';

function ForgetPassword() {
  return (
    <div className='contaniner-fluid d-flex color-back'>
      <div className='container-fluid col-6' style={{ display: "contents" }}>
      <Welcome />
    </div>
         <div className="login-container p-5 col-6">
      <form className="">
      <h1 className='color-text p-5'>Restablecer mi contraseña</h1>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
            <input
              type="email"
              className="form-control"
              id="EmailAdress"
              aria-describedby="emailHelp"
              title="&#xf0e0 Email address"  
              placeholder="Email address"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-lock" style={{ color: "#7f7f7f" }} />
            <input
              type="password"
              className="form-control"
              id="NewPassword"
              placeholder="New password"
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-solid fa-lock" style={{ color: "#7f7f7f" }} />
            <input
              type="password"
              className="form-control"
              id="ConfirmPassword"
              placeholder="Confirm password"
            />
          </div>
        </div>
        <button type="submit" className="btn confirm-btn" style={{background: "#FE5201"}}>
          Confirmar
        </button>
        <div className="mb-3">
        
        </div>
      </form>
    </div>
    
    </div>
  )
}

export default ForgetPassword