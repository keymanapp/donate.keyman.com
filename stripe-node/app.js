// API with basic form
// Set local environment variables
const keyPublishable = 'pk_test';
const keySecret = 'sk_test';
// Set up express
const app = require("express")();
const stripe = require("stripe")(keySecret);
// Todo: Clean up pug form, replace with angular
app.set("view engine", "pug");
var bodyParser = require('body-parser')
// Send header to allow post request
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Home
app.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}));
app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});
// Set up post endpoint for angular form
app.post("/charge/angular", (req, res) => {
  console.log (req.body);
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
      description: 'Example charge',
      customer: customer.id
    }))
//Todo: Set up success/fail message
   // .then(charge => res.render("charge.pug"));
});
// Listen on Port
app.listen(4567);
