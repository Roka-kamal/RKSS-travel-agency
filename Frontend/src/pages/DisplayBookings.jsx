import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisplayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/bookings');
      console.log('Fetched bookings:', response.data);
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
      setLoading(false);
    }
  };

  const handleUpdate = (booking) => {
    console.log('Updating booking:', booking); // Debug log
    navigate(`/update-booking/${booking.bookingId}`, { state: { booking } });
  };

  const handleDelete = async (bookingId, customerEmail) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
        setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
        alert('Booking cancelled successfully');
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading bookings...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Booking {booking.bookingId}</h3>
            <div className="mb-4">
              <p><strong>Customer Email:</strong> {booking.customerEmail}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
              <p><strong>Package ID:</strong> {booking.packageId}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleUpdate(booking)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(booking.bookingId, booking.customerEmail)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayBookings;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DisplayBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/bookings');
//       setBookings(response.data.bookings);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       setError('Failed to load bookings');
//       setLoading(false);
//     }
//   };

//   const handleUpdate = (bookingId) => {
//     console.log('Navigating to update booking:', bookingId);
//     navigate(`/update-booking/${bookingId}`);
//   };

//   const handleDelete = async (bookingId, customerEmail) => {
//     if (window.confirm('Are you sure you want to cancel this booking?')) {
//       try {
//         await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
//         // Remove the booking from the state
//         setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
//         alert('Booking cancelled successfully');
//       } catch (error) {
//         console.error('Error deleting booking:', error);
//         alert('Failed to cancel booking');
//       }
//     }
//   };

//   if (loading) return <div className="text-center p-4">Loading bookings...</div>;
//   if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bookings.map((booking) => (
//           <div key={booking.bookingId} className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-xl font-semibold mb-2">Booking #{booking.bookingId}</h3>
//             <div className="mb-4">
//               <p><strong>Customer Email:</strong> {booking.customerEmail}</p>
//               <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> {booking.status}</p>
//               <p><strong>Payment Status:</strong> {booking.paymentStatus}</p>
//             </div>
//             <div className="flex justify-between">
//               <button
//                 onClick={() => handleUpdate(booking.bookingId)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => handleDelete(booking.bookingId, booking.customerEmail)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DisplayBookings;