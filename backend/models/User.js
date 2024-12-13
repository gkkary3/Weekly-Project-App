import mongoose from "mongoose";

// Team Schema 정의
const UserSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // 생성 시간 자동 추가
});

// 모델 생성
const User = mongoose.model("User", UserSchema);

export default User;
