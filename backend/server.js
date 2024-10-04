// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for passwords
let passwordRecords = [];

// Routes
app.get('/api/passwords', (req, res) => {
    res.json(passwordRecords);
});

app.post('/api/passwords', (req, res) => {
    const newPasswordRecord = { id: uuidv4(), ...req.body };
    passwordRecords.push(newPasswordRecord);
    res.status(201).json(newPasswordRecord);
});

app.delete('/api/passwords/:id', (req, res) => {
    passwordRecords = passwordRecords.filter(record => record.id !== req.params.id);
    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
