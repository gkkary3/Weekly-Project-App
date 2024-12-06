import fs from "node:fs/promises";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const PORT = 5000;
const filePath = "./data/user-report.json";

app.use(cors());
app.use(express.json());

// GET 요청 처리
// app.get("/Weekly-Project-App/user-report", async (req, res) => {
//   try {
//     // JSON 파일 읽기
//     const reportContent = await fs.promises.readFile(filePath, "utf-8");
//     const reportData = JSON.parse(reportContent);

//     // teamId와 email 쿼리 파라미터 추출
//     const { teamId, email } = req.query;

//     // 데이터 필터링
//     if (!teamId || !email) {
//       return res.status(400).json({ error: "teamId와 email을 제공해주세요." });
//     }

//     const filteredReports = reportData[teamId]?.[email] || []; // teamId와 email로 필터링된 데이터

//     res.status(200).json(filteredReports);
//   } catch (error) {
//     console.error("Error reading reports:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// PUT 요청 처리
app.put("/Weekly-Project-App/user-report", (req, res) => {
  const { formData, teamId, email } = req.body;

  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  // 파일 읽기
  let reports = {};
  if (fs.existsSync(filePath)) {
    reports = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // 팀과 이메일 구조 확인
  if (!reports[teamId]) {
    reports[teamId] = {};
  }
  if (!reports[teamId][email]) {
    reports[teamId][email] = [];
  }

  // 고유 report-guid 생성
  const reportGuid = uuidv4();
  const newReport = { ...formData, id: reportGuid };

  // 새로운 데이터를 배열에 추가
  reports[teamId][email].push(newReport);

  // 파일 저장
  fs.writeFileSync(filePath, JSON.stringify(reports, null, 2));

  res
    .status(200)
    .json({ message: "Report added successfully!", reportId: reportGuid });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
