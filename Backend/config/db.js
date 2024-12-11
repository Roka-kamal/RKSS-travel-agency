const mongoose = require('mongoose');

const initiateDBConnection = async () => {
    try {
        // call connect() method in mongoose.
        // the method expects the connection URI which we stored as an environment variable.
        await mongoose.connect(process.env.MONGO_CONNECTION_URI);
        console.log('Connected to Mongo DB Server.');
    } catch (error) {
        console.log('Error connecting to databases:', error);
    }
};

// Make the function a default export
module.exports = initiateDBConnection;