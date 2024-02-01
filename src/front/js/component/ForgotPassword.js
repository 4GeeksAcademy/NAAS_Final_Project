import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/loginContainer.css";
import { Welcome } from './welcome';
import { toast } from 'react-toastify';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if the email field is not empty
    if (!email.trim()) {
      toast.info('Fields are empty');
      return;
    }

    try {
      setLoading(true);
      toast.info('Sending request...');

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
        toast.success('Request received. If the email is registered, you will receive a link to reset your password.');
        navigate('/login');
      } else {
        console.error('Error resetting password');
        toast.error('Error resetting the password');
      }
    } catch (error) {
      console.error('Error resetting password', error);
      toast.error('Error resetting the password');
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
    <div className='container-fluid d-flex color-back'>
      <div className='container-fluid col-6' style={{ display: "contents" }}>
        <Welcome />
      </div>
      <div className="login-container p-5 col-6">
        <form onSubmit={handleResetPassword}>
          <h1 className='color-text p-5'>Reset My Password</h1>
          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
              <input
                type="email"
                className="form-control"
                id="EmailAddress"
                aria-describedby="emailHelp"
                title="&#xf0e0 Email address"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
          <button type="submit" className="btn confirm-btn" style={{ background: "#FE5201" }} disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
