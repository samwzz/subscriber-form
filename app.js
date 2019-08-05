const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise');
const data = require('./data');
const config = require('./config');
const app = express()
const port = 3000

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
      'X-API-KEY': config['X-API-KEY'],
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))