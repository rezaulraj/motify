import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import adminRouter from "./routes/adminRoute.js";
import userRouter from "./routes/userRoute.js";
import songRouter from "./routes/songRoute.js";
import statRouter from "./routes/statRoute.js";
import authRouter from "./routes/authRoute.js";
import albumRouter from "./routes/albumRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// to parse req.body to json
app.use(express.json());
// Pass no parameters clerk middware
app.use(clerkMiddleware()); //this will add auth to req obj => req.auth

// If using ES modules, get the current directory:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  fileUpload({
    useTempFiles: true, // This forces creation of a temp file
    tempFileDir: path.join(__dirname, "temp"), // Temporary directory for storing files
    createParentPath: true, // Creates the directory if it doesn't exist
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
  })
);

app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/songs", songRouter);
app.use("/api/stats", statRouter);
app.use("/api/auth", authRouter);
app.use("/api/albums", albumRouter);

// Internal sever error message
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal sever error"
        : err.message,
  });
});

app.listen(port, () => {
  connectDB();
  console.log("the server is running on port 4000");
});

// todo: socket.io
