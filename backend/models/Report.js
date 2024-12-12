import mongoose from "mongoose";

// Report Schema 정의
const ReportSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  email: { type: String, required: true },
  formData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }, // 생성 시간 자동 추가
});

// 모델 생성
const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
