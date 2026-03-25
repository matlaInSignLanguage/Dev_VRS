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

const mapKey = (key) => key.replace("homeButtion", "home_buttion");

const count = 3;

for (let i = 1; i <= count; i++) {
  const urlEl = document.getElementById(`homeButtionUrl_${i}`);
  const iconEl = document.getElementById(`homeButtionIcon_${i}`);
  const textEl = document.getElementById(`homeButtionText_${i}`);

  const urlKey = mapKey(`homeButtionUrl_${i}`);
  const iconKey = mapKey(`homeButtionIcon_${i}`);
  const textKey = mapKey(`homeButtionText_${i}`);

  if (urlEl) urlEl.href = data?.[urlKey] || "";
  if (iconEl) iconEl.innerText = data?.[iconKey] || "";
  if (textEl) textEl.innerText = data?.[textKey] || "";
}
    // const homeButtionUrl_1 = document.getElementById("homeButtionUrl_1");
    // const homeButtionUrl_2 = document.getElementById("homeButtionUrl_2");
    // const homeButtionUrl_3 = document.getElementById("homeButtionUrl_3");   
    // const homeButtionIcon_1 = document.getElementById("homeButtionIcon_1");
    // const homeButtionIcon_2 = document.getElementById("homeButtionIcon_2");
    // const homeButtionIcon_3 = document.getElementById("homeButtionIcon_3");    
    // const homeButtionText_1 = document.getElementById("homeButtionText_1");
    // const homeButtionText_2 = document.getElementById("homeButtionText_2");
    // const homeButtionText_3 = document.getElementById("homeButtionText_3");

    // if (homeTitle) homeTitle.innerText = data.home_title || "";
    // if (homePara) homePara.innerText = data.home_paragraph || "";
    // if (homeButtionUrl_1 && data.homeButtionUrl_1) 
    //   homeButtionUrl_1.href = data.homeButtionUrl_1   || "";
    // if (homeButtionUrl_2 && data.homeButtionUrl_2)  
    //   homeButtionUrl_2.href = data.homeButtionUrl_2   || "";
    // if (homeButtionUrl_3 && data.homeButtionUrl_3)  
    //   homeButtionUrl_3.href = data.homeButtionUrl_3   || "";   
    // if (homeButtionIcon_1) homeButtionIcon_1.innerText = data.homeButtionIcon_1 || "";
    // if (homeButtionIcon_2) homeButtionIcon_2.innerText = data.homeButtionIcon_2 || "";
    // if (homeButtionIcon_3) homeButtionIcon_3.innerText = data.homeButtionIcon_3 || ""; 
    // if (homeButtionText_1) homeButtionText_1.innerText = data.homeButtionText_1 || "";
    // if (homeButtionText_2) homeButtionText_2.innerText = data.homeButtionText_2 || "";
    // if (homeButtionText_3) homeButtionText_3.innerText = data.homeButtionText_3 || "";

    // Book iframe
    const bookTitle = document.getElementById("book_title");
    const iframe = document.getElementById("book_link");

if (iframe && data.book_link) {
  iframe.src = data.book_link;

  iframe.onerror = () => {
    console.warn("Iframe blocked. Falling back to link.");
  };
}
if (bookTitle) bookTitle.innerHTML = data.book_title || "";

  })
  .catch(err => {
    console.error("Failed to load API data:", err);
  });