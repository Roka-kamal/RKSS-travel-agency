import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateHotelOffer = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    hotelId: "",
    hotelName: "",
    location: "",
    pricePerNight: "",
    availableRooms: "",
    image: "", // Base64-encoded image string
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String); // Display the image preview
        setHotelData((prev) => ({
          ...prev,
          image: base64String, // Store Base64 string in hotelData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/hotel-offers", hotelData);
      alert("Hotel offer added successfully!");
      navigate("/hotel-portal");
    } catch (error) {
      console.error("Error creating hotel offer:", error);
      alert("An error occurred while creating the hotel offer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Hotel Offer</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Hotel ID</label>
          <input
            type="text"
            name="hotelId"
            value={hotelData.hotelId}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Hotel Name</label>
          <input
            type="text"
            name="hotelName"
            value={hotelData.hotelName}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={hotelData.location}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Price Per Night ($)</label>
          <input
            type="number"
            name="pricePerNight"
            value={hotelData.pricePerNight}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Available Rooms</label>
          <input
            type="number"
            name="availableRooms"
            value={hotelData.availableRooms}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border px-2 py-1"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Hotel Preview" className="max-w-full h-auto" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Hotel Offer
        </button>
        <button
          type="button"
          onClick={() => navigate("/hotel-portal")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateHotelOffer;
