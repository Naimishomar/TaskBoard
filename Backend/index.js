import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/user.route.js';
import boardRoutes from './routes/board.route.js';
import taskRoutes from './routes/task.route.js';
dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

const allowedOrigins = [
  'http://localhost:3001',
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`🚫 Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());

app.use('/api/user', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/cors-test', (req, res) => {
  res.json({ message: 'CORS working!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
