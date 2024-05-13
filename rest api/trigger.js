const express = require('express');
const axios = require('axios');
const moment = require("moment-timezone");
const logTimestamp = require("log-timestamp");

logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint untuk mengirimkan data
app.post('/send-data', async (req, res) => {
  const data = req.body;

  try {

    res.send('Data sent successfully to multiple services.');
  } catch (error) {
    console.error('Error sending data:', error.message);
    res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`Sender service is running at http://localhost:${port}`);
});