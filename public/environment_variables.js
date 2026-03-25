fetch("/api/message")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
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
    if (data.google_tag && !window.gtag) {
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
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;
        t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", data.clarity_tag);
    }

    // Home content
    const homeTitle = document.getElementById("home_title");
    const homePara = document.getElementById("home_paragraph");

    if (homeTitle) homeTitle.innerText = data.home_title || "";
    if (homePara) homePara.innerHTML = data.home_paragraph || "";

    // Buttons (fixed mapping — NO string replace hacks)
    for (let i = 1; i <= 3; i++) {
      const urlEl = document.getElementById(`homeButtionUrl_${i}`);
      const iconEl = document.getElementById(`homeButtionIcon_${i}`);
      const textEl = document.getElementById(`homeButtionText_${i}`);

      const urlKey = `homeButtionUrl_${i}`;
      const iconKey = `homeButtionIcon_${i}`;
      const textKey = `homeButtionText_${i}`;

      if (urlEl) urlEl.href = data[urlKey] || "#";
      if (iconEl) iconEl.innerText = data[iconKey] || "";
      if (textEl) textEl.innerText = data[textKey] || "";
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

  })
  .catch(err => {
    console.error("Failed to load API data:", err);
  });