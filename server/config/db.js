const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.NODE_ENV === 'prod' ? process.env.MONGODB_PROD_URL : process.env.MONGODB_URL

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB Server");
});

db.on('error', (err) => {
    console.log("MongoDB connection error: ", err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

module.exports = db;