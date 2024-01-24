import React from 'react'
import "../../styles/contactForm.css"

function ContactForm() {
  return (
    <div className="login-container">
      <form className="login-form">
      <h2 className='title'>Contacto</h2>
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
  <label htmlFor="comentarios" className="form-label">Comentarios</label>
  <textarea className="form-control" id="comentarios" rows="3"/>
</div>
        <button type="submit" className="btn confirm-btn">
          Enviar
          <i className="fa-regular fa-circle-check" style={{marginLeft: '8px' }}/>
        </button>
        <div className="mb-3">
         
        </div>
      </form>
    </div>
  )
}

export default ContactForm