// Call libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const charge = require('../api/charge');
// Parse requests
router.use(bodyParser.json());
// Allow requests
// // Todo: Cleanup
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Add routes
router.get('/', (req, res) => {
  req.res.send('keyman-api');
});
// Find all of the postal codes in a state
router.route('/charge')
  .post(charge.sendData);
// Export routes
module.exports = router;
