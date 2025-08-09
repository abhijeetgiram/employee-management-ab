// /api/server.js
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// Path to your db.json in project root
const dbPath = path.join(process.cwd(), "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// GET all employees
app.get("/api/server/employees", (req, res) => {
  const db = readDb();
  res.json(db.employees || []);
});

// POST new employee
app.post("/api/server/employees", (req, res) => {
  const db = readDb();
  const newEmployee = req.body;
  db.employees.push(newEmployee);
  writeDb(db);
  res.status(201).json(newEmployee);
});

// Local dev: run server
if (!process.env.VERCEL) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Mock API running at http://localhost:${port}`);
  });
}

// Export for Vercel serverless
module.exports = app;
