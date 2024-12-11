// Frontend/src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [bookingData, setBookingData] = useState({
    bookingId: Math.floor(Math.random() * 1000000),
    customerEmail: '',
    bookingDate: new Date().toISOString().split('T')[0],
    status: 'Confirmed',
    paymentStatus: 'Unpaid',
    packageId: packageId
  });

  useEffect(() => {
    fetchPackageDetails();
  }, [packageId]);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/packages/${packageId}`);
      setPackageDetails(response.data.package);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/bookings', bookingData);
      navigate(`/payment/${response.data.booking.bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking');
    }
  };

  if (!packageDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Package Information</h3>
          <p>Type: {packageDetails.packageType}</p>
          <p>Destination: {packageDetails.destination}</p>
          <p>Price: ${packageDetails.price}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={bookingData.customerEmail}
              onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Booking Date:</label>
            <input
              type="date"
              value={bookingData.bookingDate}
              onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;