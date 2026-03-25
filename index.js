const express = require("express");
const path = require("path");

const app = express();

// Port (Azure sets this automatically)
const port = process.env.PORT || 3000;

// Optional: load local .env (ignored in Azure if not present)
require("dotenv").config();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Health check (useful for Azure)
app.get("/health", (req, res) => {
  res.send("OK");
});

// API route
app.get("/api/message", (req, res) => {
  res.json({
    seo_description: process.env.SEO_DESCRIPTION ?? "",
    seo_keyword: process.env.SEO_KEYWORD ?? "",

    google_tag: process.env.GOOGLE_TAG ?? "",
    clarity_tag: process.env.CLARITY_TAG ?? "",

    home_title: process.env.HOME_TITLE ?? "Welcome InSignLanguage",
    home_paragraph: process.env.HOME_PARAGRAPH ?? "No paragraph found",

    homeButtionUrl_1: process.env.HOME_BUTTIONURL_1 ?? "",
    homeButtionUrl_2: process.env.HOME_BUTTIONURL_2 ?? "",
    homeButtionUrl_3: process.env.HOME_BUTTIONURL_3 ?? "",

    homeButtionIcon_1: process.env.HOME_BUTTIONICON_1 ?? "",
    homeButtionIcon_2: process.env.HOME_BUTTIONICON_2 ?? "",
    homeButtionIcon_3: process.env.HOME_BUTTIONICON_3 ?? "",

    homeButtionText_1: process.env.HOME_BUTTIONTEXT_1 ?? "",
    homeButtionText_2: process.env.HOME_BUTTIONTEXT_2 ?? "",
    homeButtionText_3: process.env.HOME_BUTTIONTEXT_3 ?? "",

    book_title: process.env.BOOK_TITLE ?? "Book Appointment",
    book_link: process.env.BOOK_LINK ?? "",

    environment: process.env.NODE_ENV ?? "development"
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});