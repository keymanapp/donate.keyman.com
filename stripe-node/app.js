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
// Set up charge endpoint for angular form
// Todo: Parse data from angular form, send to Stripe
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

app.post("/charge/angular", (req, res) => {
  console.log('hey matt');
  console.log (req.body);
  res.send('Saw that POST!');

});
// Listen on Port
app.listen(4567);
