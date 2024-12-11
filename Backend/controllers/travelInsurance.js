const travelInsuranceService = require('../services/travelInsurance');

module.exports.getInsurances = async (req, res) => {
    try {
        const insurances = await travelInsuranceService.getTravelInsurance();
        return res.send({ insurances });
    } catch (err) {
      // this denotes a server error, therefore status code should be 500.
      res.status(500);
      return res.send({
        error: err.message
      });
    }
  };


  module.exports.createInsurance = async (req, res) => {
    try{
        const insurance = await travelInsuranceService.addTravelInsurance(req.body);
        res.status(201).json(insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };


module.exports.updateInsurance = async (req, res) => {
    try {
        const providerName = req.params.providerName;
        const updatedInsurance = await travelInsuranceService.updateTravelInsurance(providerName, req.body);
        return res.send(updatedInsurance);
    } catch (err) {
        res.status(500);
        return res.send({
            error: err.message,
        });
    }
};

  module.exports.removeInsurance = async (req, res) => {
    try {
        const providerName = req.params.providerName;
        const removedInsurance = await travelInsuranceService.removeTravelInsurance(providerName);
        return res.send({
            msg: 'Insurance deleted successfully.'
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
        }
 };
  