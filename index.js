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
    // Buttion
homeButtons: [
  {
    url: process.env.HOME_BUTTON_URL_1 || "index.html",
    icon: process.env.HOME_BUTTON_ICON_1 || "🏠",
    text: process.env.HOME_BUTTON_TEXT_1 || "Home"
  },
  {
    url: process.env.HOME_BUTTON_URL_2 || "book.html",
    icon: process.env.HOME_BUTTON_ICON_2 || "📆",
    text: process.env.HOME_BUTTON_TEXT_2 || "Booking VRS"
  },
  {
    url: process.env.HOME_BUTTON_URL_3 || "vrs.html",
    icon: process.env.HOME_BUTTON_ICON_3 || "🎥",
    text: process.env.HOME_BUTTON_TEXT_3 || "VRS"
  }
],

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