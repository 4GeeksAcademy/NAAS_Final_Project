import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../styles/loginContainer.css';
import { toast } from 'react-toastify';

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Get the token from the URL and store it in local storage
  const getTokenFromURL = () => {
    const tokenFromURL = new URLSearchParams(window.location.search).get('token');

    if (tokenFromURL) {
      // Store the token in local storage
      localStorage.setItem('authToken', tokenFromURL);
      return tokenFromURL;
    } else {
      console.error('Token not found in the URL');
      navigate('/');
      return null;
    }
  };

  useEffect(() => {
    const token = getTokenFromURL();

    if (!token) {
      return; // If the token couldn't be obtained from the URL, exit
    }

    // Verify the validity of the token
    try {
      const decodedToken = jwtDecode(token);

      console.log('Decoded Token:', decodedToken);

      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

      if (isTokenExpired) {
        console.error('Token expired');
        toast.error('The token is expired, reset the password again');
        navigate('/');
      }
    } catch (error) {
      console.error('Error decoding the token', error);
      navigate('/');
    }
  }, [navigate]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      return;
    }

    try {
      const token = getTokenFromURL();

      if (!token) {
        return; // If the token couldn't be obtained from the URL, exit
      }

      const response = await fetch(process.env.BACKEND_URL + '/api/password-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success('Password updated successfully');
        navigate('/login');
        localStorage.removeItem("authToken")
      } else {
        console.error('Error updating the password');
        console.error('Server error message:', await response.text());
        toast.error('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error making the request', error);
      toast.error('Error al realizar la solicitud');
    }
  };

  return (
    <div className='container-fluid d-flex justify-content-center color-text mobile-column vista mb-5 p-5 welcome-view'>
      <div className='login-container container mobile-column d-flex justify-content-center '>
        <form className="text-start color-back p-5" onSubmit={handlePasswordUpdate}>
          <h2>Actualizar Contraseña</h2>
          <div className='text-center'>
          <div className='my-3'>
            <label className='d-flex justify-content-between'>
              Nueva Contraseña:
              <input className='mx-5'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='mb-3'>
            <label>
            Confirmar Contraseña:
              <input className='mx-5'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          </div>
          <button type='submit' className='btn confirm-btn mb-5' style={{ background: '#FE5201' }}>
          Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
