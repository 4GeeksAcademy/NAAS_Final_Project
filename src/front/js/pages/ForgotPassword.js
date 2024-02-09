import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/loginContainer.css";
import { Welcome } from '../component/welcome';
import { toast } from 'react-toastify';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the email field is not empty
    if (!email.trim()) {
      toast.info('Los campos están vacíos');
      return;
    }

    try {
      setLoading(true);
      toast.info('Enviando pedido...');

      // Make a request to reset the password
      const response = await fetch(process.env.BACKEND_URL + "/api/reset-password", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Request successful, redirect to the login page
        toast.success('Solicitud recibida. Si el correo electrónico está registrado, recibirá un enlace para restablecer su contraseña.');
        navigate('/login');
      } else {
        console.error('Error resetting password');
        toast.error('Error al restablecer la contraseña');
      }
    } catch (error) {
      console.error('Error resetting password', error);
      toast.error('Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is "Enter"
    if (e.key === 'Enter') {

      handleResetPassword(e);
    }
  };

  return (
    <div className='container-fluid d-flex color-back mobile-column vista'>
      <div className='mobile-column container-fluid'>
        <Welcome />
      </div>
      <div className="login-container p-2">
        <form onSubmit={handleResetPassword}>
          <h1 className='color-text'>Restablecer mi contraseña</h1>
          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
              <input
                type="email"
                className="form-control"
                id="EmailAddress"
                aria-describedby="emailHelp"
                title="&#xf0e0 Email address"
                placeholder="Dirección de correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <button type="submit" className="btn confirm-btn" style={{ background: "#FE5201" }} disabled={loading}>
            {loading ? 'Cargando...' : 'Confirmar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
