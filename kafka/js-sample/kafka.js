const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "js-sample-app",
  brokers: ["kafka:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const consumer = kafka.consumer({ groupId: "test-group" });

module.exports = { producer, consumer };
