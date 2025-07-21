const fs = require('fs');
const path = require('path');

const recognitionFilePath = path.join(__dirname, 'data', 'recognition.json');

function readRecognitions() {
  if (!fs.existsSync(recognitionFilePath)) return [];
  const data = fs.readFileSync(recognitionFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeRecognitions(recognitions) {
  fs.writeFileSync(recognitionFilePath, JSON.stringify(recognitions, null, 2));
}

function addRecognition() {
  const recognitions = readRecognitions();
  const newId =
    recognitions.length > 0
      ? Math.max(...recognitions.map((r) => r.id)) + 1
      : 1;
  const newRecognition = { id: newId };
  recognitions.push(newRecognition);
  writeRecognitions(recognitions);
  return newRecognition;
}

function updateRecognition(id) {
  const recognitions = readRecognitions();
  const idx = recognitions.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  // For now, nothing to update except id
  return recognitions[idx];
}

function deleteRecognition(id) {
  let recognitions = readRecognitions();
  const idx = recognitions.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  recognitions = recognitions.filter((r) => r.id !== id);
  writeRecognitions(recognitions);
  return true;
}

module.exports = {
  addRecognition,
  updateRecognition,
  deleteRecognition,
};
