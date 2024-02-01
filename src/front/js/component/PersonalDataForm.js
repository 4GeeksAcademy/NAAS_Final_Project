import React, { useContext } from "react"
import { Context } from "../store/appContext"
import "../../styles/loginContainer.css";
import { testData3 } from "../component/testData";

function PersonalDataForm() {
  const { store, actions } = useContext(Context);
  return (
    <div className='contaniner-fluid d-flex color-back p-5 m-5'>
      <div className='container-fluid d-flex align-items-center p-5'>
        <div>
      <img className="container" src={testData3[6].fotoUrl} alt="Avatar" />
        </div>
      </div>
      <div className="container-fluid p-5">
        <form className="container">
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
    </div>
  )
}

export default PersonalDataForm