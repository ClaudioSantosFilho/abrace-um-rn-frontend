class SocialLinks extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const cssPath = '/src/components/molecules/social-links/social-links.css';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      <div class="social-icons">
        <!-- Default slots for flexibility, or we can use predefined links if we want -->
        <slot></slot>
      </div>
    `;
  }
}

if (!window.customElements.get('social-links')) {
  window.customElements.define('social-links', SocialLinks);
}
