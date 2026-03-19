const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("connected to DB");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB;