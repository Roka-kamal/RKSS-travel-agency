const express = require('express');
const dotenv = require('dotenv');
const initiateDBConnection = require('./config/db');
const cors = require('cors');


const userRouter = require('./routes/user');
const packagesRouter = require('./routes/packages');
const flightRouter = require('./routes/flights');
const hotelOffersRouter = require('./routes/hotelOffers');
const travelInsuranceRouter = require('./routes/travelInsurance');
const bookingsRouter = require('./routes/bookings');
const paymentRouter = require('./routes/payment');

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Define the port from environment variables with a fallback
const PORT = process.env.PORT;
// Create an Express application
const app = express();


// Middleware to parse JSON requests
app.use(express.json({ limit: "10mb" })); // Set payload limit to 10 MB
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // For form-urlencoded data
app.use(cors());

// Set up routes
app.use('/user', userRouter);
app.use('/packages', packagesRouter);
app.use('/flights', flightRouter);
app.use('/hotel-offers', hotelOffersRouter);
app.use('/travel-insurance', travelInsuranceRouter);
app.use('/bookings', bookingsRouter);
app.use('/payments', paymentRouter);

// Start the server and initialize the database connection
app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        await initiateDBConnection();
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit with an error if DB connection fails
    }
});