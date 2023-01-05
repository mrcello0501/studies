import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
const fs = require("fs");
import https from "https";
import cors from "cors";

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => "hello from trpc!"),
});

const app = express();
const port = 3333;

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // createContext: () => null,
  })
);

export type AppRouter = typeof appRouter;

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, () => {
    console.log(`api-server listening at https://localhost:${port}`);
  });
