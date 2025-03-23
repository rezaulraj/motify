import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to mongodb`);
  } catch (error) {
    console.log("Failed to connect to Mongodb", error);
    process.exit(1);
  }
};
