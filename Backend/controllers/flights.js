//controller folder
const flightServices = require('../services/flights'); // Import the flight services

// Add a new flight
module.exports.addFlight = async (req, res) => {
    try {
        const flightData = req.body; // Extract flight details from the request body
        const newFlight = await flightServices.addFlight(flightData); // Call the service to add the flight
        res.status(201).json({ success: true, data: newFlight }); // Respond with the created flight
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update a flight
module.exports.updateFlight = async (req, res) => {
    try {
        const { flightId } = req.params; // Extract flight ID from request params
        const updateData = req.body; // Extract updated data from request body
        const updatedFlight = await flightServices.updateFlight(flightId, updateData); // Call the service to update the flight
        res.status(200).json({ success: true, data: updatedFlight });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a flight
module.exports.deleteFlight = async (req, res) => {
    try {
        const { flightId } = req.params; // Extract flight ID from request params
        const deletedFlight = await flightServices.deleteFlight(flightId); // Call the service to delete the flight
        res.status(200).json({ success: true, data: deletedFlight });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all flights
module.exports.getAllFlights = async (req, res) => {
    try {
        const flights = await flightServices.getAllFlights(); // Call the service to retrieve all flights
        res.status(200).json({ success: true, data: flights });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.getflight = async (req, res) => {
    try {
        const flightId = req.params.flightId; // Get user email from the request parameters
        const user = await flightServices.getflight(flightId); // Call the service to retrieve the user profile
        res.send({ user }); // Return the user data
    } catch (err) {
        // Handle errors by sending a 404 Not Found status and the error message
        res.status(404).send({
            error: err.message
        });
    }
};