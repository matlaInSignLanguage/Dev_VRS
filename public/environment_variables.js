// =========================
// Fetch API Data & Populate Pages
// =========================
fetch("/api/message")
  .then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return res.json();
  })
  .then(data => {

    // -------------------------
    // Helper functions
    // -------------------------
    const setText = (id, value = "", fallback = "") => {
      const el = document.getElementById(id);
      if (el) el.innerText = value || fallback;
    };

    const setHTML = (id, value = "", fallback = "") => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = value || fallback;
    };

    // -------------------------
    // SEO
    // -------------------------
    const desc = document.getElementById("seo_description");
    const key = document.getElementById("seo_keyword");

    const seoDesc =
      data?.seo_description ||
      "Book video relay service appointments with InSignLanguage. Fast and accessible online scheduling.";

    const seoKey =
      data?.seo_keyword ||
      "video relay service, VRS, sign language interpreter, BSL, online booking, accessibility";

    if (desc) {
      desc.setAttribute("content", seoDesc);
    }

    if (key) {
      key.setAttribute("content", seoKey);
    }
    // -------------------------
    // Google Tag Manager
    // -------------------------
    if (data.google_tag && !document.querySelector(`script[src*="${data.google_tag}"]`)) {
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${data.google_tag}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      const gtagConfig = document.createElement("script");
      gtagConfig.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${data.google_tag}');
      `;
      document.head.appendChild(gtagConfig);
    }

    // -------------------------
    // Microsoft Clarity
    // -------------------------
    if (data.clarity_tag && !window.clarity) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", data.clarity_tag);
    }

    // -------------------------
    // Header & Titles
    // -------------------------
    setText("header_title", data.header_title);

    setText("home_title", data.home_title);
    setHTML("home_paragraph", data.home_paragraph);
    setHTML("home_policy", data.home_policy);

    // -------------------------
    // Home Buttons (dynamic)
    // -------------------------
    const container = document.getElementById("homeButtons");
    if (container && Array.isArray(data.homeButtons)) {
      container.innerHTML = "";
      const frag = document.createDocumentFragment();

      data.homeButtons.forEach(btn => {
        const el = document.createElement("a");
        el.className = "icon-button";
        el.href = btn.url || "#";
        el.ariaLabel = btn.text || "button_link";
        el.innerHTML = `
          <span class="icon">${btn.icon || ""}</span>
          <span class="text">${btn.text || ""}</span>
        `;
        frag.appendChild(el);
      });

      container.appendChild(frag);
    }

    // -------------------------
    // Book section
    // -------------------------
    setText("book_title", data.book_title);

    const iframe = document.getElementById("book_link");
    if (iframe) {
      iframe.src = data.book_link || "about:blank";
      if (!data.book_link) console.warn("No book_link provided");
    }

  })
  .catch(err => {
    console.error("Failed to load API data:", err);
  });