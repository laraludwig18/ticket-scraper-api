import mongoose from 'mongoose';

import mongoConfig from '../../config/mongo';

const connectionUrl = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

mongoose
  .connect(connectionUrl, {
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
