class AppButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'href', 'type', 'disabled', 'target'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'pequeno-rosa';
    const href = this.getAttribute('href');
    const type = this.getAttribute('type') || 'button';
    const target = this.getAttribute('target');
    const disabled = this.hasAttribute('disabled');
    
    const isLink = !!href;
    const tag = isLink ? 'a' : 'button';
    
    let tagAttrs = `class="botao ${variant}"`;
    
    if (isLink) {
      tagAttrs += ` href="${href}"`;
      if (target) {
        tagAttrs += ` target="${target}"`;
      }
    } else {
      tagAttrs += ` type="${type}"`;
      if (disabled) {
        tagAttrs += ' disabled';
      }
    }

    // Determine absolute path to the CSS relative to the root, so it works from anywhere
    // Note: Assuming root of the project is where index.html is located.
    const cssPath = '/src/components/atoms/app-button/app-button.css';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      <${tag} ${tagAttrs}>
        <slot></slot>
      </${tag}>
    `;
  }
}

if (!window.customElements.get('app-button')) {
  window.customElements.define('app-button', AppButton);
}
