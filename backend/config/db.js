import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // .env 파일 로드

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // 실패 시 애플리케이션 종료
  }
};

export default connectDB;
