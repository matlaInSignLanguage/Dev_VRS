    fetch("/api/message")
      .then(res => res.json())
      .then(data => {
        // Head enviroment variables
        document.getElementById("seo_description").innerText = data.seo_description;
        document.getElementById("seo_keyword").innerText = data.seo_keyword;
        document.getElementById("google_tag").innerText = data.google_tag;
        document.getElementById("clarity_tag").innerText = data.clarity_tag;

        // Home page
        document.getElementById("home_title").innerText = data.home_title;
        document.getElementById("home_paragraph").innerText = data.home_paragraph;
        // Book page
        document.getElementById("book_title").innerText = data.book_title;
        document.getElementById("book_link").innerText = data.book_link;

      })
      .catch(err => {
        // Head enviroment variables
        document.getElementById("seo_description").innerText = "Error: loading message";
        document.getElementById("seo_keyword").innerText = "Error: loading message";
        document.getElementById("google_tag").innerText = "Error: loading message";
        document.getElementById("clarity_tag").innerText = "Error: loading message";
        // Home page
        document.getElementById("home_title").innerText = "Error: loading message";
        document.getElementById("home_paragraph").innerText = "Error: loading message";
        // Book page
        document.getElementById("book_title").innerText = "Error: loading message";
        document.getElementById("book_link").innerText = "Error: link not found";
      });
