// API with basic form
// Set local environment variables
const keyPublishable = 'pk_test_raF8g0kIcx1D8FlIAyxYMRed';
const keySecret = 'sk_test_xd0rGDIVROhzmczhFF3avj2O';
// Set up express
const app = require("express")();
const routes = require('./routes/routes');
const stripe = require("stripe")(keySecret);
const bodyParser = require('body-parser');
// Set routes
app.use('/', routes);
// Parse requests
app.use(bodyParser.json());
// Allow requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// // Todo: Error handling
// app.use( function(req, res, next) {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// // // Display error
// app.use( function(err, req, res, next) {
//     res.status( err.code || 500 )
//     .json({
//         status: 'error',
//         message: err,
//     });
// });
// Set up post endpoint for angular form
app.post("/charge/angular", (req, res) => {
  // Output event
  res.send('Saw that POST!');
// Create customer first
  stripe.customers.create({
     email: req.body.token.email,
    source: req.body.token.id
  })
// Add charge to customer
  .then(customer =>
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: 'Donation to Keyman',
      customer: customer.id,
      receipt_email: req.body.token.email
    }))
// Successfull api call
  // .then(res => {
  //   res.status(200)
  //     .json({
  //       status: '200',
  //       message: res,
  //     });
  // })
 // Handle api failure
  // .catch(res => {
  //   res.status(500)
  //      .json({
  //        status: '500',
  //        message: res,
  //      });
  // })
});
// Listen on port 4567
app.listen(process.env.PORT || 4567, function() {
  console.log('Running on port 4567');
});
