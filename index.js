const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API route to send multiple environment variables
app.get("/api/message", (req, res) => {
  res.json({
    home_title: process.env.HOME_TITLE || "Welcome InSignLanguage",
    home_paragraph: process.env.HOME_PARAGRAPH || "No paragraph found",
    environment: process.env.NODE_ENV || "development"
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}/`);
});