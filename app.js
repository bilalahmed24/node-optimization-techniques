// "use strict";
// process.env.UV_THREADPOOL_SIZE = 2;

// const OS = require("os");
const WorkerCon = require("./worker-pool/controller");
const express = require("express");
const app = express();
const processId = process.pid;
// const BCrypt = require("bcrypt");

const PORT = process.env.PORT || 3000;

//console.log(OS.cpus().length);

// app.get("/bcrypt", async (req, res) => {
//   const hash = await BCrypt.hash("It is working maybe ?", 10);

//   res.end(hash);
// });

app.get("/bcrypt", async (req, res) => {
  let result = null;
  let workerPool = WorkerCon.get();

  result = await workerPool.bcryptHash("It is working maybe ?");
  res.send(result);
});

// app.get("/", (req, res) => {
//   res.send("working maybe?");
// });

//const promise1 = new Promise((res,rej)=>res(3));

//process.env.UV_THREADPOOL_SIZE = OS.cpus().length

// setTimeout(() => {
//   console.log("1st timeout");
// }, 1000);
// setTimeout(() => {
//   console.log("2nd timeout");
// }, 2000);
// setTimeout(() => {
//   console.log("3rd timeout");
// }, 3000);

app.get("/", (req, res) => res.send("Working"));

app.get("/1", (req, res) => {
  res.setTimeout(2000, () => {
    console.log("Request has timed out.");
    res.status(500).end("Response Processing Timed Out.");
  });
  console.log("Got request.");
  while (true) {}
});

// app.get("/", async (req, res) => await setTimeout(() => res.send("Working"), 4000));
// app.get("/1", (req, res) => res.send("Working from 1"));

(async () => {
  // Init Worker Pool

  const options = { minWorkers: "max" };
  await WorkerCon.init(options);

  // Start Server
  var server = app.listen(PORT, () => {
    server.timeout = 2000;
    //server.close();
    console.log(
      `Running on port ${PORT} with processId ${processId} and threadPool ${process.env.UV_THREADPOOL_SIZE}, and server timeout is ${server.timeout}`
    );
  });
})();

//PM2
//https://dev.to/johnjardincodes/increase-node-js-performance-with-libuv-thread-pool-5h10
//https://www.youtube.com/watch?v=fVKPrDrEwTI
// a single tcp connection can server a single request at a time
// http1.1 -> browser establish multiple(6 commonly) TCP connections(multiple sockets) ...
//... to server to serve multiple reqs from client.
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x

//LEARN HTTP2 usage

//https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#:~:text=The%20event%20loop%20is%20what,operations%20executing%20in%20the%20background.
//https://www.youtube.com/watch?v=GQlgR_69dmI

//https://www.youtube.com/watch?v=W0go0ve1XE0
