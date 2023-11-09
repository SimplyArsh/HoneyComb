const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const examplesRouter = require('./routes/example')


app.use(cors());
app.use(express.json());
app.use('/examples', examplesRouter);


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

;
