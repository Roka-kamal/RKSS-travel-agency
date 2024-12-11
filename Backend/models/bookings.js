//models folder
const {Schema, model} = require('mongoose');

// Booking schema
const bookingSchema = new Schema({
    bookingId:{
        type: Number,
        required: true,
    },
    customerEmail: {  //customerEmail
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date, // Booking date
        required: true,
    },
    status: {
        type: String,
        enum: ["Confirmed", "Cancelled"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid"],
        required: true,
    },
    packageId: { 
        type: Number,
        required: true, 
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Booking model
const BookingModel = model('Booking', bookingSchema);

module.exports = BookingModel;