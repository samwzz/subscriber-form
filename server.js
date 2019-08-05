const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise');
const path = require('path');
const data = require('./data');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/teams', (req, res) => {
  res.send(data);
})

app.post('/api/subscribe', async (req, res) => {
  const options = {
    method: 'POST',
    uri: 'https://api.omnisend.com/v3/contacts/',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.X_API_KEY,
    },
    body: req.body,
    json: true,
  };
  try {
    const response = await rp(options);
    res.send(response);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e);
  }
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))