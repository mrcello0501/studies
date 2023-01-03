const { producer } = require("./kafka");

(async () => {
  await producer.connect();
  const topic = "topic-sample";
  const message = "This is a message from nodejs-producer";
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  console.log({ log: "message sent!", topic, message });
  await producer.disconnect();
})();
