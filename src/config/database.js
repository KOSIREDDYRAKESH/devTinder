const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://Rakesh_kosireddy:Kcsrv%405124@clusternode.lqd4f.mongodb.net/");
}



module.exports = connectDB;