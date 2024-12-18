const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); 
  },
  credentials: true, 
}));
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const path = require('path');
const slideRoutes = require('./routes/slideRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();


// Middleware
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());

// Import routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/slides', slideRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);


// Define port
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
