const express = require("express");
const cors = require("cors");
const wait = require("./src/wait");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/test", (req, res) => res.send({ message: "Hello World!" }));

app.get("/stream", async function (req, res) {
  res.write("Starting...\n");
  for (let i = 1; i <= 10; i++) {
    await wait(500);
    console.log(`${i},testing`);
    res.write(`${i},testing\n`);
  }

  res.write("wait a little bit more...\n");
  await wait(5000);
  res.write("finished!!!");

  res.end();
});

app.listen(3333, () => {
  console.log("running on 3333");
});
