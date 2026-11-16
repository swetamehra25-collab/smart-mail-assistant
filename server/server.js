
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import emailRoutes from "./routes/emailRoutes.js";

// Environment variables load
dotenv.config();

// Express application
const app = express();

// HTTP server
const server = http.createServer(app);

// Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
app.set("io", io);

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/emails", emailRoutes);


// Test API
app.get("/", (req, res) => {
    res.send("Smart Mail Assistant Backend Running!");
});



// Start server
const PORT = process.env.PORT || 5000;

const startServer=async()=>{
    await connectDB();

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

};

startServer();