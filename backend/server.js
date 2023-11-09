const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const examplesRouter = require('./routes/example');

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use('/examples', examplesRouter);

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Start backend server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


