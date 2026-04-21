const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE || 20),
      minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE || 2),
      serverSelectionTimeoutMS: 10000,
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongo connection error', err);
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
