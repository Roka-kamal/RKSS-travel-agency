import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPackage = () => {
  const { packageId } = useParams(); // Extract packageId from the URL
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    packageId: "",
    packageType: "",
    destination: "",
    description: "",
    price: "",
    availableSeats: "",
    flightId: "",
    hotelId: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState(""); // To show the current or new image preview
  const [flights, setFlights] = useState([]); // List of available flights
  const [hotels, setHotels] = useState([]); // List of available hotels

  // Fetch the existing package details, flight IDs, and hotel IDs when the component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchPackageDetails(), fetchFlights(), fetchHotels()]);
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load package details or related data.");
      }
    };

    fetchAllData();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/packages/${packageId}`);
      const packageDetails = response.data.package; // Extract the package from the response

      if (packageDetails) {
        setPackageData({
          packageId: packageDetails.packageId,
          packageType: packageDetails.packageType || "Business",
          destination: packageDetails.destination || "",
          description: packageDetails.description || "",
          price: packageDetails.price || "",
          availableSeats: packageDetails.availableSeats || "",
          flightId: packageDetails.flightId || "",
          hotelId: packageDetails.hotelId || "",
          imageUrl: packageDetails.imageUrl || "",
        });
        setImagePreview(packageDetails.imageUrl || "");
      } else {
        alert("Package not found!");
        navigate("/package-portal");
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      alert("Failed to load package details.");
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flights");
      setFlights(response.data.data || []); // Set available flights
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotel-offers");
      setHotels(response.data.offers || []); // Set available hotels
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String); // Update the image preview
        setPackageData((prev) => ({
          ...prev,
          imageUrl: base64String, // Store Base64 string in packageData
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
    e.preventDefault(); // Prevent the form from refreshing the page
    try {
      await axios.put(`http://localhost:3000/packages/${packageId}`, packageData);
      alert("Package updated successfully!");
      navigate("/package-portal"); // Redirect to the Package Portal
    } catch (error) {
      console.error("Error updating package:", error);
      alert("An error occurred while updating the package.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Package</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Package ID</label>
          <input
            type="text"
            name="packageId"
            value={packageData.packageId}
            disabled // ID should not be editable
            className="w-full border px-2 py-1 bg-gray-200"
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
          Update Package
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

export default EditPackage;
