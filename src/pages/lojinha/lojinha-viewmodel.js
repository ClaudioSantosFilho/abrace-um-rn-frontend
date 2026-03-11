import { LojinhaModel } from './lojinha-model.js';

export class LojinhaViewModel {
  constructor() {
    this.model = new LojinhaModel();
    this.produtos = this.model.getProdutos();
    this.produtosFiltrados = [...this.produtos];

    this.searchInput = null;
    this.searchIcon = null;
    this.container = null;

    this.init();
  }

  init() {
    this.searchInput = document.getElementById('search');
    this.searchIcon = document.getElementById('search-icon');
    this.container = document.querySelector('.product-section');

    if (this.searchIcon) {
      this.searchIcon.addEventListener('click', () => this.toggleBusca());
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.buscarProdutos(e.target.value));
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.toggleBusca();
      });
    }

    this.renderizarProdutos();
    
    // Make global for modal interaction from inline HTML
    window.abrirDetalheProduto = this.abrirDetalheProduto.bind(this);
    window.fecharModal = this.fecharModal.bind(this);
    window.entrarEmContato = this.entrarEmContato.bind(this);
    window.entrarEmContatoWhatsApp = this.entrarEmContatoWhatsApp.bind(this);
  }

  renderizarProdutos() {
    if (!this.container) return;

    if (this.produtosFiltrados.length === 0) {
      this.container.innerHTML = `
        <div class="no-products text-center w-100 mt-5">
          <p class="fs-4 text-secondary">Nenhum produto encontrado.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = this.produtosFiltrados
      .map(
        (produto) => `
      <div class="product-card" onclick="abrirDetalheProduto(${produto.id})">
        <div class="product-image-container">
          <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" loading="lazy">
          <div class="product-overlay">
            <button class="btn-view-product">
              <i class="material-icons">visibility</i>
              Ver Produto
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-description">${produto.descricao}</p>
          <app-button variant="pequeno-rosa" onclick="event.stopPropagation(); entrarEmContato(${produto.id})">
            <i class="material-icons me-2" style="font-size: 18px">message</i> Enviar DM
          </app-button>
        </div>
      </div>
    `
      )
      .join('');
  }

  buscarProdutos(termo) {
    if (!termo.trim()) {
      this.produtosFiltrados = [...this.produtos];
    } else {
      this.produtosFiltrados = this.produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(termo.toLowerCase()) ||
          produto.categoria.toLowerCase().includes(termo.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(termo.toLowerCase())
      );
    }
    this.renderizarProdutos();
  }

  toggleBusca() {
    if (!this.searchInput) return;

    if (this.searchInput.style.display === 'none' || !this.searchInput.style.display) {
      this.searchInput.style.display = 'block';
      this.searchInput.style.width = '300px';
      this.searchInput.focus();
    } else {
      this.searchInput.style.display = 'none';
      this.searchInput.style.width = '0';
      this.searchInput.value = '';
      this.buscarProdutos('');
    }
  }

  abrirDetalheProduto(produtoId) {
    const produto = this.produtos.find((p) => p.id === produtoId);
    if (!produto) return;

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="fecharModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <button class="modal-close" onclick="fecharModal()">
            <i class="material-icons">close</i>
          </button>
          <div class="modal-body pb-0">
            <div class="modal-image">
              <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="modal-info">
              <h2>${produto.nome}</h2>
              <p class="modal-description">${produto.descricao}</p>
              <div class="modal-actions d-flex gap-3">
                <app-button variant="pequeno-rosa" onclick="entrarEmContato(${produto.id})">
                  <i class="material-icons me-2" style="font-size: 18px">message</i> Instagram
                </app-button>
                <app-button variant="pequeno-azul" onclick="entrarEmContatoWhatsApp(${produto.id})">
                  <i class="material-icons me-2" style="font-size: 18px">phone</i> WhatsApp
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
  }

  fecharModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    }
  }

  entrarEmContato() {
    window.open('https://www.instagram.com/lojinha.abraceumrn/', '_blank');
  }

  entrarEmContatoWhatsApp(produtoId) {
    const produto = this.produtos.find((p) => p.id === produtoId);
    if (!produto) return;

    const mensagem = `Olá! Tenho interesse no produto: ${produto.nome} da Lojinha Abrace um RN. Gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/5583987075415?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LojinhaViewModel();
});
