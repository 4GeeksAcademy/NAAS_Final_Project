import { jwtDecode } from "jwt-decode";

const checkTokenAndRedirect = (token) => {
  if (!token) {
    console.error('No token found');
    return false; // No hay token presente
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      console.error('Token expired');
      console.error('Removing token from sessionStorage');
      sessionStorage.removeItem('token');
      return false; // Token ha expirado
    }

    return true; // Token válido
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; // Error al decodificar el token
  }
};

export default checkTokenAndRedirect;
