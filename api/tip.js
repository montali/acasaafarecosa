module.exports = (req, res) => {
  const { readFileSync } = require("fs");
  const { join } = require("path");
  const mySchema = readFileSync(join(__dirname, "tips.json")).toString("utf8");
  var tips = JSON.parse(mySchema);
  const theChosenOne = tips[Math.floor(Math.random() * tips.length)];
  res.status(200).json(theChosenOne);
};
