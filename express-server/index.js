const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(bodyParser.json());

// Basic status route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

app.post('/verify', (req, res) => {
  const { pin } = req.body;

  if (typeof pin !== 'string' || pin.length !== 6 || pin[5] === '7') {
    return res.status(400).json({
      success: false,
      message: 'Verification Error: The last digit of the pin cannot be 7.'
    });
  }

  res.status(200).json({ success: true, token: 'sample-token' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
