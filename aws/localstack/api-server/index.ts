import express from "express";
import fs from "node:fs";
import * as AWS from "aws-sdk";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = 3333;

const s3Service = new AWS.S3({
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint(process.env.S3_URL ?? "http://localhost:4566"),
});

app.get("/", (req, res) => {
  res.send({ working: true, hello: "World" });
});

app.get("/buckets", async (req, res) => {
  const { Buckets } = await s3Service.listBuckets().promise();
  res.send(Buckets);
});

app.get("/buckets/:bucket", async (req, res) => {
  try {
    const objects = await s3Service
      .listObjects({
        Bucket: req.params.bucket,
      })
      .promise();
    res.send(objects);
  } catch (error) {
    res.status(404).send({ message: "bucket was not found" });
  }
});

app.get("/buckets/:bucket/uploadSample", async (req, res) => {
  try {
    const { bucket } = req.params;
    const filename = crypto.randomUUID();
    await s3Service.putObject({
      Bucket: bucket,
      Key: filename,
      Body: fs.readFileSync("./sample.txt", "base64"),
    });
    res.send({ uploaded: true, bucket, filename });
  } catch (error) {
    res.status(404).send({ message: "bucket was not found" });
  }
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
