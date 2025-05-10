const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const adRoutes = require('./routes/ads');
const commentRoutes = require('./routes/comment.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/comments', commentRoutes);

// Подключение к MongoDB и запуск сервера
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Подключено к MongoDB');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error.message);
  }
};

startServer();