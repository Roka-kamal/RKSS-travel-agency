const { Router } = require('express');

const travelInsuranceControllers = require('../controllers/travelInsurance');


// create an instance of Express Router.
const travelInsuranceRouter = Router();

travelInsuranceRouter.get('/', travelInsuranceControllers.getInsurances);
travelInsuranceRouter.post('/', travelInsuranceControllers.createInsurance);
travelInsuranceRouter.put('/:providerName', travelInsuranceControllers.updateInsurance); 
travelInsuranceRouter.delete('/:providerName', travelInsuranceControllers.removeInsurance);


module.exports = travelInsuranceRouter;