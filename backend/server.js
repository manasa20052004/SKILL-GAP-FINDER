
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "skill_gap_finder",

  // Use Aiven CA certificate for secure database connections
  ssl: process.env.DB_HOST
    ? {
        ca: fs.readFileSync(
          path.join(__dirname, "ca.pem"),
          "utf8"
        ),
        rejectUnauthorized: true
      }
    : undefined,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Skill Gap Finder Backend is running!"
  });
});

// Check database connection
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "OK",
      message: "Backend and database connected successfully"
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed"
    });
  }
});

// Get all skills
app.get("/api/skills", async (req, res) => {
  try {
    const [skills] = await db.query(
      "SELECT id, skill_name, category FROM skills ORDER BY id"
    );

    res.json({ skills });
  } catch (error) {
    console.error("Fetch skills failed:", error.message);

    res.status(500).json({
      message: "Could not fetch skills. Check the database tables."
    });
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
      match_percentage === "" ||
      match_percentage === null ||
      match_percentage === undefined ||
      !Number.isFinite(Number(match_percentage)) ||
      Number(match_percentage) < 0 ||
      Number(match_percentage) > 100
    ) {
      return res.status(400).json({
        message: "Please provide valid skills, target role, and percentage."
      });
    }

    const [result] = await db.execute(
      `INSERT INTO skill_progress
       (current_skills, target_role, match_percentage)
       VALUES (?, ?, ?)`,
      [
        current_skills.trim(),
        target_role.trim(),
        Number(match_percentage)
      ]
    );

    res.status(201).json({
      message: "Progress saved successfully!",
      id: result.insertId
    });
  } catch (error) {
    console.error("Save progress failed:", error.message);

    res.status(500).json({
      message: "Could not save progress."
    });
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
    console.error("Fetch progress failed:", error.message);

    res.status(500).json({
      message: "Could not fetch saved progress."
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Skill Gap Finder server running on port ${PORT}`);
});
