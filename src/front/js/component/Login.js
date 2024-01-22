import React from 'react';
import "../../styles/loginContainer.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
      <h2 className='title'>Login</h2>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
            <input
              type="email"
              className="form-control"
              id="InputEmail"
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
              id="Password"
              placeholder="Password"
            />
          </div>
        </div>
        <button type="submit" className="btn confirm-btn">
          Confirmar
        </button>
        <div className="mb-3">
          <Link to={"/forgot-password"}>

          <button type="button" className="btn btn-link forgot-password-btn">
            Olvidé mi contraseña
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

  