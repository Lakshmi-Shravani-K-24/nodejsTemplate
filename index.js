const express = require('express');
const app = express();
const connectDB = require('./db');
const bodyParser = require('body-parser');

// Connect to the database
connectDB();

app.use(bodyParser.json());

// Import routes
const batteryRoutes = require('./routes/batteryRoutes');

// Use routes
app.use('/batteries', batteryRoutes);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});

module.exports = {app, server};
