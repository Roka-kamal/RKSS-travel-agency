import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState({
    bookingId: '',
    customerEmail: '',
    bookingDate: '',
    status: 'Confirmed',
    paymentStatus: 'Unpaid',
    packageId: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get booking from location state first
    if (location.state?.booking) {
      const booking = location.state.booking;
      const formattedDate = new Date(booking.bookingDate).toISOString().split('T')[0];
      setBookingData({
        bookingId: booking.bookingId,
        customerEmail: booking.customerEmail,
        bookingDate: formattedDate,
        status: booking.status || 'Confirmed',
        paymentStatus: booking.paymentStatus || 'Unpaid',
        packageId: booking.packageId
      });
      setLoading(false);
    } else {
      // Fallback to fetching booking data
      fetchBookingDetails();
    }
  }, [bookingId, location]);

  const fetchBookingDetails = async () => {
    try {
      console.log('Fetching booking details for ID:', bookingId);
      const response = await axios.get(`http://localhost:3000/bookings/${bookingId}`);
      console.log('Booking Response:', response.data);

      if (response.data && response.data.booking) {
        const booking = response.data.booking;
        const formattedDate = new Date(booking.bookingDate).toISOString().split('T')[0];
        
        setBookingData({
          bookingId: booking.bookingId,
          customerEmail: booking.customerEmail,
          bookingDate: formattedDate,
          status: booking.status || 'Confirmed',
          paymentStatus: booking.paymentStatus || 'Unpaid',
          packageId: booking.packageId
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setError('Failed to retrieve booking data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
        customerEmail: bookingData.customerEmail,
        bookingDate: bookingData.bookingDate,
        status: bookingData.status,
        paymentStatus: bookingData.paymentStatus,
        packageId: bookingData.packageId
      });

      console.log('Update response:', response.data);
      alert('Booking updated successfully');
      navigate('/bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking: ' + (error.response?.data?.error || error.message));
    }
  };
  const handleCancel = () => {
        navigate('/bookings');
      };
    
      if (loading) return <div className="text-center p-4">Loading...</div>;
      if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
    
      return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6">Update Booking #{bookingData.bookingId}</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
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
            <div className="mb-4">
              <label className="block mb-2">Status:</label>
              <select
                value={bookingData.status}
                onChange={(e) => setBookingData({...bookingData, status: e.target.value})}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Payment Status:</label>
              <select
                value={bookingData.paymentStatus}
                onChange={(e) => setBookingData({...bookingData, paymentStatus: e.target.value})}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      );

  //Rest of the component remains the same...
  //(Keep all the rendering logic and form JSX as it was)
};

export default UpdateBooking;






// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const UpdateBooking = () => {
//   const { bookingId } = useParams();
//   const navigate = useNavigate();
//   const [bookingData, setBookingData] = useState({
//     bookingId: '',
//     customerEmail: '',
//     bookingDate: '',
//     status: '',
//     paymentStatus: '',
//     packageId: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBookingDetails();
//   }, [bookingId]);

//   const fetchBookingDetails = async () => {
//     try {
//       console.log('Fetching booking details for ID:', bookingId); // Debug log
//       const response = await axios.get(`http://localhost:3000/bookings/${bookingId}`);
//       console.log('Response:', response.data); // Debug log

//       const booking = response.data.booking;
//       if (!booking) {
//         throw new Error('Booking data not found in response');
//       }

//       // Format the date to YYYY-MM-DD for the input field
//       const formattedDate = new Date(booking.bookingDate).toISOString().split('T')[0];

//       setBookingData({
//         bookingId: booking.bookingId,
//         customerEmail: booking.customerEmail,
//         bookingDate: formattedDate,
//         status: booking.status || 'Confirmed',
//         paymentStatus: booking.paymentStatus || 'Unpaid',
//         packageId: booking.packageId
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching booking details:', error);
//       setError('Failed to retrieve data from the database');
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Submitting update with data:', bookingData); // Debug log

