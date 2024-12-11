//services
const FlightModel = require('../models/flights'); // Import the Flight model

// Add a new flight
module.exports.addFlight = async (flightData) => {
    try {
        const newFlight = new FlightModel(flightData); // Create a new flight
        await newFlight.save(); // Save the flight to the database
        return newFlight;
    } catch (err) {
        throw new Error(`Could not add flight: ${err.message}`);
    }
};

// Update a flight
module.exports.updateFlight = async (flightId, updateData) => {
    try {
        const updatedFlight = await FlightModel.findByIdAndUpdate(flightId, updateData, { new: true }); // Update flight details
        if (!updatedFlight) {
            throw new Error('Flight not found');
        }
        return updatedFlight;
    } catch (err) {
        throw new Error(`Could not update flight: ${err.message}`);
    }
};

// Delete a flight
module.exports.deleteFlight = async (flightId) => {
    try {
        const deletedFlight = await FlightModel.findByIdAndDelete(flightId); // Delete the flight
        if (!deletedFlight) {
            throw new Error('Flight not found');
        }
        return deletedFlight;
    } catch (err) {
        throw new Error(`Could not delete flight: ${err.message}`);
    }
};

// Get all flights
module.exports.getAllFlights = async () => {
    try {
        const flights = await FlightModel.find(); // Retrieve all flights from the database
        return flights;
    } catch (err) {
        throw new Error(`Could not fetch flights: ${err.message}`);
    }
};


module.exports.getflight = async (flightId) => {
    try {
        const user = await FlightModel.findOne({ flightId: flightId });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error('Could not retrieve user: ' + err.message);
    }
};




// const FlightModel = require('../models/flights'); // Import the flight model

// // Service to add a new flight
// module.exports.addFlight = async (flightData) => {
//     const newFlight = new FlightModel(flightData);
//     return await newFlight.save(); // Save the new flight to the database
// };

// // Service to delete a flight by ID
// module.exports.deleteFlight = async (flightId) => {
//     return await FlightModel.findOneAndDelete({ flightId }); // Find and delete the flight by its flightId
// };

// // Service to update flight details
// module.exports.updateFlight = async (flightId, updateData) => {
//     return await FlightModel.findOneAndUpdate({ flightId }, updateData, { new: true }); // Update and return the updated flight
// };

// // Service to get all flights
// module.exports.getAllFlights = async () => {
//     return await FlightModel.find(); // Retrieve all flights from the database
// };

// // Service to get a single flight by ID
// module.exports.getFlightById = async (flightId) => {
//     return await FlightModel.findOne({ flightId }); // Find a flight by its flightId
// };
