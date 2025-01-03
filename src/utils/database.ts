import mongoose from "mongoose";
export const connectDB = async (mongouri: string): Promise<void> => {
  try {
    await mongoose.connect(mongouri, { dbName: "Neina" });
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
  }
};
