const amqp = require("amqplib");
const moment = require("moment-timezone");
const logTimestamp = require("log-timestamp");

logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

async function sendMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'data-exchange';
  const data = { message: 'Hello There!' };

  // Declare the exchange
  await channel.assertExchange(exchange, 'fanout', { durable: false });

  // Adding latency
  setTimeout(() => {
    // Publish the message to the exchange
    channel.publish(exchange, '', Buffer.from(JSON.stringify(data)));

    console.log(" [x] Sent %s", data);

    // Close connection after publishing
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  }, 1000); // 1000 milliseconds latency
}

sendMessage();