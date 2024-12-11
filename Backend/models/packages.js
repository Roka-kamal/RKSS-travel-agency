const { Schema, model } = require('mongoose');

// Package schema
const packageSchema = new Schema({
    packageId: { 
        type: Number, 
        required: true 
    },
    packageType: { 
        type: String, 
        enum: ["Business", "Group", "Individual"],  
        required: true 
    },
    destination: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availableSeats: { // The admin will use this to specify how many seats/ rooms available
        type: Number, 
        required: true 
    },
    flightId: {
        type: Number, 
        required: true  
    },
    hotelId: {
        type: Number, 
        required: true  
    },
    imageUrl: {  
        type: String, 
        required: false, // Make it optional
    }
}, {
    timestamps: true, 
});

// Model for the package
const PackageModel = model('Package', packageSchema);

module.exports = PackageModel;
