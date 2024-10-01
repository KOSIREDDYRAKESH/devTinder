const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Rakesh_kosireddy:Kcsrv%405124@clusternode.lqd4f.mongodb.net/devTinder");
}

module.exports = connectDB;