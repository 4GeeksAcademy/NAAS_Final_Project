import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Welcome } from '../component/welcome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
    country: '',
    email: '',
    password: '',
  });
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        // Ordenar los países alfabéticamente por nombre común
        const sortedCountries = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setCountries(sortedCountries);
        setVisibleCountries(sortedCountries.slice(0, 20));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCountryClick = (countryName) => {
    handleChange({ target: { id: 'country', value: countryName } });
  };

  const handleScroll = async (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      try {
        const newVisibleCountries = countries.slice(visibleCountries.length, visibleCountries.length + 10);
        setVisibleCountries((prevVisibleCountries) => [...prevVisibleCountries, ...newVisibleCountries]);
      } catch (error) {
        console.error('Error updating visible countries:', error);
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = ['username', 'firstname', 'lastname', 'country', 'email', 'password'];
    if (requiredFields.some(field => !formData[field])) {
      console.log('Missing or empty values for required fields. FormData:', formData);
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      console.log("FormData before sending:", formData);
      const response = await fetch(process.env.BACKEND_URL + '/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseJson = await response.json();
      console.log('Server response:', responseJson);

      if (response.ok) {
        console.log('User registered successfully');
        toast.success('User registered successfully');
        navigate("/login")
      } else {
        console.error('Error registering user:', responseJson);
        toast.error(`Error registering user: ${responseJson.msg}`);
      }
    } catch (error) {
      console.error('Error making the request', error);
      toast.error(`Error making the request: ${error}`);
    }
  };


  return (
    <div className='mobile-column container-fluid d-flex color-back vista'>
      <div className='mobile-column container-fluid' style={{ display: "contents" }}>
        <Welcome />
      </div>
      <div className="login-container p-4 mobile-column">
        <form onSubmit={handleSubmit}>
          <h2 className='title-color mb-5'>Crea una cuenta nueva</h2>
          <div className='name-container'>
            <div className="mb-3">
              <div className="input-icon">
                <i className="fa-regular fa-user" style={{ color: "#7f7f7f" }} />
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="Nombre"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="input-icon">
                <i className="fa-regular fa-user" style={{ color: "#7f7f7f" }} />
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-regular fa-user" style={{ color: "#7f7f7f" }} />
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='name-container'>
            <div className="mb-3">
              <div className="input-icon">
                <i className="fa-regular fa-user" style={{ color: "#7f7f7f" }} />
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="dropdown" onScroll={handleScroll}>
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {formData.country || 'País'}
              </a>
              <ul className="dropdown-menu" style={{ maxHeight: '200px', overflowY: 'auto' }} onScroll={handleScroll}>
                {visibleCountries.map((country) => (
                  <li key={country.name.common}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleCountryClick(country.name.common)}
                    >
                      {country.name.common}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-regular fa-envelope" style={{ color: "#7f7f7f" }} />
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Dirección de correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="input-icon">
              <i className="fa-solid fa-lock" style={{ color: "#7f7f7f" }} />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='btn-container'>
            <button type="submit" className="btn confirm-btn" style={{ background: "#FE5201" }}>
              <i className="fa-solid fa-rocket" style={{ marginRight: '8px' }} />
              Inscribirse
            </button>
          </div>

          <p className='p-2 color-text'>
          ¿Ya tienes una cuenta?
            <Link to={"/login"}> Iniciar sesión </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
