import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const ImageUpload = () => {
  const [files, setFiles] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEventsAndCategories = async () => {
      try {
        const eventsResponse = await fetch(`${process.env.BACKEND_URL}/api/events`);
        if (!eventsResponse.ok) {
          console.error(`Events API request failed with status: ${eventsResponse.status}`);
          return;
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);

        const categoriesResponse = await fetch(`${process.env.BACKEND_URL}/api/categories`);
        if (!categoriesResponse.ok) {
          throw new Error(`Categories API request failed with status: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        console.log("Fetching events and categories");
      } catch (error) {
        console.error("Error fetching events and categories:", error.message);
      }
    };

    fetchEventsAndCategories();
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);

    // Previsualización de imágenes
    const previews = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      previews.push(URL.createObjectURL(selectedFiles[i]));
    }
    setPreviewImages(previews);
  };

  const handleUpload = async () => {
    // Check if files are selected
    if (!files || files.length === 0) {
      console.error("No files selected");
      toast.error('No files selected');
      return;
    }

    // Validar extensiones permitidas (png, jpg, jpeg)
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    for (let i = 0; i < files.length; i++) {
      const fileExtension = files[i].name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        console.error(`Invalid file format: ${fileExtension}`);
        toast.error(`Invalid file format: ${fileExtension}`);
        return;
      }
    }

    // Create a FormData object for uploading photos
    const uploadFormData = new FormData();

    // Append the selected files with the name 'photos'
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append("photos", files[i]);
    }

    // Append other form fields
    uploadFormData.append("name", document.getElementById("name").value);
    uploadFormData.append("description", document.getElementById("description").value);
    uploadFormData.append("category_id", document.getElementById("category_id").value);
    uploadFormData.append("user_id", document.getElementById("user_id").value);
    uploadFormData.append("event_id", document.getElementById("event_id").value);

    // Validar campos obligatorios
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const category_id = document.getElementById("category_id").value;
    const user_id = document.getElementById("user_id").value;

    if (!name || !description || !category_id || !user_id) {
      console.error("All fields except 'event_id' are required");
      toast.error('Required fields are missing');
      return;
    }

    try {
      // Fetch the backend API endpoint for uploading photos
      const uploadResponse = await fetch(`${process.env.BACKEND_URL}/api/upload-photos`, {
        method: "POST",
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

      // Create a FormData object for creating photos
      const createFormData = new FormData();

      // Append other form fields (if needed)
      createFormData.append("name", document.getElementById("name").value);
      createFormData.append("description", document.getElementById("description").value);
      createFormData.append("category_id", document.getElementById("category_id").value);
      createFormData.append("user_id", document.getElementById("user_id").value);
      createFormData.append("event_id", document.getElementById("event_id").value);

      // Create photos using the img_urls
      const createResponse = await fetch(`${process.env.BACKEND_URL}/api/create-photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          category_id: document.getElementById("category_id").value,
          user_id: document.getElementById("user_id").value,
          event_id: document.getElementById("event_id").value,
          img_urls: imgUrls,
        }),
      });

      if (!createResponse.ok) {
        console.error("Creating photos failed", createResponse.status);
        return;
      }

      const createData = await createResponse.json();
      console.log("Photos creation success!", createData);

      // Handle any additional logic after successful upload and creation

      // Limpieza de previsualización después de la carga exitosa
      setFiles(null);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error:", error);
      // Handle network or unexpected errors
    }
  };

  console.log("Rendering with events:", events);
  console.log("Rendering with categories:", categories);

  return (
    <div className="container">
      <div className="jumbotron">
        <h2 className="mb-4">Upload and Create Photos</h2>
        <div className="form-group">
          <label htmlFor="photoInput">Select Photos:</label>
          <input type="file" className="form-control-file" id="photoInput" onChange={handleFileChange} multiple />
        </div>
        {/* Sección de previsualización */}
        <div className="preview-section">
          {previewImages.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} className="preview-image" style={{ width: "100px", height: "100px" }} />
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" className="form-control" id="description" placeholder="Enter description" />
        </div>
        <div className="form-group">
          <label htmlFor="categorySelect">Category:</label>
          <select className="form-control" id="category_id">
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input type="text" className="form-control" id="user_id" placeholder="Enter user ID" />
        </div>
        <div className="form-group">
          <label htmlFor="eventSelect">Event:</label>
          <select className="form-control" id="event_id">
            {Array.isArray(events) && events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload and Create Photos
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
