const express = require("express");
const app = express();
const data = require("./data");
const PORT = 5000;
const { Parser } = require("json2csv");
const fs = require("fs");

app.get("/data", async (req, res) => {
  try {
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

app.get("/download", (req, res) => {
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    fs.writeFile("employee.csv", csv, function (err) {
      if (err) {
        throw err;
      } else {
        console.log("file saved");
      }
    });
    res.download("employee.csv");
    res.status(200).send(csv);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
