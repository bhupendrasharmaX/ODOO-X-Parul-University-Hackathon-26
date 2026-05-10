import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectDB from './config/db.ts';
import errorHandler from './middleware/errorHandler.ts';

// Route imports
import authRoutes from './routes/auth.ts';
import tripRoutes from './routes/trips.ts';
import cityRoutes from './routes/cities.ts';
import activityRoutes from './routes/activities.ts';
import itineraryRoutes from './routes/itinerary.ts';
import budgetRoutes from './routes/budget.ts';
import checklistRoutes from './routes/checklist.ts';
import notesRoutes from './routes/notes.ts';
import uploadRoutes from './routes/upload.ts';
import adminRoutes from './routes/admin.ts';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ success: true, message: 'TRAVELOOP API is running...' });
});

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
