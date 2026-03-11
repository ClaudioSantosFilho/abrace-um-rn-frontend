class ActionCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      this.render();
  }
  
  static get observedAttributes() {
      return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
          this.render();
      }
  }

  render() {
    const variant = this.getAttribute('variant') || 'rosa';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('src/components/molecules/action-card/action-card.css');
      </style>
      <div class="action-card variant-${variant}">
         <slot name="title"></slot>
         <div class="description">
            <slot name="description"></slot>
         </div>
         <slot name="action"></slot>
      </div>
    `;
  }
}

customElements.define('action-card', ActionCard);
