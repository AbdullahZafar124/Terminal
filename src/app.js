const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const attractionRoutes = require('./routes/attractionRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

app.use(bodyParser.json());

// API Routes
app.use('/attractions', attractionRoutes);
app.use('/visitors', visitorRoutes);
app.use('/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
