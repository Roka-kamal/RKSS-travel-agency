const TravelInsurance = require('../models/TravelInsurance');


module.exports.getTravelInsurance = async () => {
    try{
        const Insurance = await TravelInsurance.find();
        return Insurance;
    } catch (error) {
        throw new Error('Error finding travel insurance services');
    }
};


module.exports.addTravelInsurance = async (data) => {
    try {
        const newInsurance = new TravelInsurance(data);
        return await newInsurance.save();
    } catch (error) {
        throw new Error ('Error adding travel insurance');
    }
};
module.exports.updateTravelInsurance = async (providerName, data) => {
    try {
        const updatedInsurance = await TravelInsurance.findOneAndUpdate(
            { providerName }, // Find by providerName
            data, // New data to update
            { new: true, runValidators: true } // Options to return the updated document and run validations
        );
        if (!updatedInsurance) {
            throw new Error('Travel insurance offer not found');
        }
        return updatedInsurance;
    } catch (error) {
        throw new Error('Error updating travel insurance offer');
    }
};

module.exports.removeTravelInsurance = async (providerName) => {
    try {
        const removedInsurance = await TravelInsurance.findOneAndDelete({ providerName });
        if (!removedInsurance) {
            throw new Error('Travel insurance offer not found');
        }
        return removedInsurance;
    } catch (error) {
        throw new Error('Error removing travel insurance offer');
    }
}
