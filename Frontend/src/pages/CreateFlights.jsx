import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFlight = () => {
  const navigate = useNavigate();

  const [flightData, setFlightData] = useState({
    flightId: "",
    airline: "",
    departure: "",
    arrival: "",
    price: "",
    flightType: "One-way", // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/flights", flightData);
      alert("Flight added successfully!");
      navigate("/flights-portal"); // Redirect to the Flights Portal after successful creation
    } catch (error) {
      console.error("Error creating flight:", error);
      alert("An error occurred while creating the flight.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Flight</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="flightId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Flight ID
          </label>
          <input
            type="text"
            id="flightId"
            name="flightId"
            value={flightData.flightId}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="airline"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Airline
          </label>
          <input
            type="text"
            id="airline"
            name="airline"
            value={flightData.airline}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="departure"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Departure
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={flightData.departure}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="arrival"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Arrival
          </label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={flightData.arrival}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={flightData.price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="flightType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Flight Type
          </label>
          <select
            id="flightType"
            name="flightType"
            value={flightData.flightType}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="One-way">One-way</option>
            <option value="Round-trip">Round-trip</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Flight
          </button>
          <button
            type="button"
            onClick={() => navigate("/flights-portal")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFlight;
