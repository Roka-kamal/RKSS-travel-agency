const {Schema, model} = require('mongoose');


const HotelOfferSchema = new Schema({
    hotelId: { 
        type: Number, 
        required: true 
    },
    hotelName: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    pricePerNight: { 
        type: Number, 
        required: true 
    },
    availableRooms: { //the admin will update this value
        type: Number, 
        required: true,
        default: 0
    },
    image:{ 
        type: String // to store the URL of the hotel images (set by Admin)
    }
    }, {
    timestamps: true,
});

const HotelOffersModel = model('HotelOffers', HotelOfferSchema)
module.exports = HotelOffersModel





// hotelName: {
//     type: String,
//     required: true
// },

// location: {
//     type: String,
//     required: true
// },

// starRating: {
//     type: Number,
//     min: 1,
//     max: 5,
//   },

// pricePerNight: {
//     type: Number,
//     required: true
// },

// amenities: {
//     type: String,
//     required: true
// },

// availableRooms: {
//     type: Number,
//     required: true
// },

// availableDates: {
//     type: [Date],
//     required: true
// }