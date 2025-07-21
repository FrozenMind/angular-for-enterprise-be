const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'user.json');

function readUsers() {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function addUser(user) {
  const users = readUsers();
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { ...user, id: newId };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

function updateUser(id, userData) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...userData, id };
  writeUsers(users);
  return users[idx];
}

function deleteUser(id) {
  let users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users = users.filter((u) => u.id !== id);
  writeUsers(users);
  return true;
}

module.exports = {
  addUser,
  updateUser,
  deleteUser,
};
