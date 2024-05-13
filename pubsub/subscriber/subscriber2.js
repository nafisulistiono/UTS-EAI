const amqp = require("amqplib");
const moment = require("moment-timezone");
const logTimestamp = require("log-timestamp");

logTimestamp(
  () => `[${moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss.SSS")}]`
);

async function receiveMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'data-exchange';

  // Declare the exchange
  await channel.assertExchange(exchange, 'fanout', { durable: false });

  // Declare a queue
  const q = await channel.assertQueue('', { exclusive: true });

  // Bind the queue to the exchange
  await channel.bindQueue(q.queue, exchange, '');

  console.log(" [*] Menunggu pesan antrean 2");

  // Consume messages from the queue
  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      console.log(" [x] Received %s", msg.content.toString());
    }
  }, { noAck: true });
}

receiveMessage();
