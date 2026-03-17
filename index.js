//-------------- only work on localhost ------------------------------

// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'public')));

// app.listen(PORT, () => {
// console.log(`Server running at http://localhost:${PORT}`);
// });

// --------------- AZURE ------------------------------------
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("App running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});