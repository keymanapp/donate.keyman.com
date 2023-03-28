// Call libraries
const express = require('express');
const router = express.Router();

/*
const bodyParser = require('body-parser');
const charge = require('../api/charge');
const path = require('path');

// Support /api/charge JSON requirements
router.use(bodyParser.json());

// Basic API routes
router.get('/api/', (req, res) => {
  req.res.send('keyman-api');
});

router.route('/api/charge').post(charge.sendData);

// Serve static files and the home page
router.use('/', express.static('../dist/', {index: 'app.view.html'}));

// Serve dynamic routes for Angular
router.all('/*', function(req,res,next) {
  console.log(req.method + ' ' + req.path);
  res.sendFile(path.join(__dirname, '../../dist/app.view.html'));
});
*/

router.all('/*', function(req,res,next) {
  res.redirect('https://donate.givedirect.org/?cid=13536&n=713766&desig=Keyman');
});

module.exports = router;
