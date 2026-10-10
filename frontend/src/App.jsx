import { useEffect, useState } from "react";
import "./App.css";

const skillData = {
  "Full Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Git",
  ],

  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
    "Responsive Design",
  ],

  "Backend Developer": [
    "Node.js",
    "Express",
    "MongoDB",
    "REST API",
    "SQL",
    "Git",
  ],

  "Python Developer": [
    "Python",
    "OOP",
    "SQL",
    "Git",
    "Django",
    "REST API",
  ],

  "Java Developer": [
    "Java",
    "OOP",
    "SQL",
    "Spring Boot",
    "Git",
    "REST API",
  ],

  "Data Analyst": [
    "Python",
    "SQL",
    "Excel",
    "Power BI",
    "Statistics",
    "Pandas",
  ],

  "Data Scientist": [
    "Python",
    "Statistics",
    "Pandas",
    "NumPy",
    "Machine Learning",
    "SQL",
  ],

  "Machine Learning Engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "SQL",
    "Git",
  ],

  "AI Engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "TensorFlow",
    "Git",
  ],

  "DevOps Engineer": [
    "Linux",
    "Git",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "AWS",
  ],

  "Cloud Engineer": [
    "AWS",
    "Linux",
    "Networking",
    "Docker",
    "Kubernetes",
    "Git",
  ],

  "Cybersecurity Analyst": [
    "Networking",
    "Linux",
    "Cybersecurity",
    "Python",
    "Cryptography",
    "Ethical Hacking",
  ],

  "UI/UX Designer": [
    "Figma",
    "UI Design",
    "UX Design",
    "Wireframing",
    "Prototyping",
    "User Research",
  ],

  "Mobile App Developer": [
    "Java",
    "Kotlin",
    "Android",
    "XML",
    "Firebase",
    "Git",
  ],
};

function App() {
  const [page, setPage] = useState("home");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("Python Developer");
  const [result, setResult] = useState(null);
  const [savedProgress, setSavedProgress] = useState(null);

  const roles = Object.keys(skillData);

  // Load saved progress when website opens
  useEffect(() => {
    const saved = localStorage.getItem("skillGapProgress");

    if (saved) {
      setSavedProgress(JSON.parse(saved));
    }
  }, []);

  // Find Skill Gap
  const findSkillGap = () => {
    if (skills.trim() === "") {
      alert("Please enter your current skills.");
      return;
    }

    // Convert entered skills into lowercase
    const userSkills = skills
      .split(",")
      .map((skill) => skill.trim().toLowerCase())
      .filter((skill) => skill !== "");

    const requiredSkills = skillData[role];

    // Find matched skills
    const matched = requiredSkills.filter((skill) =>
      userSkills.includes(skill.toLowerCase())
    );

    // Find missing skills
    const missing = requiredSkills.filter(
      (skill) => !userSkills.includes(skill.toLowerCase())
    );

    // Calculate percentage
    const percentage = Math.round(
      (matched.length / requiredSkills.length) * 100
    );

    const newResult = {
      skills: skills,
      role: role,
      percentage: percentage,
      matched: matched,
      missing: missing,
    };

    setResult(newResult);
    setPage("home");
  };

  // Save Progress
  const saveProgress = () => {
    if (!result) {
      alert("Please find your skill gap first.");
      return;
    }

    localStorage.setItem(
      "skillGapProgress",
      JSON.stringify(result)
    );

    setSavedProgress(result);

    alert("Progress saved successfully!");
  };

  // Open Dashboard
  const openDashboard = () => {
    const saved = localStorage.getItem("skillGapProgress");

    if (saved) {
      setSavedProgress(JSON.parse(saved));
      setPage("dashboard");
    } else {
      alert("No saved progress found. Please save your progress first.");
    }
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header className="top-header">

        <h1>Skill Gap Finder</h1>

        <nav className="top-nav">

          <button
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={openDashboard}
          >
            Dashboard
          </button>

        </nav>

      </header>

      <main>

        {/* HOME PAGE */}

        {page === "home" && (

          <div className="home-page">

            <section className="hero">

              <h2>Find Your Skill Gap</h2>

              <p>
                Discover your missing skills and understand
                what you need to learn for your target career.
              </p>

            </section>

            {/* SKILL FORM */}

            <section className="skill-form">

              <h2>Check Your Skills</h2>

              <label>
                Current Skills
              </label>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Example: Python, SQL, Git"
              />

              <label>
                Target Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >

                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

              <button
                className="find-button"
                onClick={findSkillGap}
              >
                Find Skill Gap
              </button>

            </section>

            {/* RESULT */}

            {result && (

              <section className="result-section">

                <h2>Skill Match</h2>

                <div className="percentage">
                  {result.percentage}%
                </div>

                <p className="result-text">
                  You match {result.percentage}% of the
                  required skills for {result.role}.
                </p>

                <div className="skills-container">

                  {/* MATCHED */}

                  <div className="skill-box">

                    <h3>Matched Skills</h3>

                    {result.matched.length > 0 ? (

                      <ul>
                        {result.matched.map((skill) => (
                          <li key={skill}>
                            ✓ {skill}
                          </li>
                        ))}
                      </ul>

                    ) : (

                      <p>No matched skills.</p>

                    )}

                  </div>

                  {/* MISSING */}

                  <div className="skill-box">

                    <h3>Missing Skills</h3>

                    {result.missing.length > 0 ? (

                      <ul>
                        {result.missing.map((skill) => (
                          <li key={skill}>
                            • {skill}
                          </li>
                        ))}
                      </ul>

                    ) : (

                      <p>
                        You have all the required skills!
                      </p>

                    )}

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="result-buttons">

                  <button
                    className="save-progress"
                    onClick={saveProgress}
                  >
                    Save Progress
                  </button>

                  <button
                    className="dashboard-button"
                    onClick={openDashboard}
                  >
                    Dashboard
                  </button>

                </div>

              </section>

            )}

          </div>

        )}

        {/* DASHBOARD */}

        {page === "dashboard" && (

          <div className="dashboard-page">

            <h2>Progress Dashboard</h2>

            {savedProgress ? (

              <div className="dashboard-card">

                <h2>
                  {savedProgress.role}
                </h2>

                <div className="dashboard-percentage">
                  {savedProgress.percentage}%
                </div>

                <p>
                  You currently match{" "}
                  {savedProgress.percentage}% of the
                  required skills.
                </p>

                <div className="dashboard-section">

                  <h3>Matched Skills</h3>

                  <ul>
                    {savedProgress.matched.map((skill) => (
                      <li key={skill}>
                        ✓ {skill}
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="dashboard-section">

                  <h3>Skills to Learn</h3>

                  <ul>
                    {savedProgress.missing.map((skill) => (
                      <li key={skill}>
                        • {skill}
                      </li>
                    ))}
                  </ul>

                </div>

                <button
                  onClick={() => setPage("home")}
                >
                  Home
                </button>

              </div>

            ) : (

              <div className="empty-dashboard">

                <h3>No Saved Progress</h3>

                <p>
                  Find your skill gap and save your
                  progress first.
                </p>

                <button
                  onClick={() => setPage("home")}
                >
                  Go to Home
                </button>

              </div>

            )}

          </div>

        )}

      </main>

      <footer>
        <p>Skill Gap Finder © 2026</p>
      </footer>

    </div>
  );
}

export default App;