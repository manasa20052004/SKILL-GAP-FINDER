import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [result, setResult] = useState(null);

  const skillData = {
    "Full Stack Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Git"
    ],

    "Frontend Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
      "Responsive Design"
    ],

    "Backend Developer": [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST API",
      "Git"
    ],

    "Python Developer": [
      "Python",
      "Django",
      "Flask",
      "SQL",
      "Git",
      "REST API"
    ],

    "Java Developer": [
      "Java",
      "Spring Boot",
      "SQL",
      "REST API",
      "Git",
      "OOP"
    ],

    "Data Analyst": [
      "Python",
      "SQL",
      "Excel",
      "Power BI",
      "Statistics",
      "Data Visualization"
    ],

    "Data Scientist": [
      "Python",
      "SQL",
      "Statistics",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Data Visualization"
    ],

    "Machine Learning Engineer": [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
      "SQL",
      "Git"
    ],

    "AI Engineer": [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "TensorFlow",
      "PyTorch",
      "Generative AI"
    ],

    "DevOps Engineer": [
      "Linux",
      "Git",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "AWS"
    ],

    "Cloud Engineer": [
      "AWS",
      "Azure",
      "Linux",
      "Networking",
      "Docker",
      "Kubernetes",
      "Cloud Security"
    ],

    "Cybersecurity Analyst": [
      "Networking",
      "Linux",
      "Cybersecurity",
      "Python",
      "Firewalls",
      "Ethical Hacking",
      "Security Tools"
    ],

    "UI/UX Designer": [
      "Figma",
      "UI Design",
      "UX Design",
      "Wireframing",
      "Prototyping",
      "User Research"
    ],

    "Mobile App Developer": [
      "Java",
      "Kotlin",
      "Android",
      "Flutter",
      "Dart",
      "REST API",
      "Git"
    ]
  };

  // Learning roadmap for different skills
  const roadmap = {
    HTML: "Learn HTML structure, forms, tables and semantic elements.",
    CSS: "Learn layouts, Flexbox, Grid, responsive design and styling.",
    JavaScript: "Learn variables, functions, arrays, objects, DOM and ES6.",
    React: "Learn components, props, state, hooks and React projects.",
    "Node.js": "Learn Node.js, modules, npm and creating backend servers.",
    "Express.js": "Learn routes, middleware and REST API development.",
    MongoDB: "Learn databases, collections, CRUD operations and Mongoose.",
    "REST API": "Learn HTTP methods, API routes, JSON and API testing.",
    Git: "Learn Git commands, GitHub, branches and version control.",
    Python: "Learn Python syntax, functions, collections and OOP.",
    Django: "Learn Django models, views, URLs and templates.",
    Flask: "Learn Flask routes, APIs and backend development.",
    SQL: "Learn databases, SELECT, INSERT, UPDATE, DELETE and JOIN.",
    Java: "Learn Java syntax, OOP, collections and exception handling.",
    "Spring Boot": "Learn Spring Boot, REST APIs and database integration.",
    OOP: "Learn classes, objects, inheritance, polymorphism and abstraction.",
    Excel: "Learn formulas, functions, charts and data analysis.",
    "Power BI": "Learn dashboards, data visualization and Power BI reports.",
    Statistics: "Learn mean, median, probability, distributions and analysis.",
    "Data Visualization": "Learn charts, graphs and effective data presentation.",
    Pandas: "Learn data cleaning, filtering and analysis with Pandas.",
    NumPy: "Learn arrays, numerical operations and data processing.",
    "Machine Learning": "Learn supervised learning, unsupervised learning and model evaluation.",
    "Deep Learning": "Learn neural networks, CNNs and deep learning concepts.",
    TensorFlow: "Learn tensors, models and neural network development.",
    PyTorch: "Learn tensors, models and deep learning with PyTorch.",
    NLP: "Learn text processing, tokenization and natural language models.",
    "Generative AI": "Learn LLM concepts, prompting and AI application development.",
    Linux: "Learn Linux commands, files, permissions and processes.",
    Docker: "Learn containers, Dockerfiles and Docker Compose.",
    Kubernetes: "Learn pods, deployments and container orchestration.",
    Jenkins: "Learn CI/CD pipelines and automated builds.",
    "CI/CD": "Learn continuous integration and continuous deployment.",
    AWS: "Learn EC2, S3, IAM and basic AWS cloud services.",
    Azure: "Learn Azure services, virtual machines and cloud deployment.",
    Networking: "Learn IP addresses, DNS, HTTP, TCP/IP and networking basics.",
    "Cloud Security": "Learn cloud security, IAM and secure cloud practices.",
    Cybersecurity: "Learn security fundamentals, threats and protection methods.",
    Firewalls: "Learn firewall rules, network filtering and security basics.",
    "Ethical Hacking": "Learn ethical security testing and common vulnerabilities.",
    "Security Tools": "Learn security monitoring and basic security testing tools.",
    Figma: "Learn UI design, components, layouts and prototyping.",
    "UI Design": "Learn visual hierarchy, typography, colors and interface design.",
    "UX Design": "Learn user flows, usability and user-centered design.",
    Wireframing: "Learn how to create simple layouts and wireframes.",
    Prototyping: "Learn interactive prototypes and user testing.",
    "User Research": "Learn user interviews, surveys and usability testing.",
    Kotlin: "Learn Kotlin syntax, OOP and Android development.",
    Android: "Learn Android layouts, activities and app development.",
    Flutter: "Learn Flutter widgets, layouts and app navigation.",
    Dart: "Learn Dart syntax, classes and asynchronous programming.",
    "Responsive Design": "Learn media queries, flexible layouts and mobile-friendly design."
  };

  // Get roles from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/skills")
      .then((response) => {
        setRoles(response.data.roles);
      })
      .catch((error) => {
        console.log("Backend connection error:", error);
      });
  }, []);

  const findSkillGap = () => {
    if (!skills || !role) {
      alert("Please enter your skills and select a target role.");
      return;
    }

    const currentSkills = skills
      .split(",")
      .map((skill) => skill.trim().toLowerCase());

    const requiredSkills = skillData[role];

    const matched = requiredSkills.filter((skill) =>
      currentSkills.includes(skill.toLowerCase())
    );

    const missing = requiredSkills.filter(
      (skill) => !currentSkills.includes(skill.toLowerCase())
    );

    const percentage = Math.round(
      (matched.length / requiredSkills.length) * 100
    );

    setResult({
      matched,
      missing,
      percentage
    });
  };

  return (
    <div className="app">
      <header>
        <h1>Skill Gap Finder</h1>
        <p>Find the skills you need for your dream career.</p>
      </header>

      <main>
        <section className="card">
          <h2>Check Your Skill Gap</h2>

          <label>Enter your current skills</label>

          <input
            type="text"
            placeholder="Example: HTML, CSS, JavaScript, React"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label>Select your target role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select Role --</option>

            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button onClick={findSkillGap}>
            Find My Skill Gap
          </button>
        </section>

        {result && (
          <>
            <section className="result">
              <h2>Your Skill Gap Result</h2>

              <div className="score">
                <h3>{result.percentage}%</h3>
                <p>Skill Match</p>
              </div>

              <div className="skills-section">
                <div>
                  <h3>✅ Skills You Have</h3>

                  {result.matched.length > 0 ? (
                    <ul>
                      {result.matched.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No matching skills yet.</p>
                  )}
                </div>

                <div>
                  <h3>❌ Skills You Need</h3>

                  {result.missing.length > 0 ? (
                    <ul>
                      {result.missing.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Great! You have all the required skills.</p>
                  )}
                </div>
              </div>
            </section>

            {result.missing.length > 0 && (
              <section className="roadmap">
                <h2>📚 Recommended Learning Roadmap</h2>

                <p className="roadmap-intro">
                  Follow these steps to improve your skills for your target role.
                </p>

                {result.missing.map((skill, index) => (
                  <div className="roadmap-item" key={skill}>
                    <div className="roadmap-number">
                      {index + 1}
                    </div>

                    <div>
                      <h3>{skill}</h3>
                      <p>
                        {roadmap[skill] ||
                          `Learn the fundamentals of ${skill} and practice by building projects.`}
                      </p>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;