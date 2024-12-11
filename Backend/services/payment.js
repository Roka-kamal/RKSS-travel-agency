require('dotenv').config({ path: './.env' });

const PaymentModel = require('../models/Payment'); // Import the Payment model
const userModel = require('../models/user'); // Import the User model
const emailService = require('../services/emailService');



module.exports.createPayment = async (paymentData) => {
  try {
      const { customerEmail, amount, paymentMethod } = paymentData;

      // Step 1: Validate the user by email
      const user = await userModel.findOne({ email: customerEmail });
      if (!user) {
          throw new Error('User not found with the provided email');
      }

      // Step 2: Create a new payment record
      const newPayment = new PaymentModel(paymentData);
      await newPayment.save();

      // Step 3: Send email confirmation
      const emailContent = `
          Your payment has been successfully processed.<br>
          Details:<br>
          - Amount: ${amount} <br>
          - Method: ${paymentMethod} <br>
          - Status: ${newPayment.status} <br>
          - Payment Date: ${newPayment.paymentDate} <br><br>
          Thank you for choosing our platform.
      `;
      await emailService.sendEmail(
          customerEmail,
          "Payment Confirmation",
          emailContent
      );

      return newPayment;
  } catch (err) {
      throw new Error(`Could not create payment: ${err.message}`);
  }
};


module.exports.updatePaymentStatus = async (paymentId, status) => {
  try {
      // Update payment status
      const updatedPayment = await PaymentModel.findOneAndUpdate(
          { paymentId: paymentId },
          { status },
          { new: true }
      );

      if (!updatedPayment) {
          throw new Error('Payment not found');
      }

      // Send email notification
      const emailContent = `
          Your payment status has been updated.<br>
          New Status: ${status} <br><br>
          Thank you for choosing our platform.
      `;
      await emailService.sendEmail(
          updatedPayment.customerEmail,
          "Payment Status Updated",
          emailContent
      );

      return updatedPayment;
  } catch (err) {
      throw new Error(`Could not update payment status: ${err.message}`);
  }
};



// Service to find all payments
module.exports.findAllPayments = async () => {
  try {
    // Retrieve all payments
    const payments = await PaymentModel.find();

    // Attach user details to each payment
    const paymentsWithUserDetails = await Promise.all(
      payments.map(async (payment) => {
        const user = await userModel.findOne({ email: payment.customerEmail }); // Find user by email
        return {
          ...payment.toObject(), // Convert payment document to plain object
          customerDetails: user
            ? {
                fname: user.fname,
                lname: user.lname,
                email: user.email,
              }
            : null, // If no user is found, return null for customerDetails
        };
      })
    );

    return paymentsWithUserDetails;
  } catch (err) {
    throw new Error(`Could not retrieve payments: ${err.message}`);
  }
};



