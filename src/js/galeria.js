// Informações de contato
const contatoInfo = {
  whatsapp: "(83) 98707-5415",
  whatsappLink: "https://wa.me/5583987075415",
  instagram: "@abraceumrn",
  instagramLink: "https://instagram.com/abraceumrn"
};

// Função para inicializar a galeria
function initGaleria() {
  const masonryItems = document.querySelectorAll('.masonry-item');
  
  masonryItems.forEach((item) => {
    const img = item.querySelector('.galeria-img');
    
    // Adicionar classe 'loaded' quando a imagem carregar para remover o shimmer
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
    
    // Se a imagem já estiver carregada
    if (img.complete) {
      img.classList.add('loaded');
    }
    
    // Adicionar evento de clique para abrir modal específico
    img.addEventListener('click', function() {
      openModal(item);
    });
  });
  
  // Inicializar animações baseadas em viewport
  initScrollAnimations();
}

// Função para inicializar animações baseadas em scroll/viewport
function initScrollAnimations() {
  const masonryItems = document.querySelectorAll('.masonry-item');
  
  // Pausar animações inicialmente
  masonryItems.forEach(item => {
    item.style.animationPlayState = 'paused';
  });
  
  // Observador de interseção para animar itens quando entram na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ativar animação quando o item entra no viewport
        entry.target.style.animationPlayState = 'running';
        
        // Parar de observar após animar (animar apenas uma vez)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger quando 10% do elemento estiver visível
    rootMargin: '0px 0px -50px 0px' // Trigger um pouco antes do elemento entrar completamente
  });
  
  // Observar todos os itens masonry
  masonryItems.forEach(item => {
    observer.observe(item);
  });
}

// Função para abrir o modal com dados específicos extraídos do HTML
function openModal(masonryItem) {
  const modal = document.getElementById('galeriaModal');
  const modalImage = document.getElementById('modalImage');
  const modalNome = document.getElementById('modalNome');
  const modalDescricao = document.getElementById('modalDescricao');
  const modalTipoAjuda = document.getElementById('modalTipoAjuda');
  const modalWhatsapp = document.getElementById('modalWhatsapp');
  const modalInstagram = document.getElementById('modalInstagram');
  
  // Extrair dados do elemento HTML usando data attributes
  const img = masonryItem.querySelector('.galeria-img');
  const dados = {
    nome: masonryItem.dataset.nome,
    descricao: masonryItem.dataset.descricao,
    tipoAjuda: masonryItem.dataset.tipoAjuda,
    imagem: img.src,
    alt: img.alt
  };
  
  // Preencher dados do modal
  modalImage.src = dados.imagem;
  modalImage.alt = dados.alt;
  modalNome.textContent = dados.nome;
  modalDescricao.textContent = dados.descricao;
  
  // Processar múltiplos tipos de ajuda separados por vírgula
  const tiposAjuda = dados.tipoAjuda ? dados.tipoAjuda.split(',').map(tipo => tipo.trim()) : [];
  
  // Limpar conteúdo anterior e criar badges para cada tipo
  modalTipoAjuda.innerHTML = '';
  tiposAjuda.forEach(tipo => {
    const badge = document.createElement('span');
    badge.textContent = tipo;
    badge.className = 'tipo-ajuda-badge';
    
    // Adicionar classe específica baseada no tipo para cores diferentes
    if (tipo.toLowerCase().includes('completo')) {
      badge.classList.add('kit-completo');
    } else if (tipo.toLowerCase().includes('roupinhas')) {
      badge.classList.add('kit-roupinhas');
    } else if (tipo.toLowerCase().includes('higiene')) {
      badge.classList.add('kit-higiene');
    }
    
    modalTipoAjuda.appendChild(badge);
  });
  
  // Configurar links de contato
  modalWhatsapp.href = contatoInfo.whatsappLink;
  modalWhatsapp.textContent = contatoInfo.whatsapp;
  modalInstagram.href = contatoInfo.instagramLink;
  modalInstagram.textContent = contatoInfo.instagram;
  
  // Mostrar modal
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initGaleria();
});
