// Import Express Router
const { Router } = require('express');

// Import the packagesController
const packagesController = require('../controllers/packages');

// Create an instance of Express Router
const packageRouter = Router();

// Define routes for packages

// GET all packages with flight and hotel details
packageRouter.get('/', packagesController.viewAllPackages);

// GET a specific package by ID with flight and hotel details
packageRouter.get('/:id', packagesController.viewPackageById);

// POST (create) a new package
packageRouter.post('/', packagesController.createPackage);

// PUT (update) an existing package
packageRouter.put('/:id', packagesController.updatePackage);

// DELETE a package
packageRouter.delete('/:id', packagesController.deletePackage);

// Export the router instance
module.exports = packageRouter;
