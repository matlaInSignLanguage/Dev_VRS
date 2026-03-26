const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

// -------------------------
// Middleware
// -------------------------
app.use(cors()); // allow cross-origin requests if needed
app.use(express.static(path.join(__dirname, "public")));

// -------------------------
// Helper: parse buttons JSON or fallback
// -------------------------
const getHomeButtons = () => {
  if (process.env.HOME_BUTTONS_JSON) {
    try {
      const parsed = JSON.parse(process.env.HOME_BUTTONS_JSON);
      if (Array.isArray(parsed)) return parsed;
    } catch (err) {
      console.warn("Invalid HOME_BUTTONS_JSON:", err);
    }
  }
  // default buttons
  return [
    {
      url: process.env.HOME_BUTTON_URL_1 || "index.html",
      icon: process.env.HOME_BUTTON_ICON_1 || "🏠",
      text: process.env.HOME_BUTTON_TEXT_1 || "Home"
    },
    {
      url: process.env.HOME_BUTTON_URL_2 || "book.html",
      icon: process.env.HOME_BUTTON_ICON_2 || "📆",
      text: process.env.HOME_BUTTON_TEXT_2 || "Book VRS"
    },
    {
      url: process.env.HOME_BUTTON_URL_3 || "join_call.html",
      icon: process.env.HOME_BUTTON_ICON_3 || "🎥",
      text: process.env.HOME_BUTTON_TEXT_3 || "Join a call"
    },
    {
      url: process.env.HOME_BUTTON_URL_4 || "start_call.html",
      icon: process.env.HOME_BUTTON_ICON_4 || "🎥",
      text: process.env.HOME_BUTTON_TEXT_4 || "Start a call"
    }
  ];
};

// -------------------------
// API endpoint
// -------------------------
app.get("/api/message", (req, res) => {
  res.json({
    seo: {
      description: process.env.SEO_DESCRIPTION || "",
      keyword: process.env.SEO_KEYWORD || ""
    },
    analytics: {
      google_tag: process.env.GOOGLE_TAG || "",
      clarity_tag: process.env.CLARITY_TAG || ""
    },
    header: {
      title: process.env.HOME_TITLE || "InSignLanguage"
    },
    home: {
      title: process.env.HOME_TITLE || "Welcome InSignLanguage",
      paragraph: process.env.HOME_PARAGRAPH || "",
      buttons: getHomeButtons()
    },
    book: {
      title: process.env.BOOK_TITLE || "Book Appointment",
      link: process.env.BOOK_LINK || ""
    },
    environment: process.env.NODE_ENV || "development"
  });
});

// -------------------------
// Start server
// -------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`http://localhost:${port}/`);
});