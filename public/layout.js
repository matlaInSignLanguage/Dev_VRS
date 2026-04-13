function loadLayout() {
  document.getElementById("header").innerHTML = `
<header class="app-header">
  <div class="header-inner"> 
    <div class="left-group">
    <span id="header_title" class="brand-name">VRS</span>

    <nav class="top-nav" id="topNav">
  <a class="nav-item" href="/home">Options</a>
  <a class="nav-item" href="/book">Book</a>
  <a class="nav-item" href="/join">Join</a>
  <a class="nav-item" href="/start">Start</a>
</nav>

    <button class="menu-toggle" aria-label="Menu" aria-expanded="false">
      ☰
    </button>
  </div>
</header>
`;

  document.getElementById("footer").innerHTML = `
    <footer class="app-footer">
      © 2017 - <span id="year"></span> InSignLanguage
    </footer>
  `;

  document.getElementById("year").textContent = new Date().getFullYear();


  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.top-nav');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('open');

    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !expanded);
  });

}