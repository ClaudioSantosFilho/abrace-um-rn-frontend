class AppHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = window.location.pathname;
    
    // Check if the stylesheet is already injected into the head
    if (!document.querySelector('link[href*="app-header.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/components/organisms/app-header/app-header.css';
      document.head.appendChild(link);
    }
    
    // Also load app-button atom if not loaded, since organisms use atoms
    if (!document.querySelector('script[src*="app-button.js"]')) {
      const script = document.createElement('script');
      script.src = '/src/components/atoms/app-button/app-button.js';
      script.type = 'module';
      document.head.appendChild(script);
    }

    this.innerHTML = `
    <header class="app-header">
      <div class="container app-header-content">
        <a href="index.html" class="logo">
          <img src="assets/Logo.png" width="80" height="60" />
        </a>

        <div class="desktop-nav">
          <ul class="desktop-nav-links">
            <li>
              <a class="${
                currentPage === '/' || currentPage.includes('index.html')
                  ? 'active'
                  : ''
              }" href="index.html">Início</a>
            </li>
            <li>
              <a class="${
                currentPage.includes('galeria.html') ? 'active' : ''
              }" href="galeria.html">Galeria</a>
            </li>
            <li>
              <a class="${
                currentPage.includes('lojinha.html') ? 'active' : ''
              }" href="lojinha.html">Lojinha</a>
            </li>
            <li>
              <a class="${
                currentPage.includes('voluntarie-se.html') ? 'active' : ''
              }" href="voluntarie-se.html">Voluntarie-se</a>
            </li>
            <li>
              <a class="${
                currentPage.includes('sobre.html') ? 'active' : ''
              }" href="sobre.html">Sobre</a>
            </li>
          </ul>

          <div class="desktop-nav-buttons">
            <app-button href="receber.html" variant="pequeno-rosa">
              Receber
            </app-button>
            <app-button href="doar-inicial.html" variant="pequeno-azul">
              Doar
            </app-button>
          </div>
        </div>

        <div class="nav-toggle navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Abrir menu">
          <span class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>

        <div class="offcanvas sidebar-container offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <a href="index.html" class="logo">
              <img src="assets/Logo.png" width="80" height="60" />
            </a>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Fechar"></button>
          </div>

          <div class="offcanvas-body sidebar">
            <ul class="nav-links sidebar-nav-links">
              <li>
                <a class="${
                  currentPage === '/' || currentPage.includes('index.html')
                    ? 'active'
                    : ''
                }" href="index.html">Início</a>
              </li>
              <li>
                <a class="${
                  currentPage.includes('galeria.html') ? 'active' : ''
                }" href="galeria.html">Galeria</a>
              </li>
              <li>
                <a class="${
                  currentPage.includes('lojinha.html') ? 'active' : ''
                }" href="lojinha.html">Lojinha</a>
              </li>
              <li>
                <a class="${
                  currentPage.includes('voluntarie-se.html') ? 'active' : ''
                }" href="voluntarie-se.html">Voluntarie-se</a>
              </li>
              <li>
                <a class="${
                  currentPage.includes('sobre.html') ? 'active' : ''
                }" href="sobre.html">Sobre</a>
              </li>
            </ul>

            <div class="sidebar-buttons">
              <app-button href="receber.html" variant="pequeno-rosa">
                Receber
              </app-button>
              <app-button href="doar-inicial.html" variant="pequeno-azul">
                Doar
              </app-button>
            </div>
          </div>
        </div>
      </div>
    </header>
`;
  }
}

if (!window.customElements.get('app-header')) {
  window.customElements.define('app-header', AppHeader);
}
