import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB ConnectedDatabase: ${connection.connection.name}`);
  } catch (error) {
    console.error(" Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
