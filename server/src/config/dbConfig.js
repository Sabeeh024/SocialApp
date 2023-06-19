const mongoose = require("mongoose");
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbURI = `mongodb+srv://${username}:${password}@cluster0.citrng7.mongodb.net/?retryWrites=true&w=majority`;

const config = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, config);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application on connection error
  }
};

module.exports = connectDB;
