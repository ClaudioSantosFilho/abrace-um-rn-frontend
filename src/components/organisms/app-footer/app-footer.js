class AppFooter extends HTMLElement {
  connectedCallback() {
    if (!document.querySelector('link[href*="app-footer.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/src/components/organisms/app-footer/app-footer.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[src*="social-links.js"]')) {
      const script = document.createElement('script');
      script.src = '/src/components/molecules/social-links/social-links.js';
      script.type = 'module';
      document.head.appendChild(script);
    }

    this.innerHTML = `
      <footer>
        <div class="footer-container">
          <div class="footer-left">
            <img src="./src/assets/shared/LogoTexto.png" alt="LogoText" class="footer-logo" />
          </div>
          <div class="footer-right">
            <p>Acompanhe nas redes</p>
            <social-links>
              <a target="_blank" href="https://www.instagram.com/abraceumrn/">
                <img src="./src/assets/shared/instagram.svg" alt="Instagram" />
              </a>
              <a target="_blank" href="https://api.whatsapp.com/send/?phone=5583987075415&text=&type=phone_number&app_absent=0">
                <img src="./src/assets/shared/wpp.svg" alt="WhatsApp" />
              </a>
            </social-links>
          </div>
        </div>
      </footer>
    `;
  }
}

if (!window.customElements.get('app-footer')) {
  window.customElements.define('app-footer', AppFooter);
}
