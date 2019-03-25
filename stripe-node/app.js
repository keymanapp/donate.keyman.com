// Set up express
const express = require('express');

const app = express();
const routes = require('./routes/routes');
// Set routes
app.use('/', routes);
// Todo: Error handling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// // Display error
app.use((err, req, res, next) => {
  res.status(err.code || 500)
    .json({
      status: 'error',
      message: err,
    });
});
// Listen on port 4567
app.listen(process.env.PORT || 4567, () => {
  console.log('Running on port 4567');
});
