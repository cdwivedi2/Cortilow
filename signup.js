import { loadUsers, saveUsers } from "./auth.js";

export function signup(username, password) {
  const users = loadUsers();

  if (users.find(u => u.username === username)) {
    return { success: false, message: "Username already exists" };
  }

  users.push({
    username,
    password,
    subscription: "free"
  });

  saveUsers(users);

  return { success: true, message: "Account created" };
}
