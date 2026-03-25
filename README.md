# Environment Variables & Dynamic Page Content

This project uses **Azure App Service environment variables** to control page content dynamically **without redeploying code**, and follows a **safe GitHub branching workflow** to protect the live environment.

---

## Overview

- Environment variables are configured in **Azure**
- The backend (`index.js`) exposes variables to the frontend
- Frontend JavaScript injects values into the HTML
- Each page can have its own SEO metadata
- GitHub branches ensure safe development and deployment
- Azure automatically deploys code from the **main** branch

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
   - **Value**: The text you want displayed on the page
5. ✅ Tick **Deployment slot setting** (if using slots)
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

```html
<p id="book_paragraph"></p>
```

---

## 5. Creating a New Page

1. Create a new file inside the `public/` folder
2. Copy the structure from `index.html`
3. Ensure required scripts are included:

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

## 7. Adding Dynamic Buttons

### Example Azure Environment Variables

```text
HOME_BUTTONICON_1   = icon-image.svg
HOME_BUTTONTITLE_1  = Home
HOME_BUTTONURL_1    = index.html
```

### Rules

- Keep naming consistent across Azure, backend, JS, and HTML
- Extend numbering if more than 3 buttons are required
- Use page-specific prefixes (e.g. `BOOK_`) when needed

---

## 8. GitHub Branch Strategy

| Branch | Purpose |
|------|--------|
| **main** | Live / production (auto‑deployed to Azure) |
| **beta** | Stable mirror of `main` |
| **dev** | Active development and testing |

### Rules

- `main` and `beta` must always be identical
- Never develop directly on `main`
- All changes must be tested locally and in **dev** before merging

---

## 9. Development Workflow

### Step 1: Clone from `beta`

```bash
git clone -b beta https://github.com/your-repo/project-name.git
cd project-name
```

### Step 2: Create or Switch to `dev`

```bash
git checkout -b dev
```

### Step 3: Test Locally

- Run the project on localhost
- Verify pages, buttons, environment variables, and SEO metadata

### Step 4: Push to `dev`

```bash
git add .
git commit -m "Feature update"
git push origin dev
```

### Step 5: Verify Dev Environment

- Deploy `dev` to the Dev Azure environment
- Confirm everything works smoothly

### Step 6: Merge `dev` → `beta`

```bash
git checkout beta
git merge dev
git push origin beta
```

### Step 7: Merge `beta` → `main`

```bash
git checkout main
git merge beta
git push origin main
```

---

## 10. Azure Deployment

- Azure App Service is connected to the **main** branch
- Any push to `main` triggers automatic deployment
- Updates go live immediately for client access

---

## Notes

- No redeploy required to update content
- Safe fallbacks prevent blank pages
- Easy rollback using Git
- Scales well for multi-page sites
