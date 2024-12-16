import fs from "node:fs/promises";
import path from "path";
import express from "express";
// import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import connectDB from "./config/db.js";
import Report from "./models/Report.js";
import Team from "./models/Team.js";
import User from "./models/User.js";

const app = express();
connectDB();

// 특정 도메인에서만 요청을 허용
// const corsOptions = {
//   origin: "https://weekly-project-app.vercel.app", // 요청을 허용할 도메인
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Report */
// GET 요청 처리
app.get("/api/Weekly-Project-App/user-report", async (req, res) => {
  const { teamId, email } = req.query;

  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  try {
    const reports = await Report.find({ teamId, email });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reports." });
  }
});

// POST 요청 처리
app.post("/api/Weekly-Project-App/user-report", async (req, res) => {
  const { formData, teamId, email } = req.body;

  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  try {
    const newReport = new Report({
      teamId,
      email,
      formData,
    });
    await newReport.save();

    res
      .status(200)
      .json({ message: "Report added successfully!", reportId: newReport._id });
  } catch (error) {
    res.status(500).json({ error: "Error saving report to database." });
  }
});

// PUT 요청 처리
app.put("/api/Weekly-Project-App/user-report", async (req, res) => {
  const { formData, teamId, email, reportId } = req.body;

  if (!teamId || !email) {
    return res.status(400).json({ error: "Team ID and email are required." });
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { formData },
      { new: true }
    );
    if (!updatedReport) {
      return res.status(404).json({ error: "Report not found." });
    }
    res
      .status(200)
      .json({ message: "Report updated successfully!", updatedReport });
  } catch (error) {
    res.status(500).json({ error: "Error updating report." });
  }
});

// DELETE 요청 처리
app.delete("/api/Weekly-Project-App/user-report/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await Report.findByIdAndDelete({ id });
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found." });
    }
    res.status(200).json({ message: "Report deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting report." });
  }
});

/* Team */
// GET 요청 처리
app.get("/api/Weekly-Project-App/getTeamList", async (req, res) => {
  try {
    // 팀 ID와 이메일로 데이터 검색
    const teamList = await Team.find();
    res.status(200).json(teamList);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reports." });
  }
});

// POST 요청 처리
app.post("/api/Weekly-Project-App/addTeam", async (req, res) => {
  const { name, teamId } = req.body;

  try {
    const team = new Team({ name, teamId });
    const savedTeam = await team.save();
    res.status(201).json({
      message: "Team added successfully!",
      team: savedTeam,
    });
  } catch (error) {
    console.error("Error adding team:", error);
    res.status(500).json({ error: "Failed to add team." });
  }
});

// PUT 요청 처리
app.put("/api/Weekly-Project-App/updateTeam", async (req, res) => {
  const { teamId, name } = req.body;

  if (!teamId || !name) {
    return res.status(400).json({ error: "Team ID and name are required." });
  }

  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { teamId },
      { name },
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ error: "Report not found." });
    }
    res
      .status(200)
      .json({ message: "Team updated successfully!", updatedTeam });
  } catch (error) {
    res.status(500).json({ error: "Error updating team." });
  }
});

// DELETE 요청 처리
app.delete("/api/Weekly-Project-App/deleteTeam/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    const deletedTeam = await Team.findOneAndDelete({ teamId });
    if (!deletedTeam) {
      return res.status(404).json({ error: "Taem not found." });
    }
    res.status(200).json({ message: "Taem deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting Taem." });
  }
});

/* User */
// GET 요청 처리
app.get("/api/Weekly-Project-App/getUserList", async (req, res) => {
  try {
    // 팀 ID와 이메일로 데이터 검색
    const { teamId } = req.query;
    console.log(teamId);
    const userList = await User.find({ teamId });
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving userList." });
  }
});

// POST 요청 처리
app.post("/api/Weekly-Project-App/addUser", async (req, res) => {
  const { name, email, teamId } = req.body;

  try {
    const user = new User({ name, email, teamId });

    // 데이터 저장
    const savedUser = await user.save();

    // 성공 응답
    res.status(201).json({
      message: "User added successfully!",
      team: savedUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user." });
  }
});

// PUT 요청 처리
app.put("/api/Weekly-Project-App/updateUser", async (req, res) => {
  const { id, teamId, name, email } = req.body;

  if (!teamId || !name) {
    return res.status(400).json({ error: "Team ID and name are required." });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      ObjectId(id),
      { name, email }, // 하나의 객체로 합쳐야함
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ error: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User updated successfully!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error updating user." });
  }
});

// DELETE 요청 처리
app.delete("/api/Weekly-Project-App/deleteUser/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully!!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting User." });
  }
});
app.listen(3000, () => console.log("Server is running on portss 3000"));
