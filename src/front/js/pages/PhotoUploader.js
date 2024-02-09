import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwt_decode, { jwtDecode } from "jwt-decode";
import checkTokenAndRedirect from "../utils/checkToken";

const ImageUpload = () => {
  const [userId, setUserId] = useState(null);
  const [files, setFiles] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const checkToken = () => {
      const token = sessionStorage.getItem('token'); // Obtener el token aquí
      const isValidToken = checkTokenAndRedirect(token);
      if (!isValidToken) {
        toast.error('¡Debe volver a iniciar sesión!');
        navigate('/login');
      }
    };

    const getUserIdFromToken = () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub;
        setUserId(userId);
      }
    };

    checkToken();
    getUserIdFromToken();
    fetchEventsAndCategories();
  }, []);

  const fetchEventsAndCategories = async () => {
    try {
      const eventsResponse = await fetch(`${process.env.BACKEND_URL}/api/events`);
      if (!eventsResponse.ok) {
        console.error(`Events API request failed with status: ${eventsResponse.status}`);
        return;
      }
      const eventsData = await eventsResponse.json();
      console.log("Events Data:", eventsData);
      setEvents(eventsData || []);
      console.log("Events:", eventsData.events);

      const categoriesResponse = await fetch(`${process.env.BACKEND_URL}/api/categories`);
      if (!categoriesResponse.ok) {
        throw new Error(`Categories API request failed with status: ${categoriesResponse.status}`);
      }
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      console.log("Fetching events and categories");

    } catch (error) {
      console.error("Error fetching events:", error.message);
    }
  };


  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);

    const previews = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      previews.push(URL.createObjectURL(selectedFiles[i]));
    }
    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      console.error("No files selected");
      toast.error('No hay archivos seleccionados');
      return;
    }

    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        console.error(`Invalid file format: ${fileExtension}`);
        toast.error(`Formato de archivo inválido: ${fileExtension}`);
        return;
      }
    }

    const uploadFormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      uploadFormData.append("photos", files[i]);
    }

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const category_id = document.getElementById("category_id").value;

    if (!name || !description || !category_id) {
      toast.error('Faltan campos obligatorios');
      return;
    }

    uploadFormData.append("name", name);
    uploadFormData.append("description", description);
    uploadFormData.append("category_id", category_id);
    uploadFormData.append("user_id", userId);
    uploadFormData.append("event_id", document.getElementById("event_id").value);

    try {
      const uploadResponse = await fetch(`${process.env.BACKEND_URL}/api/upload-photos`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        body: uploadFormData,
      });

      if (!uploadResponse.ok) {
        console.error("Image upload failed", uploadResponse.status);
        return;
      }

      const uploadData = await uploadResponse.json();

      console.log("Image upload success!", uploadData);

      // Extract the img_urls from the response
      const imgUrls = uploadData.img_urls;

      // Log the data being sent to create-photos endpoint
      console.log("Data sent to create-photos endpoint:", {
        name,
        description,
        category_id,
        event_id: document.getElementById("event_id").value,
        user_id: userId,
        img_urls: imgUrls,
      });

      // Create a FormData object for creating photos
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", category_id);
      formData.append("event_id", document.getElementById("event_id").value);
      formData.append("user_id", userId);
      imgUrls.forEach((url, index) => {
        formData.append(`img_urls[${index}]`, url);
      });

      // Send the request to create the photos
      const createResponse = await fetch(`${process.env.BACKEND_URL}/api/create-photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: name,
          description: description,
          category_id: category_id,
          event_id: document.getElementById("event_id").value,
          user_id: userId,
          img_urls: imgUrls,
        }),
      });

      if (!createResponse.ok) {
        console.error("Creating photos failed", createResponse.status);
        return;
      }

      const createData = await createResponse.json();
      console.log("Photos creation success!", createData);

      // Limpiar campos y estado después de la carga exitosa de imágenes
      toast.success('¡Fotos subidas exitosamente!');
      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category_id").value = "";
      document.getElementById("event_id").value = "";
      setFiles(null);
      setPreviewImages([]);

    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Detalles de la respuesta del servidor:", error.response.data);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center mobile-column vista text-color text-center welcome-view">
      <div className="jumbotron color-text login-form mobile-column">
        <h2 className="mb-4 color-text">Subir y crear fotos</h2>
        <div className="form-group">
          <label htmlFor="photoInput">Seleccionar fotos:</label>
          <input type="file" className="form-control-file" id="photoInput" onChange={handleFileChange} multiple={false} />
        </div>
        <div className="preview-section">
          {previewImages.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} className="preview-image" style={{ width: "100px", height: "100px" }} />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre de la foto" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <input type="text" className="form-control" id="description" placeholder="Introduce la descripción" />
        </div>
        <div className="form-group">
          <label htmlFor="categorySelect">Categoría:</label>
          <select className="form-control" id="category_id">
            <option value="">Seleccione una categoría</option>
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="eventSelect">Evento:</label>
          <select className="form-control" id="event_id">
            <option value="">Seleccione un evento</option>
            {Array.isArray(events) && events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn brd color-call color-text" onClick={handleUpload}>
          Subir fotos
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
