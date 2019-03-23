const keySecret = process.env.sk_test;
const stripe = require('stripe')(keySecret);
// Send data
const sendData = (req, res, next) => {
  // Set up post endpoint for angular form
  // Create address object
  const address = {
    address: {
      line1: req.body.data.billing_address_line1,
      city: req.body.data.billing_address_city,
      state: req.body.data.billing_address_state,
      postal_code: req.body.data.billing_address_zip,
      country: req.body.data.billing_address_country,
    },
    name: null,
  };
    // Create customer first
  stripe.customers.create({
    email: req.body.token.email,
    source: req.body.token.id,
    shipping: address,
    name: req.body.token.name,
  }, (err, customer) => {
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: 'Donation to Keyman',
      customer: customer.id,
      receipt_email: req.body.token.email,
    }, (err, charges) => {
      // Handle errors
      if (err !== null) {
        switch (err.type) {
          case 'StripeCardError':
            // A declined card error
            err.message; // => e.g. "Your card's expiration year is invalid."
            break;
          case 'RateLimitError':
            // Too many requests made to the API too quickly
            err.message;
            break;
          case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            err.message;
            break;
          case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            err.message;
            break;
          case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            err.message;
            break;
          case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            err.message;
            break;
          default:
            // Handle any other types of unexpected errors
            err.message;
            break;
        }
      }
    });
  });
};
// Export as module
module.exports = {
  sendData,
};
