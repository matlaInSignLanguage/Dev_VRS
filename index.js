const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API route to send multiple environment variables
app.get("/api/message", (req, res) => {
  res.json({
    // SEO
    seo_description: process.env.SEO_DESCRIPTION || "",
    seo_keyword: process.env.SEO_KEYWORD || "",

    // Google & analytics
    google_tag: process.env.GOOGLE_TAG || "",
    clarity_tag: process.env.CLARITY_TAG || "",

    // Home page
    home_title: process.env.HOME_TITLE || "Welcome InSignLanguage",
    home_paragraph: process.env.HOME_PARAGRAPH || "No paragraph found",
    homeButtionUrl_1: process.env.HOME_BUTTIONURL_1 || "Button url 1",
    homeButtionUrl_2: process.env.HOME_BUTTIONURL_2 || "Button url 2",
    homeButtionUrl_3: process.env.HOME_BUTTIONURL_3 || "Button url 3",

    homeButtionIcon_1: process.env.HOME_BUTTIONICON_1 || "Button icon 1",
    homeButtionIcon_2: process.env.HOME_BUTTIONICON_2 || "Button icon 2",
    homeButtionIcon_3: process.env.HOME_BUTTIONICON_3 || "Button icon 3",

    homeButtionText_1: process.env.HOME_BUTTIONTEXT_1 || "Button text 1",
    homeButtionText_2: process.env.HOME_BUTTIONTEXT_2 || "Button text 2",
    homeButtionText_3: process.env.HOME_BUTTIONTEXT_3 || "Button text 3",

    // Book page
    book_title: process.env.BOOK_TITLE || "Book Appointment",
    book_link: process.env.BOOK_LINK || "",

    // Environment
    environment: process.env.NODE_ENV || "development"
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`http://localhost:${port}/`);
});