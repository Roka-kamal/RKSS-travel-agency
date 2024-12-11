import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PackagePortal = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all packages when component mounts
  useEffect(() => {
    fetchPackages();
  }, []);

  // Function to fetch all packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/packages");
      setPackages(response.data.packages);
      setLoading(false);
    } catch (error) {
      setError("Failed to load packages. Please try again later.");
      console.error("Error fetching packages:", error);
      setLoading(false);
    }
  };

  // Function to delete a specific package by ID
  const handleDelete = async (packageId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete Package ID ${packageId}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/packages/${packageId}`);
      alert(`Package ID ${packageId} deleted successfully!`);
      fetchPackages(); // Refresh the list after deletion
    } catch (error) {
      setError("Failed to delete package. Please try again later.");
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Package Portal</h2>
        <Link
          to="/create-package"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>Create Package
        </Link>
      </div>

      {loading ? (
        <p>Loading packages...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Package ID</th>
              <th className="border px-4 py-2">Package Type</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Available Seats</th>
              <th className="border px-4 py-2">Flight ID</th>
              <th className="border px-4 py-2">Hotel ID</th>
              <th className="border px-4 py-2">Operations</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.packageId}>
                <td className="border px-4 py-2">{pkg.packageId}</td>
                <td className="border px-4 py-2">{pkg.packageType}</td>
                <td className="border px-4 py-2">{pkg.destination}</td>
                <td className="border px-4 py-2">${pkg.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{pkg.availableSeats}</td>
                <td className="border px-4 py-2">{pkg.flightId}</td>
                <td className="border px-4 py-2">{pkg.hotelId}</td>
                <td className="border px-4 py-2 flex items-center">
                  <Link
                    to={`/edit-package/${pkg.packageId}`}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg.packageId)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PackagePortal;
