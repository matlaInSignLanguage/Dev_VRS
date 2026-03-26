function loadLayout() {
  document.getElementById("header").innerHTML = `
  <header class="app-header">
    <div class="header-inner">
      <div class="left-group">
      <span id="book_title" class="brand-name">InSignLanguage</span>

        <nav class="top-nav">
          <a class="nav-item" href="book.html">Home</a>
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