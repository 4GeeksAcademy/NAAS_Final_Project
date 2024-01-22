import React from 'react'
import "../../styles/loginContainer.css";

function SignUpForm() {
  return (
    <div className="login-container">
    <form className="login-form">
    <h2 className='title'>Crea una nueva cuenta</h2>
      <div className="mb-3">
        <div className="input-icon">
        <i className="fa-regular fa-user" style={{color: "#7f7f7f"}}/>
            <input
            type="email"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            title="&#xf0e0 Email address"  
            placeholder="Username"
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="input-icon">
        <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
          <input
            type="password"
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
            placeholder="password"
          />
        </div>
      </div>
      <button type="submit" className="btn confirm-btn" style={{background: "#FE5201"}}>
      <i className="fa-solid fa-rocket" style={{ marginRight: '8px' }}/>
       Registrarme
      </button>
      <div className="mb-3">
      
      </div>
    </form>
  </div>
  )
}

export default SignUpForm