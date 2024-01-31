import mongoose from 'mongoose';
import { app } from './app';
import { natsClient } from './nats-client';
const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsClient.connect(
      'ticketing',
      'randomclient',
      'http://nats-streaming-srv:4222'
    );

    natsClient.client.on('close', () => {
      console.log('Nats Shutting down');
      process.exit();
    });
    process.on('SIGINT', () => {
      console.log('SIGINT received');
      natsClient.client.close();
    });
    process.on('SIGTERM', () => {
      console.log('SIGTERM received');
      natsClient.client.close();
    });

    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('Server running on port 3000!');
  });
};

startUp();
