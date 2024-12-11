const { Schema, model } = require('mongoose');

const TravelInsuranceSchema = new Schema({
    providerName: {
        type: String,
        required: true
    },

    coverageAmount: {
        type: Number, 
        required: true,
      },


    coverageDetails: {
        type: String,
        required: true
    },

    insurancePrice: {
        type: Number,
        required: true
    }

})

const TravelInsuranceModel = model('TravelInsurance', TravelInsuranceSchema);
module.exports = TravelInsuranceModel