const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

const connection = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connection to db successfully');
  } catch (error) {
    console.log(`connection to db failed${error}`);
  }
};

connection();
