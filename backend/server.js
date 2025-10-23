const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bills');
const boxRoutes = require('./routes/boxes');
const shopRoutes = require('./routes/shops');
const thingSpeakRoutes = require("./routes/thingspeak");

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Frontend URLs
const FRONTEND_URL_LOCAL = 'http://localhost:5173';
const FRONTEND_URL_PROD = 'https://onion-frontend.onrender.com';

// CORS setup (dynamic based on environment)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? FRONTEND_URL_PROD : FRONTEND_URL_LOCAL,
  credentials: true,
}));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Backend deployed successfully!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/boxes', boxRoutes);
app.use('/api/shops', shopRoutes);
app.use("/api/thingspeak", thingSpeakRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
