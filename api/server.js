const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(process.cwd(), "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.get("/employees", (req, res) => {
  const db = readDb();
  res.json(db.employees || []);
});

app.post("/employees", (req, res) => {
  const db = readDb();
  const newEmployee = req.body;
  db.employees.push(newEmployee);
  writeDb(db);
  res.status(201).json(newEmployee);
});

if (!process.env.VERCEL) {
  app.listen(3000, () => console.log("Mock API running locally at http://localhost:3000"));
}

module.exports = app;
