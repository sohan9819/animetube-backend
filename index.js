import express from 'express';
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import cors from 'cors';

/* Routes */
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import videoRoutes from './routes/videos.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to Database 👍');
    })
    .catch((error) => {
      console.log('Database Connection Error 👎', error);
      connectToDatabase();
    });
  // #################################################################
  // mongoose.connect(process.env.MONGO, (error) => {
  //   error
  //     ? console.log('Database Connection Error 👎', error)
  //     : console.log('Connected to Database 👍');
  // });
  // #################################################################
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/videos', (req, res) => {
  res.send('Here are all the videos');
});
app.get('/users', (req, res) => {
  res.send('Here are all the users');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connectToDatabase();
  console.log(
    `Connected to server \nProject is running at http://${HOST}:${PORT}/`
  );
});
