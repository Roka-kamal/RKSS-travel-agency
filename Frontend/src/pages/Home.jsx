// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:3000/packages");
//       console.log('API Response:', response.data); // Debug log
//       if (response.data && Array.isArray(response.data.packages)) {
//         setPackages(response.data.packages);
//       } else {
//         setError('Invalid data format received from server');
//       }
//     } catch (error) {
//       console.error("Error fetching packages:", error);
//       setError('Failed to load packages. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookNow = (packageId) => {
//     navigate(`/booking/${packageId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navigation Bar */}
//       <nav className="bg-gray-800 text-white p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Travel Agency</h1>
//           <div className="space-x-4">
//             <Link
//               to="/flights-portal"
//               className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
//             >
//               Flights Portal
//             </Link>
//             <Link
//               to="/hotel-portal"
//               className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
//             >
//               Hotels Portal
//             </Link>
//             <Link
//               to="/package-portal"
//               className="text-lg px-4 py-2 bg-purple-500 rounded hover:bg-purple-600"
//             >
//               Package Portal
//             </Link>
//             <Link
//               to="/travel-insurance-portal"
//               className="text-lg px-4 py-2 bg-green-500 rounded hover:bg-green-600"
//             >
//               Travel Insurance Portal
//             </Link>
//             <Link
//               to="/login"
//               className="text-lg px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-8">
//         <h2 className="text-3xl font-bold mb-8 text-center">Available Travel Packages</h2>

//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-8">
//             <p className="text-xl">Loading packages...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center py-8">
//             <p className="text-xl text-red-500">{error}</p>
//           </div>
//         )}

//         {/* No Packages State */}
//         {!loading && !error && packages.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-xl">No packages available at the moment.</p>
//           </div>
//         )}

//         {/* Packages Grid */}
//         {!loading && !error && packages.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {packages.map((pkg) => (
//               <div 
//                 key={pkg.packageId} 
//                 className="bg-white rounded-lg shadow-lg overflow-hidden"
//               >
//                 <img
//                   src={pkg.imageUrl || 'https://via.placeholder.com/400x200'}
//                   alt={pkg.packageType}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-2">{pkg.packageType}</h3>
//                   <p className="text-gray-600 mb-2">{pkg.destination}</p>
//                   <p className="text-sm text-gray-500 mb-4">{pkg.description





// // import React from "react";
// // import { Link } from "react-router-dom";


// // const Home = () => {
// //   return (
// //     <div className="bg-gray-800 text-white p-4">
// //       <nav className="flex justify-between items-center">
// //         <h1 className="text-2xl font-bold">Travel Agency</h1>
// //         <div>
// //           <Link
// //             to="/flights-portal"
// //             className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
// //           >
// //             Flights Portal
// //           </Link>
// //           <Link
// //             to="/hotel-portal"
// //             className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 ml-4"
// //           >
// //             Hotels Portal
// //           </Link>
// //           <Link
// //             to="/package-portal"
// //             className="text-lg px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 ml-4"
// //           >
// //             Package Portal
// //           </Link>
          
// //           <Link
// //             to="/travel-insurance-portal"
// //             className="text-lg px-4 py-2 bg-green-500 rounded hover:bg-green-600 ml-4"
// //           >
// //             Travel Insurance Portal
// //           </Link>
// //           <Link
// //             to="/login"
// //             className="text-lg px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 ml-4"
// //           >
// //             Login
// //           </Link>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Home;

// Frontend/src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/packages");
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handleBookNow = (packageId) => {
    navigate(`/booking/${packageId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Travel Agency</h1>
          <div>
            <Link
              to="/flights-portal"
              className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Flights Portal
            </Link>
            <Link
              to="/hotel-portal"
              className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 ml-4"
            >
              Hotels Portal
            </Link>
            <Link
              to="/package-portal"
              className="text-lg px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 ml-4"
            >
              Package Portal
            </Link>
            <Link
              to="/travel-insurance-portal"
              className="text-lg px-4 py-2 bg-green-500 rounded hover:bg-green-600 ml-4"
            >
              Travel Insurance Portal
            </Link>
            <Link
              to="/login"
              className="text-lg px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 ml-4"
            >
              Login
            </Link>
            <Link
            to="/bookings"
            className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Bookings
            </Link>
            <Link to= "/travel-insurance"
            className="text-lg px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Travel Insurance
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Travel Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.packageId} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={pkg.imageUrl || 'default-package-image.jpg'}
                alt={pkg.packageType}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.packageType}</h3>
                <p className="text-gray-600 mb-2">{pkg.destination}</p>
                <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                  <button
                    onClick={() => handleBookNow(pkg.packageId)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Book Now
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Available Seats: {pkg.availableSeats}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;