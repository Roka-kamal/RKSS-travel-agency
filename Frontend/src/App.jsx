import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlightsPortal from "./pages/FlightPortal";
import CreateFlight from "./pages/CreateFlights";
import HotelsPortal from "./pages/HotelPortal";
import CreateHotelOffer from "./pages/CreateHotelOffer";
import EditHotel from "./pages/EditHotel";
import TravelInsurancePortal from "./pages/TravelInsurancePortal"; // Import the new component
import Login from "./pages/Login"; // Import Login page
import Register from './pages/Register'; 
import PackagePortal from './pages/PackagePortal'; 
import CreatePackage from './pages/CreatePackage';
import EditPackage from './pages/EditPackage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage'; 
import DisplayBookings from './pages/DisplayBookings';  
import UpdateBooking from './pages/UpdateBooking';
import TravelInsurancePage from "./pages/TravelInsurancePage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Flights routes */}
        <Route path="/flights-portal" element={<FlightsPortal />} />
        <Route path="/create-flight" element={<CreateFlight />} />

        {/* Hotels routes */}
        <Route path="/hotel-portal" element={<HotelsPortal />} />
        <Route path="/create-hotel-offer" element={<CreateHotelOffer />} />
        <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />

        <Route path="/travel-insurance-portal" element={<TravelInsurancePortal />} /> 

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/package-portal" element={<PackagePortal />} />     
        <Route path="/create-package" element={<CreatePackage />} />   
        <Route path="/edit-package/:packageId" element={<EditPackage />} />
        <Route path="/booking/:packageId" element={<BookingPage />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/bookings" element={<DisplayBookings />} />
        <Route path="/update-booking/:bookingId" element={<UpdateBooking />} />
        <Route path="/travel-insurance" element={<TravelInsurancePage />} />
      </Routes>
    </Router>

  );
};

export default App;
