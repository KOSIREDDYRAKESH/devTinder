const mongoose = require("mongoose");

// connection requests scehma
const connectRequestSchema = new mongoose.Schema({
    fromUserId: {
        required: true,
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
        required: true,
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        required: true,
        type: String,
        enum: {
            values: ["accepted", "rejected", "ignored", "interested"],
            message: `{VALUE} is not valid.`
        }
    }
}, { timestamps: true });

//indexing for optimising queries
connectRequestSchema.index({ fromUserId: 1, toUserId: 1 })

// checking before saving into DB in schema level
connectRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    // check from & to userId same 
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {

        throw new Error("you cannot send connection request to yourself!")
    }

    next();
})

const ConnectRequest = new mongoose.model("ConnectRequest", connectRequestSchema)

module.exports = ConnectRequest;