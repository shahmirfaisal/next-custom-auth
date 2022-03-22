import mongoose from "mongoose";

async function dbConnect() {
  return await mongoose.connect(process.env.MONGODB_URI);
}

export default dbConnect;
