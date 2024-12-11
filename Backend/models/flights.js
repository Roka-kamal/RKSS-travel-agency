const { Schema, model } = require('mongoose');

// Flight schema
const flightSchema = new Schema({
    flightId: { 
        type: Number, 
        required: true 
    },
    airline: { 
        type: String, 
        required: true 
    },
    departure: { 
        type: String, 
        required: true 
    },
    arrival: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    flightType: { 
        type: String, 
        enum: ["One-way", "Round-trip"], 
        required: true 
    }
}, {
    timestamps: true, 
});

// the model of the flight
const FlightModel = model('Flight', flightSchema);

module.exports = FlightModel;
