//routes
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flights'); // Import the flight controller

// Routes for flight management
router.post('/', flightController.addFlight); // Route to add a new flight
router.put('/:flightId', flightController.updateFlight); // Route to update flight details
router.delete('/:flightId', flightController.deleteFlight); // Route to delete a flight
router.get('/', flightController.getAllFlights); // Route to get all flights
router.get('/:flightId', flightController.getflight);

module.exports = router;
