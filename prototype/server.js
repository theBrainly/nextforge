const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());
const auth = require('./auth');
app.get('/health', (req, res) => res.sendStatus(200));
// Update 1771332646730

// Update 1771332647192

// Update 1771332648026

// Update 1771332648255

// Update 1771332648300

// Update 1771332648707

// Update 1771332649093

// Update 1771332649141

// Update 1771332649662

// Update 1771332649710
