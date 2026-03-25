function loadLayout() {
  document.getElementById("header").innerHTML = `
  <header class="app-header">
    <div class="header-inner">
      <div class="left-group">
        <a href="index.html" class="brand">
          <img src="images/ms-icon-150x150.png"
               alt="InSignLanguage_logo"
               class="brand-logo" />
          <span class="brand-name">InSignLanguage</span>
        </a>

        <nav class="top-nav">
          <a class="nav-item" href="index.html">Home</a>
          <a class="nav-item" href="book.html">Book</a>
        </nav>
      </div>
    </div>
  </header>
`;

  document.getElementById("footer").innerHTML = `
    <footer class="app-footer">
      © 2017 - <span id="year"></span> InSignLanguage
    </footer>
  `;

  document.getElementById("year").textContent = new Date().getFullYear();
}