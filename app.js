const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

module.exports = app;
