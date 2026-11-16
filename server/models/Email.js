
import mongoose from "mongoose";

// Define Email Schema
const emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// Create Email Model
const Email = mongoose.model("Email", emailSchema);

export default Email;
