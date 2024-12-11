import React, { useState, useEffect } from "react";
import axios from "axios";

const TravelInsurancePortal = () => {
  const [insurances, setInsurances] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // To track the currently edited row
  const [newInsurance, setNewInsurance] = useState(null); // To manage the new row

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      const response = await axios.get("http://localhost:3000/travel-insurance");
      setInsurances(response.data.insurances);
    } catch (error) {
      console.error("Error fetching insurances:", error);
    }
  };

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleSave = async (index) => {
    const updatedInsurance = insurances[index];
    try {
      await axios.put(
        `http://localhost:3000/travel-insurance/${encodeURIComponent(
          updatedInsurance.providerName
        )}`,
        updatedInsurance
      );
      setIsEditing(null);
      fetchInsurances();
    } catch (error) {
      console.error("Error updating insurance:", error);
      alert("An error occurred while updating the insurance.");
    }
  };

  const handleDelete = async (providerName) => {
    try {
      await axios.delete(
        `http://localhost:3000/travel-insurance/${encodeURIComponent(
          providerName
        )}`
      );
      fetchInsurances();
    } catch (error) {
      console.error("Error deleting insurance:", error);
      alert("An error occurred while deleting the insurance.");
    }
  };

  const handleAddRow = () => {
    setNewInsurance({
      providerName: "",
      coverageAmount: "",
      coverageDetails: "",
      insurancePrice: "",
    });
  };

  const handleNewInsuranceSave = async () => {
    try {
      await axios.post("http://localhost:3000/travel-insurance", newInsurance);
      setNewInsurance(null);
      fetchInsurances();
    } catch (error) {
      console.error("Error adding new insurance:", error);
      alert("An error occurred while adding the insurance.");
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedInsurances = [...insurances];
    updatedInsurances[index][field] = value;
    setInsurances(updatedInsurances);
  };

  const handleNewInputChange = (field, value) => {
    setNewInsurance((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Travel Insurance Portal</h2>
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">+</span>Create Insurance
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Provider Name</th>
            <th className="border px-4 py-2">Coverage Amount</th>
            <th className="border px-4 py-2">Coverage Details</th>
            <th className="border px-4 py-2">Insurance Price</th>
            <th className="border px-4 py-2">Operations</th>
          </tr>
        </thead>
        <tbody>
          {insurances.map((insurance, index) => (
            <tr key={insurance.providerName}>
              <td className="border px-4 py-2">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={insurance.providerName}
                    onChange={(e) =>
                      handleInputChange(index, "providerName", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  insurance.providerName
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing === index ? (
                  <input
                    type="number"
                    value={insurance.coverageAmount}
                    onChange={(e) =>
                      handleInputChange(index, "coverageAmount", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  `$${insurance.coverageAmount}`
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={insurance.coverageDetails}
                    onChange={(e) =>
                      handleInputChange(index, "coverageDetails", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  insurance.coverageDetails
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing === index ? (
                  <input
                    type="number"
                    value={insurance.insurancePrice}
                    onChange={(e) =>
                      handleInputChange(index, "insurancePrice", e.target.value)
                    }
                    className="w-full border px-2 py-1"
                  />
                ) : (
                  `$${insurance.insurancePrice}`
                )}
              </td>
              <td className="border px-4 py-2 flex items-center">
                {isEditing === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => handleDelete(insurance.providerName)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
          {newInsurance && (
            <tr>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={newInsurance.providerName}
                  onChange={(e) =>
                    handleNewInputChange("providerName", e.target.value)
                  }
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={newInsurance.coverageAmount}
                  onChange={(e) =>
                    handleNewInputChange("coverageAmount", e.target.value)
                  }
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={newInsurance.coverageDetails}
                  onChange={(e) =>
                    handleNewInputChange("coverageDetails", e.target.value)
                  }
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={newInsurance.insurancePrice}
                  onChange={(e) =>
                    handleNewInputChange("insurancePrice", e.target.value)
                  }
                  className="w-full border px-2 py-1"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={handleNewInsuranceSave}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TravelInsurancePortal;
