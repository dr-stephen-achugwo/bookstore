import express from 'express';
import connectDb from './database/db.js'
import bookRoutes from './Routes/books.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5555;

const app = express();

// Middleware for handling CORS policy:
const corsOptions = {
    origin: ['https://bookstore-black-mu.vercel.app/', 'https://bookstore.apps.net.ng', 'http://localhost:5173', 'https://bookstore-art4u.onrender.com'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (like cookies) to be sent
    allowedHeaders: ['Content-Type, Authorization']
};
// Enable CORS for all routes
app.use(cors(corsOptions));


// Parse JSON requests
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Something went wrong on the server'
  });
});

const connection = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Exit with error
  }
};

connection();