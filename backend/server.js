// Define const variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cors to be enabled
app.use(cors());


// Start API server
app.listen(PORT, () => console.log(`backend running on http://localhost:${PORT}`)) 

// Import routes and pass express app object to register them
var routes = require('./App/routes');
routes(app);


// GET
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000.');
});
