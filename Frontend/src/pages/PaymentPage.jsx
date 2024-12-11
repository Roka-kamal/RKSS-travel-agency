// Frontend/src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    paymentId: Math.floor(Math.random() * 1000000),
    bookingId: bookingId,
    customerEmail: '',
    amount: '',
    currency: 'USD',
    status: 'pending'
  });


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Submitting payment:', paymentData); // Add this for debugging
      
//       // Create payment
//       const paymentResponse = await axios.post('http://localhost:3000/payments', paymentData);
//       console.log('Payment response:', paymentResponse.data); // Add this for debugging
      
//       // Update booking payment status
//       await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
//         paymentStatus: 'Paid'
//       });
  
//       alert('Payment successful! Check your email for confirmation.');
//       navigate('/');
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       alert(error.response?.data?.error || 'Payment failed');
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create payment
      await axios.post('http://localhost:3000/payments', paymentData);
      
      // Update booking payment status
      await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
        paymentStatus: 'Paid'
      });

      alert('Payment successful! Check your email for confirmation.');
      navigate('/');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={paymentData.customerEmail}
            onChange={(e) => setPaymentData({...paymentData, customerEmail: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount:</label>
          <input
            type="number"
            value={paymentData.amount}
            onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;