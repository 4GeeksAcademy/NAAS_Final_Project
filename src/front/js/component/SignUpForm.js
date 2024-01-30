import React from 'react';
import "../../styles/contactForm.css";
import { Link } from 'react-router-dom';
import { Welcome } from './welcome';

function SignUpForm() {
  return (
    <div className='contaniner-fluid d-flex color-back'>
    <div className="login-container p-5 col-6">
      <form className="">
        <h2 className='title-color mb-5'>Crea una nueva cuenta</h2>
        <div className='name-container'>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-user" style={{color: "#7f7f7f"}}/>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
            />
          </div>
        </div>
        
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-user" style={{color: "#7f7f7f"}}/>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-user" style={{color: "#7f7f7f"}}/>
            <input
              type="email"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>
        </div>
      <div className='name-container'>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-user" style={{color: "#7f7f7f"}}/>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className="mb-3 ">
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Country
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
        </div>
        <div className="mb-3">
          <div className="input-icon">
            <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
            <input
              type="email"
              className="form-control"
              id="email"
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
              id="CreatePassword"
              placeholder="Password"
            />
          </div>
        </div>
        <div className='btn-container'>
        <button type="submit" className="btn confirm-btn" style={{background: "#FE5201"}}>
          <i className="fa-solid fa-rocket" style={{ marginRight: '8px' }}/>
          Registrarme
        </button>
      </div>
        <div className="mb-3">
        </div>
        <p className='p-2 color-text'>Ya tengo cuenta.  
          <Link to={"/login"}>Log in</Link></p>

      </form>
    </div>
    <div className='container-fluid col-6' style={{ display: "contents" }}>
      <Welcome />
    </div>
    </div>
  );
}

export default SignUpForm;
