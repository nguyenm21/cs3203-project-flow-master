const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const { Console } = require("console");
const cors = require("cors");

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3030;
const mass = [];

console.log(JSON.stringify(mass));

app.get("/get", cors(), function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  res.send({ data: mass[mass.length - 1] });
  console.log(JSON.stringify(mass));
});

app.get("/cors", (req, res) => {
  res.send("This has CORS enabled 🎈");
});
app.post("/collect", cors(), async (req, res) => {
  const data = req.body.data;
  // mass = [];
  mass.push(data);
  console.log(JSON.stringify(mass));
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
