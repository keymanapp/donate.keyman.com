// API with basic form
// Set local environment variables
const keySecret = process.env.sk_test;
// Set up express
const app = require('express')();
const stripe = require('stripe')(keySecret);
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
// Set routes
app.use('/', routes);
// Parse requests
app.use(bodyParser.json());
// Allow requests
// Todo: Cleanup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// // Todo: Error handling
// app.use( function(req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// // Display error
// app.use( function(err, req, res, next) {
//     res.status( err.code || 500 )
//     .json({
//         status: 'error',
//         message: err,
//     });
// });
// Set up post endpoint for angular form
app.post('/charge/angular', (req, res) => {
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
  }, (err, customers) => {
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: 'Donation to Keyman',
      customer: customers.id,
      receipt_email: req.body.token.email,
    }, (err, charges) => {
      // Handle errors
      console.log(err.type);
      if (err !== null) {
        switch (err.type) {
          case 'StripeCardError':
            // A declined card error
            err.message = "Your card's expiration year is invalid.";
            res.send(err.message);
            break;
          case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            err.message = "Invalid parameters were supplied to Stripe's API.";
            console.log('he');
            res.send(err.message);
            break;
          case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            err.message = "An error occurred internally with Stripe's API.";
            res.send(err.message);
            break;
          case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            err.message = 'Some kind of error occurred during the HTTPS communication.';
            res.send(err.message);
            break;
          case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            err.message = 'You probably used an incorrect API keyß.';
            res.send(err.message);
            break;
          case 'StripeRateLimitError':
            // Too many requests hit the API too quickly
            err.message = 'Too many requests hit the API too quickly.';
            res.send(err.message);
            break;
        }
      }
    });
  });
});
// Listen on port 4567
app.listen(process.env.PORT || 4567, () => {
  console.log('Running on port 4567');
});
