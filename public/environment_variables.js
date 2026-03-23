fetch("/api/message")
  .then(res => res.json())
  .then(data => {

    // SEO
    const desc = document.getElementById("seo_description");
    const key = document.getElementById("seo_keyword");

    if (desc) desc.setAttribute("content", data.seo_description || "");
    if (key) key.setAttribute("content", data.seo_keyword || "");

    // Prevent duplicate analytics
    const gtagLoaded = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');

    if (data.google_tag && !gtagLoaded) {
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${data.google_tag}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);

      const gtagConfig = document.createElement("script");
      gtagConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${data.google_tag}');
      `;
      document.head.appendChild(gtagConfig);
    }

    // Clarity
    const clarityLoaded = document.querySelector('script[src*="clarity.ms/tag"]');

    if (data.clarity_tag && !clarityLoaded) {
      const clarityScript = document.createElement("script");
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${data.clarity_tag}");
      `;
      document.head.appendChild(clarityScript);
    }

    // Home
    const homeTitle = document.getElementById("home_title");
    const homePara = document.getElementById("home_paragraph");

    if (homeTitle) homeTitle.innerText = data.home_title || "";
    if (homePara) homePara.innerText = data.home_paragraph || "";

    // Book iframe
    const iframe = document.getElementById("book_link");

    if (iframe && data.book_link) {
      iframe.src = data.book_link;
    }

  })
  .catch(err => {
    console.error("Failed to load API data:", err);
  });