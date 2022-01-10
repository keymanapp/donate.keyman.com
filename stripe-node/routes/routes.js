// Call libraries
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const charge = require('../api/charge');

// Parse requests
router.use(bodyParser.json());

// Add routes
router.get('/api/', (req, res) => {
  req.res.send('keyman-api');
});

router.route('/api/charge').post(charge.sendData);

// Serve /dist
router.use('/', express.static('../dist/', {index: 'app.view.html'}));

// Export routes
module.exports = router;
