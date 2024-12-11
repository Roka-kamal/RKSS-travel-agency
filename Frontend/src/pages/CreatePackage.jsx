import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePackage = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageId: "",
    packageType: "Business",
    destination: "",
    description: "",
    price: "",
    availableSeats: "",
    flightId: "",
    hotelId: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch flight IDs and hotel IDs for the dropdowns
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchFlights(), fetchHotels()]);
      } catch (error) {
        setError("Failed to load required data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flights");
      setFlights(response.data.data); // Use response.data.data as per your API response structure
    } catch (error) {
      console.error("Error fetching flights:", error);
      throw new Error("Failed to load flights.");
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotel-offers");
      setHotels(response.data.offers); // Use response.data.offers as per your API response structure
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw new Error("Failed to load hotels.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setPackageData((prev) => ({
          ...prev,
          imageUrl: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/packages", packageData);
      alert("Package created successfully!");
      navigate("/package-portal");
    } catch (error) {
      console.error("Error creating package:", error);
      alert("An error occurred while creating the package.");
    }
  };

  if (loading) {
    return <p>Loading package creation form...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Package ID</label>
          <input
            type="text"
            name="packageId"
            value={packageData.packageId}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Package Type</label>
          <select
            name="packageType"
            value={packageData.packageType}
            onChange={handleChange}
            className="w-full border px-2 py-1"
          >
            <option value="Business">Business</option>
            <option value="Group">Group</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Destination</label>
          <input
            type="text"
            name="destination"
            value={packageData.destination}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={packageData.description}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            value={packageData.availableSeats}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-2">Flight ID</label>
          <select
            name="flightId"
            value={packageData.flightId}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          >
            <option value="">Select Flight</option>
            {flights.map((flight) => (
              <option key={flight.flightId} value={flight.flightId}>
                {flight.flightId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Hotel ID</label>
          <select
            name="hotelId"
            value={packageData.hotelId}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1"
          >
            <option value="">Select Hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel.hotelId} value={hotel.hotelId}>
                {hotel.hotelId}
              </option>
            ))}
          </select>
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
              <img src={imagePreview} alt="Package Preview" className="max-w-full h-auto" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Package
        </button>
        <button
          type="button"
          onClick={() => navigate("/package-portal")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreatePackage;
