const { Router } = require('express');

const hotelOffersControllers = require('../controllers/hotelOffers');

// create an instance of Express Router.
const hotelOffersRouter = Router();

hotelOffersRouter.get('/', hotelOffersControllers.getOffers);
hotelOffersRouter.post('/', hotelOffersControllers.createOffer);
hotelOffersRouter.delete('/:hotelId', hotelOffersControllers.removeOffer);
hotelOffersRouter.put('/:hotelId', hotelOffersControllers.updateHotelOffer);


module.exports = hotelOffersRouter;