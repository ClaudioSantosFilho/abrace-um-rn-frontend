class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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

  render() {
    const id = this.getAttribute('produto-id');
    const nome = this.getAttribute('nome') || '';
    const descricao = this.getAttribute('descricao') || '';
    const imagem = this.getAttribute('imagem') || '';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        @import url('src/components/molecules/product-card/product-card.css');
      </style>
      <div class="product-card" part="card">
        <div class="product-image-container">
          <img src="${imagem}" alt="${nome}" class="product-image" loading="lazy">
          <div class="product-overlay">
            <button class="btn-view-product" id="btn-view">
              <i class="material-icons">visibility</i>
              Ver Produto
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${nome}</h3>
          <p class="product-description">${descricao}</p>
          <slot name="action"></slot>
        </div>
      </div>
    `;

    const btnView = this.shadowRoot.getElementById('btn-view');
    const card = this.shadowRoot.querySelector('.product-card');

    if (btnView) {
        btnView.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('view-details', { detail: { id }, bubbles: true, composed: true }));
        });
    }

    if (card) {
        card.addEventListener('click', () => {
             this.dispatchEvent(new CustomEvent('view-details', { detail: { id }, bubbles: true, composed: true }));
        });
    }
  }
}

customElements.define('product-card', ProductCard);
