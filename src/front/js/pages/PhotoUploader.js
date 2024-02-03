import React, { useState } from "react";

const ImageUpload = () => {
  const [files, setFiles] = useState(null);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    // Check if files are selected
    if (!files || files.length === 0) {
      console.error("No files selected");
      return;
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
    } catch (error) {
      console.error("Error:", error);
      // Handle network or unexpected errors
    }
  };

  return (
    <div className="jumbotron">
      <input type="file" onChange={handleFileChange} multiple />
      <input type="text" id="name" placeholder="Name" />
      <input type="text" id="description" placeholder="Description" />
      <input type="text" id="category_id" placeholder="Category ID" />
      <input type="text" id="user_id" placeholder="User ID" />
      <input type="text" id="event_id" placeholder="Event ID" />
      <button onClick={handleUpload}>Upload and Create Photos</button>
    </div>
  );
};

export default ImageUpload;
