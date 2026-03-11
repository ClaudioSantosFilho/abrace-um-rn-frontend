class ProductModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
      if(!this.hasAttribute('role')) {
          this.setAttribute('role', 'dialog');
      }
      this.render();
  }
  
  static get observedAttributes() {
      return ['produto-id', 'nome', 'descricao', 'imagem'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
          this.render();
      }
  }

  show() {
    const modal = this.shadowRoot.querySelector('.product-modal');
    if (modal) {
        modal.classList.add('show');
    }
  }

  close() {
    const modal = this.shadowRoot.querySelector('.product-modal');
    if (modal) {
        modal.classList.remove('show');
    }
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    const nome = this.getAttribute('nome') || '';
    const descricao = this.getAttribute('descricao') || '';
    const imagem = this.getAttribute('imagem') || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        @import url('src/components/organisms/product-modal/product-modal.css');
      </style>
      <div class="product-modal">
        <div class="modal-overlay">
          <div class="modal-content" role="document" tabindex="0">
            <button class="modal-close" aria-label="Fechar">
              <i class="material-icons">close</i>
            </button>
            <div class="modal-body">
              <div class="modal-image">
                <img src="${imagem}" alt="${nome}">
              </div>
              <div class="modal-info">
                <h2>${nome}</h2>
                <p class="modal-description">${descricao}</p>
                <div class="modal-actions">
                  <slot name="actions"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeBtn = this.shadowRoot.querySelector('.modal-close');
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    const content = this.shadowRoot.querySelector('.modal-content');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (overlay) overlay.addEventListener('click', () => this.close());
    if (content) content.addEventListener('click', (e) => e.stopPropagation());
  }
}

customElements.define('product-modal', ProductModal);
