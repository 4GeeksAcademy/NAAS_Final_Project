import React, { useState } from 'react'
import "../../styles/contactForm.css"

function ContactForm() {
  return (
    <div className='container d-flex justify-content-center'>
    <div className='mobile-column contaniner-fluid d-flex text-center color-back vista'>
    <div className='mobile-column container-fluid align-items-center d-flex m-1 color-back rounded-3'>
      <div className="container-fluid">
      <div className='no-pad p-1 color-grad3 my-1'>
        <form className="container py-3 color-grad4">
          <h2 className='title'>Contacto</h2>
          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-regular fa-user" style={{ color: "#7f7f7f" }} />
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="Nombre de usuario"
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
                placeholder="Dirección de correo electrónico"
              />
            </div>
          </div>
          <div className="mb-3 pt-5 pb-3">
            <label htmlFor="comentarios" className="form-label">Comentarios</label>
            <textarea className="form-control" id="comentarios" rows="3" />
          </div>
          <button type="submit" className="btn confirm-btn">
            Enviar
            <i className="fa-regular fa-circle-check" style={{ marginLeft: '8px' }} />
          </button>
          <div className="mb-3">
          </div>
        </form>
      </div>
      </div>
      <div className='color-back'>
      <div className='container-fluid col-6 align-items-center color-back'style={{ display: "contents" }}>
        <div className='container pb-5 color-text d-flex-column text-center'>
        <h2>Nuestro Equipo
          de Soporte le
          respondera
          en menos de 48hs.</h2>
        <h2 className='p-5'>
          Envianos todas tus consultas o sugerencias.</h2>
        <h2>Gracias!!!!</h2>
      </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default ContactForm