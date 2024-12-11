//router folder
// Import the express Router
const { Router } = require('express');

// Import the bookingsController
const bookingsController = require('../controllers/bookings');

// Create an express Router object
const bookingRouter = Router();

// Defining the bookings routes
// GET all bookings with their package details
bookingRouter.get('/', bookingsController.viewAllBookings);

// GET a specific booking by its ID and its package details
bookingRouter.get('/:bookingId', bookingsController.viewBookingById);

// create a new booking
bookingRouter.post('/', bookingsController.createBooking);

// update an existing booking
bookingRouter.put('/:bookingId', bookingsController.updateBooking);


// delete a booking
bookingRouter.delete('/:bookingId', bookingsController.deleteBooking);

// Get user details from a booking by bookingId
bookingRouter.get('/:bookingId/user', bookingsController.getUserFromBooking);

// Exporting the router object
module.exports = bookingRouter;
