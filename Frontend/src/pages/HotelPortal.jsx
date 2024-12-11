import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HotelPortal = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotel-offers");
      setHotels(response.data.offers);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:3000/hotel-offers/${hotelId}`);
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Hotel Portal</h2>
        <Link
          to="/create-hotel-offer"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>Create Hotel Offer
        </Link>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Hotel ID</th>
            <th className="border px-4 py-2">Hotel Name</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Price Per Night</th>
            <th className="border px-4 py-2">Available Rooms</th>
            <th className="border px-4 py-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotelId}>
              <td className="border px-4 py-2">{hotel.hotelId}</td>
              <td className="border px-4 py-2">{hotel.hotelName}</td>
              <td className="border px-4 py-2">{hotel.location}</td>
              <td className="border px-4 py-2">${hotel.pricePerNight}</td>
              <td className="border px-4 py-2">{hotel.availableRooms}</td>
              <td className="border px-4 py-2 flex items-center">
                <Link
                  to={`/edit-hotel/${hotel.hotelId}`}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => handleDelete(hotel.hotelId)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelPortal;
