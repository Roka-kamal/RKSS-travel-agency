const BookingModel = require('../models/bookings');
const userModel=require('../models/user');
const PackageModel = require('../models/packages');  // Import the Package model
const emailService=require('../services/emailService')

// Create a new booking with user email
module.exports.createBooking = async (bookingData) => {
    try {
        const { customerEmail, packageId } = bookingData;

        // Step 1: Check if the user exists by email
        const user = await userModel.findOne({ email: customerEmail });  // Retrieve user by email
        if (!user) {
            throw new Error('User not found with the provided email');
        }

        // Step 2: Check if the package exists by packageId
        const package = await PackageModel.findOne({ packageId: packageId });  // Retrieve package by packageId
        if (!package) {
            throw new Error('Package not found with the provided packageId');
        }

        const newBooking = new BookingModel(bookingData);  // Create new booking with email
        await newBooking.save();  // Save the booking to the database

        const emailContent = `
        Your Booking has Been successfully added,<br>
        
        Your booking details:<br>
        
        - ID: ${newBooking.bookingId}<br>
        - Date: ${newBooking.bookingDate} <br>
        - Status: ${newBooking.status}<br>
        - Package ID: ${newBooking.packageId} <br>
        - Payment Status: ${newBooking.paymentStatus}<br><br>
        
        Thank you for being part of our platform.
    `;

    await emailService.sendEmail(
        user.email,
        "Booking Confirmation",
        emailContent
    );
        return newBooking;

    } catch (err) {
        throw new Error(`Could not create booking: ${err.message}`);
    }
};

// Update a booking
module.exports.updateBooking = async (bookingId, updateData) => {
    try {
        // Use findOneAndUpdate() instead of findByIdAndUpdate()
        const updatedBooking = await BookingModel.findOneAndUpdate(
            { bookingId: bookingId }, // Query by bookingId
            updateData, 
            { new: true } // Return the updated booking
        );

        if (!updatedBooking) {
            throw new Error('Booking not found');
        }

        // Sending email notification
        const emailContent = `
        Your Booking has been successfully updated,<br>
        
        Your booking details:<br>
        
        - ID: ${updatedBooking.bookingId}<br>
        - Date: ${updatedBooking.bookingDate} <br>
        - Status: ${updatedBooking.status}<br>
        - Package ID: ${updatedBooking.packageId} <br>
        - Payment Status: ${updatedBooking.paymentStatus}<br><br>
        
        Thank you for being part of our platform.
        `;

        // Send the email to the user (get the user email from the booking's customerEmail)
        await emailService.sendEmail(
            updatedBooking.customerEmail, // Assuming you want to send the email to the customer email stored in the booking
            "Booking Updated",
            emailContent
        );

        return updatedBooking;
    } catch (err) {
        throw new Error(`Could not update booking: ${err.message}`);
    }
};
// Delete a booking
module.exports.deleteBooking = async (bookingId) => {
    try {
        const deletedBooking = await BookingModel.findOneAndDelete({ bookingId:bookingId }); // Delete by bookingId
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }
                // Sending email notification
                const emailContent = `
                Your Booking is canceled,<br>
                
                Your booking details:<br>
                
                - ID: ${deletedBooking.bookingId}<br>
                - Date: ${deletedBooking.bookingDate} <br>
                
                - Package ID: ${deletedBooking.packageId} <br>
                - Payment Status: ${deletedBooking.paymentStatus}<br><br>
                
                Thank you for being part of our platform.
                `;
        
                // Send the email to the user (get the user email from the booking's customerEmail)
                await emailService.sendEmail(
                    deletedBooking.customerEmail, // Assuming you want to send the email to the customer email stored in the booking
                    "Booking Updated",
                    emailContent
                );
        return deletedBooking;
    } catch (err) {
        throw new Error(`Could not delete booking: ${err.message}`);
    }
};

// // Delete a booking
// module.exports.deleteBooking = async (bookingId) => {
//     try {
//         const deletedBooking = await BookingModel.findOneAndDelete({ bookingId:bookingId }); // Delete by bookingId
//         if (!deletedBooking) {
//             throw new Error('Booking not found');
//         }
//         return deletedBooking;
//     } catch (err) {
//         throw new Error(`Could not delete booking: ${err.message}`);
//     }
// };


// // Delete a booking
// module.exports.deleteBooking = async (bookingId) => {
//     try {
//         const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
//         if (!deletedBooking) {
//             throw new Error('Booking not found');
//         }
//         return deletedBooking;
//     } catch (err) {
//         throw new Error(`Could not delete booking: ${err.message}`);
//     }
// };

// Service to view all bookings with related package details
module.exports.viewAllBookings = async () => {
    try {
        const bookings = await BookingModel.find();

        // Fetch related package details for each booking
        const bookingsWithPackageDetails = await Promise.all(
            bookings.map(async (booking) => {
                const package = await PackageModel.findOne({ packageId: booking.packageId });  // Fetch package details using packageId

                return {
                    ...booking.toObject(),  // Convert booking to plain object
                    package,  // Add package details
                };
            })
        );

        return bookingsWithPackageDetails;
    } catch (err) {
        throw new Error('Could not retrieve bookings: ' + err.message);
    }
};

//to view a specific booking by ID with its package details
module.exports.viewBookingById = async (bookingId) => {
    try {
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Fetch related package details
        const package = await PackageModel.findOne({ packageId: booking.packageId });

        return {
            ...booking.toObject(),
            package, // Attach package details
        };
    } catch (err) {
        throw new Error('Could not retrieve the booking: ' + err.message);
    }
};

// Service to get user details from a booking
module.exports.getUserFromBooking = async (bookingId) => {
    try {
        // Query using bookingId
        const booking = await BookingModel.findOne({ bookingId: bookingId });  // Use bookingId for query
        if (!booking) {
            throw new Error('Booking not found');
        }

        const user = await userModel.findOne({ email: booking.customerEmail });  // Retrieve user by email from the booking
        if (!user) {
            throw new Error('User not found for this booking');
        }

        return user;  // Return user details
    } catch (err) {
        throw new Error(`Could not retrieve user details from booking: ${err.message}`);
    }
};