//       const response = await axios.put(`http://localhost:3000/bookings/${bookingId}`, {
//         customerEmail: bookingData.customerEmail,
//         bookingDate: bookingData.bookingDate,
//         status: bookingData.status,
//         paymentStatus: bookingData.paymentStatus,
//         packageId: bookingData.packageId
//       });

//       console.log('Update response:', response.data); // Debug log
//       alert('Booking updated successfully');
//       navigate('/bookings');
//     } catch (error) {
//       console.error('Error updating booking:', error);
//       alert('Failed to update booking: ' + (error.response?.data?.error || error.message));
//     }
//   };

//   const handleCancel = () => {
//     navigate('/bookings');
//   };

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Update Booking #{bookingData.bookingId}</h2>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block mb-2">Email:</label>
//           <input
//             type="email"
//             value={bookingData.customerEmail}
//             onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Booking Date:</label>
//           <input
//             type="date"
//             value={bookingData.bookingDate}
//             onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Status:</label>
//           <select
//             value={bookingData.status}
//             onChange={(e) => setBookingData({...bookingData, status: e.target.value})}
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="Confirmed">Confirmed</option>
//             <option value="Cancelled">Cancelled</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Payment Status:</label>
//           <select
//             value={bookingData.paymentStatus}
//             onChange={(e) => setBookingData({...bookingData, paymentStatus: e.target.value})}
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="Paid">Paid</option>
//             <option value="Unpaid">Unpaid</option>
//           </select>
//         </div>
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateBooking;



// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';

// // // const UpdateBooking = () => {
// // //   const { bookingId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [bookingData, setBookingData] = useState({
// // //     customerEmail: '',
// // //     bookingDate: '',
// // //     status: '',
// // //     paymentStatus: ''
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     fetchBookingDetails();
// // //   }, [bookingId]);

// // //   const fetchBookingDetails = async () => {
// // //     try {
// // //       const response = await axios.get(`http://localhost:3000/bookings/${bookingId}`);
// // //       const booking = response.data.booking;
// // //       setBookingData({
// // //         customerEmail: booking.customerEmail,
// // //         bookingDate: booking.bookingDate.split('T')[0],
// // //         status: booking.status,
// // //         paymentStatus: booking.paymentStatus
// // //       });
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error('Error fetching booking details:', error);
// // //       setError('Failed to load booking details');
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.put(`http://localhost:3000/bookings/${bookingId}`, bookingData);
// // //       alert('Booking updated successfully');
// // //       navigate('/bookings');
// // //     } catch (error) {
// // //       console.error('Error updating booking:', error);
// // //       alert('Failed to update booking');
// // //     }
// // //   };

// // //   const handleCancel = () => {
// // //     navigate('/bookings');
// // //   };

// // //   if (loading) return <div className="text-center p-4">Loading...</div>;
// // //   if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

// // //   return (
// // //     <div className="container mx-auto p-4">
// // //       <h2 className="text-2xl font-bold mb-6">Update Booking</h2>
// // //       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
// // //         <div className="mb-4">
// // //           <label className="block mb-2">Email:</label>
// // //           <input
// // //             type="email"
// // //             value={bookingData.customerEmail}
// // //             onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
// // //             className="w-full border rounded px-3 py-2"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="mb-4">
// // //           <label className="block mb-2">Booking Date:</label>
// // //           <input
// // //             type="date"
// // //             value={bookingData.bookingDate}
// // //             onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
// // //             className="w-full border rounded px-3 py-2"
// // //             required
// // //           />
// // //         </div>
// // //         <div className="flex justify-between mt-6">
// // //           <button
// // //             type="button"
// // //             onClick={handleCancel}
// // //             className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
// // //           >
// // //             Cancel
// // //           </button>
// // //           <button
// // //             type="submit"
// // //             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
// // //           >
// // //             Update
// // //           </button>
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default UpdateBooking;