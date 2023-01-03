const { consumer } = require("./kafka");

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "topic-sample", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        log: "message read",
        topic: topic,
        message: message.value.toString(),
      });
    },
  });
})();
