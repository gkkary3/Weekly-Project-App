import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 경로 정의
const filePath = path.join(__dirname, "data", "user-report.json");
// const filePath = path.resolve(__dirname, "data/user-report.json");

// 특정 도메인에서만 요청을 허용
// const corsOptions = {
//   origin: "https://weekly-project-app.vercel.app", // 요청을 허용할 도메인
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// GET 요청 처리
app.get("/api/Weekly-Project-App/user-report", async (req, res) => {
  try {
    // 파일 존재 확인
    await fs.access(filePath);

    // JSON 파일 읽기
    const reportContent = await fs.readFile(filePath, "utf-8");
    const reportData = JSON.parse(reportContent);

    const { teamId, email } = req.query;
    console.log(teamId, email);
    if (!teamId || !email) {
      return res.status(400).json({ error: "teamId와 email을 제공해주세요." });
    }

    const filteredReports = reportData[teamId]?.[email] || [];

    res.status(200).json(filteredReports);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error: JSON file does not exist.");
      res.status(404).json({ error: "Data file not found." });
    } else {
      console.error("Error reading reports:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// POST 요청 처리
app.post("/api/Weekly-Project-App/user-report", async (req, res) => {
  const { formData, teamId, email } = req.body;
  console.log(teamId, email);
  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  // 파일 존재 여부 확인
  let reports = {};
  try {
    await fs.access(filePath); // 파일이 존재하는지 확인 (비동기)
    const reportContent = await fs.readFile(filePath, "utf-8");
    reports = JSON.parse(reportContent);
  } catch (error) {
    // 파일이 없으면 빈 객체로 초기화
    if (error.code === "ENOENT") {
      reports = {};
    } else {
      return res.status(500).json({ error: "Error reading file." });
    }
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
  try {
    await fs.writeFile(filePath, JSON.stringify(reports, null, 2));
    res
      .status(200)
      .json({ message: "Report added successfully!", reportId: reportGuid });
  } catch (error) {
    res.status(500).json({ error: "Error saving file." });
  }
});

// PUT 요청 처리
app.put("/api/Weekly-Project-App/user-report", async (req, res) => {
  const { formData, teamId, email, reportId } = req.body;

  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  // 파일 존재 여부 확인
  let reports = {};
  try {
    await fs.access(filePath); // 파일이 존재하는지 확인
    const reportContent = await fs.readFile(filePath, "utf-8");
    reports = JSON.parse(reportContent);
  } catch (error) {
    // 파일이 없으면 빈 객체로 초기화
    if (error.code === "ENOENT") {
      reports = {};
    } else {
      return res.status(500).json({ error: "Error reading file." });
    }
  }

  // 팀과 이메일 구조 확인
  if (!reports[teamId]) {
    reports[teamId] = {};
  }
  if (!reports[teamId][email]) {
    reports[teamId][email] = [];
  }

  // 기존 보고서 수정
  const reportIndex = reports[teamId][email].findIndex(
    (r) => r.id === reportId
  );
  if (reportIndex === -1) {
    return res.status(404).json({ error: "Report not found." });
  }

  reports[teamId][email][reportIndex] = {
    ...reports[teamId][email][reportIndex],
    ...formData,
  };

  // 파일 저장
  try {
    await fs.writeFile(filePath, JSON.stringify(reports, null, 2));
    res.status(200).json({ message: "Report updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving file." });
  }
});

// DELETE 요청 처리
app.delete("/Weekly-Project-App/delete-report/:reportId", async (req, res) => {
  const { reportId } = req.params;

  try {
    // 파일 존재 확인
    await fs.access(filePath);

    // JSON 파일 읽기
    const reportContent = await fs.readFile(filePath, "utf-8");
    const reportData = JSON.parse(reportContent);

    let isDeleted = false;

    // reportId를 기준으로 삭제
    Object.keys(reportData).forEach((teamId) => {
      Object.keys(reportData[teamId]).forEach((email) => {
        const reports = reportData[teamId][email];

        // reportId를 가진 보고서를 필터링하여 삭제
        const filteredReports = reports.filter(
          (report) => report.id !== reportId
        );
        if (filteredReports.length < reports.length) {
          // 보고서가 삭제되었으면 데이터를 갱신
          reportData[teamId][email] = filteredReports;
          isDeleted = true;
        }
      });
    });

    if (isDeleted) {
      // 삭제 후 변경된 데이터를 파일에 저장
      await fs.writeFile(filePath, JSON.stringify(reportData, null, 2));

      res.status(200).json({ message: "Report deleted successfully" });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error: JSON file does not exist.");
      res.status(404).json({ error: "Data file not found." });
    } else {
      console.error("Error deleting reports:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
