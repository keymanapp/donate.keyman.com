// Call libraries
const express = require('express');
const router = express.Router();
// Add routes
router.get('/', function(req, res) {
  req.res.send('keyman-api');
});
// Export routes
module.exports = router;
