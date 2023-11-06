import chalk from 'chalk';
import mongoose from 'mongoose';

require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL as string;

export const connectDatabase = () => {
  mongoose.connect(MONGODB_URL);

  mongoose.connection.on('connected', () => {
    console.log(
      chalk.bold.cyan('Mongoose default connection is open to MongoDB Atlas'),
    );
  });

  mongoose.connection.on('error', (err) => {
    console.log(chalk.bold.red('Mongoose connection error: ' + err));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(chalk.bold.red('Mongoose connection is disconnected'));
  });
};

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
