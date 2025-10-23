const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // <-- Add this
dotenv.config();
const authRoutes = require('./routes/auth');
const billRoutes = require('./routes/bills');
const boxRoutes = require('./routes/boxes');
const shopRoutes = require('./routes/shops');
const thingSpeakRoutes = require("./routes/thingspeak");


connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,               // allow cookies to be sent
}));

// Test route to check backend deployment
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
