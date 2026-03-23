function loadLayout() {
  document.getElementById("header").innerHTML = `
    <header class="app-header">
      <div class="brand">
        <img src="images/ms-icon-150x150.png"
             alt="InSignLanguage_logo"
             class="brand-logo" />
        <span class="brand-name">InSignLanguage</span>
      </div>
    </header>
  `;

  document.getElementById("sidebar").innerHTML = `
    <aside class="app-sidebar">
      <nav>
        <a class="nav-item" href="index.html">Home</a>
        <a class="nav-item" href="book.html">Book</a>
      </nav>
    </aside>
  `;

  document.getElementById("footer").innerHTML = `
    <footer class="app-footer">
      © 2017 - <span id="year"></span> InSignLanguage
    </footer>
  `;

  document.getElementById("year").textContent = new Date().getFullYear();
}