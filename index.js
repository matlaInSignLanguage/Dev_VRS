const express = require("express");
const path = require("path");

// Load .env locally (ignored in Azure if not present)
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Debug route (REMOVE in production if needed)
app.get("/api/debug", (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    SEO_DESCRIPTION: process.env.SEO_DESCRIPTION,
    SEO_KEYWORD: process.env.SEO_KEYWORD
  });
});

// API route
app.get("/api/message", (req, res) => {
  res.json({
    // SEO
    seo_description: process.env.SEO_DESCRIPTION ?? "",
    seo_keyword: process.env.SEO_KEYWORD ?? "",

    // Google & analytics
    google_tag: process.env.GOOGLE_TAG ?? "",
    clarity_tag: process.env.CLARITY_TAG ?? "",

    // Home page
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

    // Book page
    book_title: process.env.BOOK_TITLE ?? "Book Appointment",
    book_link: process.env.BOOK_LINK ?? "",

    // Environment
    environment: process.env.NODE_ENV ?? "development"
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

  console.log("SEO_DESCRIPTION:", process.env.SEO_DESCRIPTION || "NOT SET");
});