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
    
    // Listen to custom events from the web components
    document.addEventListener('view-details', (e) => {
        const id = e.detail?.id || e.target.getAttribute('produto-id');
        this.abrirDetalheProduto(Number(id));
    });

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
      <product-card produto-id="${produto.id}" nome="${produto.nome}" descricao="${produto.descricao}" imagem="${produto.imagem}">
        <app-button slot="action" variant="pequeno-rosa" onclick="event.stopPropagation(); entrarEmContato(${produto.id})">
           <i class="material-icons me-2" style="font-size: 18px">message</i> Enviar DM
        </app-button>
      </product-card>
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

    let modal = document.querySelector('product-modal');
    if (!modal) {
        modal = document.createElement('product-modal');
        document.body.appendChild(modal);
    }
    
    modal.setAttribute('produto-id', produto.id);
    modal.setAttribute('nome', produto.nome);
    modal.setAttribute('descricao', produto.descricao);
    modal.setAttribute('imagem', produto.imagem);
    
    modal.innerHTML = `
      <div slot="actions" style="display: flex; gap: 1rem;">
        <app-button variant="pequeno-rosa" onclick="entrarEmContato(${produto.id})">
          <i class="material-icons me-2" style="font-size: 18px">message</i> Instagram
        </app-button>
        <app-button variant="pequeno-azul" onclick="entrarEmContatoWhatsApp(${produto.id})">
          <i class="material-icons me-2" style="font-size: 18px">phone</i> WhatsApp
        </app-button>
      </div>
    `;

    setTimeout(() => modal.show(), 10);
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
