import fs from "fs";

export function authenticate(username, password) {
  const data = fs.readFileSync("./users.json");
  const users = JSON.parse(data);

  const user = users.find(u => u.username === username);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password" };
  }

  return {
    success: true,
    message: "Login successful",
    subscription: user.subscription
  };
}
import express from "express";
import { authenticate } from "./auth.js";
import { signup } from "./signup.js";

const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  res.json(signup(username, password));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json(authenticate(username, password));
});

app.listen(3000, () => console.log("Server running"));
