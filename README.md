# Environment Variables & Dynamic Page Content

This project uses **Azure App Service environment variables** to control page content dynamically without redeploying code.

---

## Overview

- Environment variables are configured in **Azure**
- Backend (`index.js`) exposes variables to the frontend
- Frontend JavaScript injects values into HTML
- Each page can have its own SEO metadata

---

## 1. Add Environment Variables (Azure)

1. Open **Azure Web App**
2. Go to **Settings → Environment variables**
3. Click **Add**
4. Enter:
   - **Name** (ALL CAPS):  
     ```
     BOOK_PARAGRAPH
     ```
   - **Value**: Text you want displayed on the page
5. ✅ Tick **Deployment slot setting** (if used)
6. Click **Apply**
7. Click **Apply** again to restart the app

---

## 2. Backend Configuration

**File:** `index.js`

```js
book_paragraph: process.env.BOOK_PARAGRAPH || "Book page",
```

---

## 3. Frontend JavaScript

**File:** `public/environment_variables.js`

```js
const book_paragraph = document.getElementById("book_paragraph");

if (book_paragraph) {
  book_paragraph.innerHTML = data.book_paragraph || "";
}
```

---

## 4. HTML Page Setup

**Example:** `public/book.html`

```html
<p id="book_paragraph"></p>
```

---

## 5. Creating a New Page

1. Create a new file inside `public/`
2. Copy content from `index.html`
3. Ensure scripts are included:

```html
<script src="layout.js"></script>
<script src="environment_variables.js"></script>
```

4. Add required elements:

```html
<p id="book_paragraph"></p>
```

---

## 6. SEO & Open Graph Metadata

```html
<meta property="og:title" content="Book a Sign Language Appointment" />
<meta property="og:description" content="Book a Video Relay Service (VRS) appointment with qualified interpreters." />
<meta property="og:type" content="website" />
```

---

## Key Rules

- Environment variable names must be **CAPS ONLY**
- IDs must match across backend, JS, and HTML
- Restart app after changing environment variables
- One purpose per page for better SEO

---

## Example Mapping

| Azure Variable | Backend Key    |   HTML ID      |
|----------------|----------------|----------------|
| BOOK_PARAGRAPH | book_paragraph | book_paragraph |

---

## Notes

- No redeploy required to update content
- Safe fallbacks prevent blank pages
- Scales easily for multi-page sites
