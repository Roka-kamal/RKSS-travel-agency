import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FlightsPortal = () => {
  const [flights, setFlights] = useState([]);
  const [editingFlightId, setEditingFlightId] = useState(null);
  const [editedFlight, setEditedFlight] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flights");
      setFlights(response.data.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleEditClick = (flight) => {
    setEditingFlightId(flight._id);
    setEditedFlight(flight);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedFlight((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditConfirm = async () => {
    try {
      await axios.put(
        `http://localhost:3000/flights/${editingFlightId}`,
        editedFlight
      );
      setEditingFlightId(null);
      fetchFlights();
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  const handleDelete = async (flightId) => {
    try {
      await axios.delete(`http://localhost:3000/flights/${flightId}`);
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Flights Portal</h2>
        <Link
          to="/create-flight"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>Create Flight
        </Link>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Airline</th>
            <th className="border px-4 py-2">Departure</th>
            <th className="border px-4 py-2">Arrival</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={flight._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                {editingFlightId === flight._id ? (
                  <input
                    type="text"
                    name="airline"
                    value={editedFlight.airline}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  flight.airline
                )}
              </td>
              <td className="border px-4 py-2">
                {editingFlightId === flight._id ? (
                  <input
                    type="text"
                    name="departure"
                    value={editedFlight.departure}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  flight.departure
                )}
              </td>
              <td className="border px-4 py-2">
                {editingFlightId === flight._id ? (
                  <input
                    type="text"
                    name="arrival"
                    value={editedFlight.arrival}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  flight.arrival
                )}
              </td>
              <td className="border px-4 py-2">
                {editingFlightId === flight._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedFlight.price}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  `$${flight.price}`
                )}
              </td>
              <td className="border px-4 py-2">
                {editingFlightId === flight._id ? (
                  <input
                    type="text"
                    name="flightType"
                    value={editedFlight.flightType}
                    onChange={handleEditChange}
                    className="border px-2 py-1"
                  />
                ) : (
                  flight.flightType
                )}
              </td>
              <td className="border px-4 py-2 flex items-center">
                {editingFlightId === flight._id ? (
                  <button
                    onClick={handleEditConfirm}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(flight)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => handleDelete(flight._id)}
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

export default FlightsPortal;
