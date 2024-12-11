import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams(); // Extract hotelId from the URL
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    hotelId: "",
    hotelName: "",
    location: "",
    pricePerNight: "",
    availableRooms: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(""); // To show the current or new image preview

  // Fetch the existing hotel details when the component mounts
  useEffect(() => {
    fetchHotelDetails();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      console.log("hotelId from URL:", hotelId); // Debugging
      const response = await axios.get(`http://localhost:3000/hotel-offers`);
      console.log("Backend Response:", response.data.offers); // Debugging
      const hotel = response.data.offers.find((h) => String(h.hotelId) === String(hotelId)); // Match hotel ID
      if (hotel) {
        setHotelData(hotel); // Set the fetched hotel data
        setImagePreview(hotel.image); // Display the existing image preview
      } else {
        alert("Hotel not found!");
        navigate("/hotel-portal");
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      alert("Failed to load hotel details.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String); // Update the image preview
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
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      await axios.put(`http://localhost:3000/hotel-offers/${hotelId}`, hotelData);
      alert("Hotel offer updated successfully!");
      navigate("/hotel-portal"); // Redirect to the Hotel Portal
    } catch (error) {
      console.error("Error updating hotel offer:", error);
      alert("An error occurred while updating the hotel offer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Hotel Offer</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Hotel ID</label>
          <input
            type="text"
            name="hotelId"
            value={hotelData.hotelId}
            disabled // ID should not be editable
            className="w-full border px-2 py-1 bg-gray-200"
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
          Update Hotel Offer
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

export default EditHotel;
