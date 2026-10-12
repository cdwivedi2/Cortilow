import express from "express";
import { authenticate } from "./auth.js";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = authenticate(username, password);
  res.json(result);
});

app.listen(3000, () => console.log("Server running"));
