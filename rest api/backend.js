const express = require('express');
const moment = require("moment-timezone");
const logTimestamp = require("log-timestamp");

logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

const app = express();
const port = 4000;

app.use(express.json());

// Endpoint untuk menerima data
app.post('/receive-data', (req, res) => {
  const data = req.body;
  console.log('Received data in Service 1:', data);
  res.send('Data received successfully in Service 1.');
});

app.listen(port, () => {
  console.log(`Receiver service 1 is running at http://localhost:${port}`);
});