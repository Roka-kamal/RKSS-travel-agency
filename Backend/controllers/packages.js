const packageService = require('../services/packages'); // Import the package service

// Create a new travel package
module.exports.createPackage = async (req, res) => {
    try {
        const packageData = req.body; // Get the package data from the request body
        const newPackage = await packageService.createPackage(packageData); // Call the service to create a new package
        res.status(201).send({ package: newPackage }); // Send the created package as the response with a 201 status
    } catch (err) {
        res.status(400).send({
            error: err.message // Changed status to 400 for validation errors
        });
    }
};


// Update an existing travel package
module.exports.updatePackage = async (req, res) => {
    try {
        const packageId = req.params.id; // Get the package ID from the request parameters
        const updateData = req.body; // Get the update data from the request body
        const updatedPackage = await packageService.updatePackage(packageId, updateData); // Call the service to update the package
        res.send({ package: updatedPackage }); // Send the updated package as the response
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// Delete a travel package
module.exports.deletePackage = async (req, res) => {
    try {
        const packageId = req.params.id; // Get the package ID from the request parameters
        const deletedPackage = await packageService.deletePackage(packageId); // Call the service to delete the package
        res.send({ message: 'Package deleted successfully', package: deletedPackage }); // Send success message with the deleted package
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};


// View all packages with flight and hotel details
module.exports.viewAllPackages = async (req, res) => {
    try {
        const packages = await packageService.viewAllPackages(); // Call the service to get all packages
        res.send({ packages }); // Send the packages with detailed flight and hotel info
    } catch (err) {
        // Handle errors by sending a 500 server error with the error message
        res.status(500).send({
            error: err.message
        });
    }
};

// View a specific package by ID with flight and hotel details
module.exports.viewPackageById = async (req, res) => {
    try {
        const packageId = req.params.id; // Get the `packageId` from the request parameters
        const packageDetails = await packageService.viewPackageById(packageId); // Use the updated service
        res.send({ package: packageDetails }); // Send the package details with flight and hotel info
    } catch (err) {
        res.status(500).send({
            error: err.message // Handle errors and send an appropriate response
        });
    }
};

