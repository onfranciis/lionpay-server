const express = require("express");
const port = 8080;
const app = express();

app.get("/", (req, res) => {
  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server has successfully started on port:${port}`);
});
