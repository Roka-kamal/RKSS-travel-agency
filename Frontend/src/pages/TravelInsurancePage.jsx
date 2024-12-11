import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/TravelInsurance.css';

const TravelInsurancePage = () => {
  const [insurances, setInsurances] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/travel-insurance')
      .then((response) => response.json())
      .then((data) => setInsurances(data.insurances))
      .catch((error) => console.error('Error fetching insurances:', error));
  }, []);

  const handlePurchase = () => {
    if (selectedInsurance) {
      // Redirect to the payment page
      navigate('/payment/:bookingId');
    } else {
      alert('Please select an insurance plan before purchasing.');
    }
  };

  return (
    <div className="insurance-page">
      <h1 className="insurance-title">Choose Your Travel Insurance Plan</h1>
      <div className="insurance-list">
        {insurances.map((insurance) => (
          <div
            key={insurance._id}
            className={`insurance-card ${selectedInsurance?.providerName === insurance.providerName ? 'selected' : ''}`}
            onClick={() => setSelectedInsurance(insurance)}
          >
            <h2 className="insurance-name">{insurance.providerName}</h2>
            <p>Coverage Amount: ${insurance.coverageAmount}</p>
            <p>Details: {insurance.coverageDetails}</p>
            <p className="price">Price: ${insurance.insurancePrice}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePurchase} className="purchase-button">
        Purchase Plan
      </button>
    </div>
  );
};

export default TravelInsurancePage;
