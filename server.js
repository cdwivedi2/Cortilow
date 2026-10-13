import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to JSON storage file
const dataPath = path.join(__dirname, "preSignups.json");

// ------------------------------
// ROOT ROUTE
// ------------------------------
app.get("/", (req, res) => {
  res.send("Cortilow backend is running");
});

// ------------------------------
// PRE‑SIGNUP ROUTE (SAVE ENTRY)
// ------------------------------
app.post("/pre-signup", (req, res) => {
  const { name, email, interest } = req.body;

  if (!name || !email || !interest) {
    return res.status(400).send("Missing fields");
  }

  // Load existing data
  let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  // Add new entry
  data.push({
    name,
    email,
    interest,
    date: new Date().toISOString()
  });

  // Save updated list
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(200).send("Pre‑signup received");
});

// ------------------------------
// COUNT ROUTE
// ------------------------------
app.get("/pre-signup/count", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  res.json({ count: data.length });
});

// ------------------------------
// LIST ROUTE
// ------------------------------
app.get("/pre-signup/list", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  res.json(data);
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/product-survey", (req, res) => {
  const { firstPayment, planChoice, useful, wantProduct } = req.body;

  if (!firstPayment || !planChoice || !useful || !wantProduct) {
    return res.status(400).send("Missing fields");
  }

  let data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  data.push({
    firstPayment,
    planChoice,
    useful,
    wantProduct,
    date: new Date().toISOString()
  });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(200).send("Survey response saved");
});
