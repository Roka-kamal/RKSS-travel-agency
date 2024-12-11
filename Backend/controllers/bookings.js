const bookingService = require('../services/bookings'); // Import the booking service

// Create a new booking
module.exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body; // Get the booking data from the request body
        const newBooking = await bookingService.createBooking(bookingData); // Call the service to create a new booking
        res.status(201).send({ booking: newBooking }); // Send the created booking as the response with a 201 status
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// Update an existing booking
module.exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId; // Get the booking ID from the request parameters
        const updateData = req.body; // Get the update data from the request body
        const updatedBooking = await bookingService.updateBooking(bookingId, updateData); // Call the service to update the booking
        res.send({ booking: updatedBooking }); // Send the updated booking as the response
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// Delete a booking
module.exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId; // Get the booking ID from the request parameters
        const deletedBooking = await bookingService.deleteBooking(bookingId); // Call the service to delete the booking
        res.send({ message: 'Booking deleted successfully', booking: deletedBooking }); // Send success message with the deleted booking
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// // Delete a booking
// module.exports.deleteBooking = async (req, res) => {
//     try {
//         const bookingId = req.params.bookingId; // Get the booking ID from the request parameters
//         const deletedBooking = await bookingService.deleteBooking(bookingId); // Call the service to delete the booking
//         res.send({ message: 'Booking deleted successfully', booking: deletedBooking }); // Send success message with the deleted booking
//     } catch (err) {
//         // Handle errors by sending a 500 server error with the error message
//         res.status(500).send({
//             error: err.message
//         });
//     }
// };

// View all bookings with related package details
module.exports.viewAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.viewAllBookings(); // Call the service to get all bookings
        res.send({ bookings }); // Send the bookings with related package info
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// View a specific booking by ID with its package details
module.exports.viewBookingById = async (req, res) => {
    try {
        const bookingId = req.params.bookingId; // Get the booking ID from the request parameters
        const bookingDetails = await bookingService.viewBookingById(bookingId); // Call the service to get booking by ID
        res.send({ booking: bookingDetails }); // Send the booking details with the related package
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// Get user details from booking
module.exports.getUserFromBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;  // Get booking ID from request parameters
        const user = await bookingService.getUserFromBooking(bookingId);  // Get user details from the service
        res.send({ user });  // Send user data as response
    } catch (err) {
        res.status(500).send({ error: err.message });  // Handle error
    }
};