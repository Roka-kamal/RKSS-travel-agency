const paymentService = require('../services/payment'); // Import Payment service
const userService = require('../services/users'); // Import User service

// Controller to create a new payment
module.exports.createPayment = async (req, res) => {
  try {
      const paymentData = req.body; // { amount, customerEmail, paymentMethod }
      const newPayment = await paymentService.createPayment(paymentData);
      res.status(201).send({ message: 'Payment created successfully', payment: newPayment });
  } catch (err) {
      res.status(400).send({ error: err.message });
  }
};
// Controller to confirm a payment
module.exports.confirmPayment = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const payment = await paymentService.confirmPayment(paymentIntentId);
    res.status(200).send({
      message: 'Payment confirmed successfully',
      payment,
    });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};

// Controller to get all payments
module.exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.findAllPayments();
    res.status(200).send({ payments });
  } catch (err) {
    res.status(500).send({ error: err.message }); // Server error
  }
};





// Controller to update payment status
module.exports.updatePaymentStatus = async (req, res) => {
  try {
      const { paymentId } = req.params;
      const { status } = req.body; // { status: 'Completed' }
      const updatedPayment = await paymentService.updatePaymentStatus(paymentId, status);
      res.send({ message: 'Payment status updated', payment: updatedPayment });
  } catch (err) {
      res.status(400).send({ error: err.message });
  }
};