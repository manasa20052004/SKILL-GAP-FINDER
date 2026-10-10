
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "skill_gap_finder",
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/", (req, res) => {
  res.json({ message: "Skill Gap Finder Backend is running!" });
});

// Get all skills from MySQL
app.get("/api/skills", async (req, res) => {
  try {
    const [skills] = await db.query(
      "SELECT id, skill_name, category FROM skills ORDER BY id"
    );
    res.json({ skills });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Could not fetch skills" });
  }
});

// Save a skill-gap result
app.post("/api/progress", async (req, res) => {
  try {
    const {
      current_skills,
      target_role,
      match_percentage
    } = req.body;

    if (
      typeof current_skills !== "string" ||
      !current_skills.trim() ||
      typeof target_role !== "string" ||
      !target_role.trim() ||
      !Number.isFinite(Number(match_percentage)) ||
      Number(match_percentage) < 0 ||
      Number(match_percentage) > 100
    ) {
      return res.status(400).json({ message: "Invalid progress data" });
    }

    const [result] = await db.execute(
      `INSERT INTO skill_progress
       (current_skills, target_role, match_percentage)
       VALUES (?, ?, ?)`,
      [current_skills.trim(), target_role.trim(), Number(match_percentage)]
    );

    res.status(201).json({
      message: "Progress saved successfully!",
      id: result.insertId
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Could not save progress" });
  }
});

// Get saved progress
app.get("/api/progress", async (req, res) => {
  try {
    const [progress] = await db.query(
      `SELECT id, current_skills, target_role,
              match_percentage, created_at
       FROM skill_progress
       ORDER BY created_at DESC`
    );

    res.json({ progress });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Could not fetch progress" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
