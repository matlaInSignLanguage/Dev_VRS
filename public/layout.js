function loadLayout() {
  document.getElementById("header").innerHTML = `
  <header class="app-header">
    <div class="header-inner">
      <div class="left-group">
      <span id="header_title" class="brand-name">InSignLanguage</span>

        <nav class="top-nav">
          <a class="nav-item" href="index.html">Home</a>
          <a class="nav-item" href="book.html">Book VRS</a>
          <a class="nav-item" href="join_call.html">Join a call</a>
          <a class="nav-item" href="start_call.html">Start a call</a>
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