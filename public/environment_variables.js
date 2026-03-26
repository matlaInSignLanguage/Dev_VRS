fetch("/api/message")
  .then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return res.json();
  })
  .then(data => {

    // SEO
    const desc = document.getElementById("seo_description");
    const key = document.getElementById("seo_keyword");

    if (desc) desc.setAttribute("content", data.seo_description || "");
    if (key) key.setAttribute("content", data.seo_keyword || "");

    // Google Tag
    if (data.google_tag && !document.querySelector(`script[src*="${data.google_tag}"]`)) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${data.google_tag}`;
      script.async = true;
      document.head.appendChild(script);

      const config = document.createElement("script");
      config.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${data.google_tag}');
      `;
      document.head.appendChild(config);
    }

    // Microsoft Clarity
    if (data.clarity_tag && !window.clarity) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () {
          (c[a].q = c[a].q || []).push(arguments)
        };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", data.clarity_tag);
    }
    // Head title
    const  headerTitle = document.getElementById("header_title");

    if (headerTitle) headerTitle.innerText.document.getElementById("header_title");


    // Home content
    const homeTitle = document.getElementById("home_title");
    const homePara = document.getElementById("home_paragraph");

    if (homeTitle) homeTitle.innerText = data.home_title || "";
    if (homePara) homePara.innerHTML = data.home_paragraph || "";

    // Buttons (dynamic rendering)
    const container = document.getElementById("homeButtons");

    if (container && Array.isArray(data.homeButtons)) {
      container.innerHTML = "";

      data.homeButtons.forEach(btn => {
        const el = document.createElement("a");
        el.className = "icon-button";
        el.href = btn.url || "#";

        el.innerHTML = `
          <span class="icon">${btn.icon || ""}</span>
          <span class="text">${btn.text || ""}</span>
        `;

        container.appendChild(el);
      });
    }

    // Book section
    const bookTitle = document.getElementById("book_title");
    const iframe = document.getElementById("book_link");

    if (bookTitle) bookTitle.innerText = data.book_title || "";

    if (iframe) {
      if (data.book_link) {
        iframe.src = data.book_link;
      } else {
        console.warn("No book_link provided");
      }
    }

    // join call
     const joinTitle = document.getElementById("join_title");
      if (joinTitle) joinTitle.innerText = data.join_title || "website under maintenance";
      
      // start call
     const startTitle = document.getElementById("start_title");
      if (startTitle) startTitle.innerText = data.start_title || "website under maintenance";

  })
  .catch(err => {
    console.error("Failed to load API data:", err);
  });