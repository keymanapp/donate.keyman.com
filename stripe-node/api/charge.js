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
  let amount = parseInt(req.body.amount) / 100;
  const description = 'Dear ' + req.body.data.billing_name + ', Thank you for your generous contribution of ' +
   req.body.currency + ' ' + amount.toFixed(2) + ' to SIL International, with preference for ' + req.body.data.billing_name  +
   '. This letter serves as a receipt for your contribution. Founded over 80 years ago, SIL International' +
   ' is committed to serving language communities worldwide as they build capacity for sustainable language development.' +
   ' SIL does this primarily through research, translation, training and materials development.' +
   ' SIL works alongside ethnolinguistic communities and their partners as they discover how language development' +
   ' addresses the challenging areas of their daily lives—social, cultural, political, economic and spiritual.' +
   ' Currently, SIL works alongside speakers of more than 1,700 languages in over 100 countries. SIL International ' +
   ' is a nonprofit organization under section 501(c)(3) of the IRS code. No goods or services were provided in consideration of this gift.' +
   ' Your donation is tax deductible. Thank you for partnering with us in making a difference in the lives of people all over the world!';
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
      description: description,
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
    }, (charge) => {
      res.send(charge);
    }
    );
  });
};
// Export as module
module.exports = {
  sendData,
};
