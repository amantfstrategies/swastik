const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const slideRoutes = require('./routes/slideRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/slides', slideRoutes);
app.use('/api/categories', categoryRoutes);


// Define port
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
