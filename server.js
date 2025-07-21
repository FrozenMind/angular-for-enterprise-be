const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userService = require('./user.service');
const recognitionService = require('./recognition.service');
const fs = require('fs');
const path = require('path');
app.use(express.json());

// Basic Auth middleware
function basicAuth(req, res, next, adminOnly = false) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res
      .status(401)
      .json({ message: 'Missing or invalid Authorization header' });
  }
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'utf-8'
  );
  const [username, password] = credentials.split(':');
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: 'Invalid Authorization header format' });
  }
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data', 'user.json'), 'utf-8')
  );
  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password &&
      (adminOnly ? u.admin === true : true)
  );
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = user;
  next();
}

// Apply basicAuth middleware to all routes except '/'
app.use((req, res, next) => {
  if (req.path === '/') return next();
  if (req.path.startsWith('/users/')) {
    return basicAuth(req, res, next, true);
  }
  return basicAuth(req, res, next);
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Add a new user
app.post('/users', (req, res) => {
  try {
    const newUser = userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Update a user by id
app.put('/users/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedUser = userService.updateUser(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Add a new recognition
app.post('/recognitions', (req, res) => {
  try {
    const newRecognition = recognitionService.addRecognition();
    res.status(201).json(newRecognition);
  } catch (err) {
    res.status(500).json({ message: 'Error adding recognition' });
  }
});

// Update a recognition by id
app.put('/recognitions/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedRecognition = recognitionService.updateRecognition(id);
    if (!updatedRecognition) {
      return res.status(404).json({ message: 'Recognition not found' });
    }
    res.json(updatedRecognition);
  } catch (err) {
    res.status(500).json({ message: 'Error updating recognition' });
  }
});

// Delete a recognition by id
app.delete('/recognitions/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = recognitionService.deleteRecognition(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recognition not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recognition' });
  }
});

// Get all users with their totalRecognition points
app.get('/users-with-recognition', (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'user.json'), 'utf-8')
    );
    const recognitions = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'recognition.json'), 'utf-8')
    );
    const usersWithPoints = users.map((user) => {
      const totalRecognition = recognitions
        .filter((r) => r.userId === user.id)
        .reduce((sum, r) => sum + (r.points || 0), 0);
      return { ...user, totalRecognition };
    });
    res.json(usersWithPoints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users with recognition' });
  }
});

// Get all recognitions for a given user id
app.get('/recognitions/user/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const recognitions = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data', 'recognition.json'), 'utf-8')
    );
    const userRecognitions = recognitions.filter((r) => r.userId === userId);
    res.json(userRecognitions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recognitions for user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
