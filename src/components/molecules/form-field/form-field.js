class FormField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['label', 'for'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const labelText = this.getAttribute('label') || '';
    const forAttr = this.getAttribute('for') || '';
    
    const cssPath = '/src/components/molecules/form-field/form-field.css';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      ${labelText ? `<label for="${forAttr}">${labelText}</label>` : ''}
      <slot></slot>
    `;
  }
}

if (!window.customElements.get('form-field')) {
  window.customElements.define('form-field', FormField);
}
