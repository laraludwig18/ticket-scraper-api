import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return console.log(`Successfully connected to mongoDB`);
  })
  .catch(error => {
    console.error('Error connecting to database: ', error);
    return process.exit(1);
  });
