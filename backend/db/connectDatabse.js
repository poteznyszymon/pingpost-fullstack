import mongoose from "mongoose";

export const connectDatabse = async () => {
  try {
    const connectionResponse = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connectionResponse.connection.host}`);
  } catch (error) {
    console.log("Error with connection to mongoDB:", error);
    process.exit(1);
  }
};
