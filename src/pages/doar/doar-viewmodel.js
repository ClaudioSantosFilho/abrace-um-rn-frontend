import { DoarModel } from './doar-model.js';

export class DoarViewModel {
  constructor() {
    this.model = new DoarModel();
    this.init();
  }

  init() {
    this.renderCards();
    this.showSection('money'); // Default section
  }

  renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;

    const options = this.model.getDonationOptions();
    container.innerHTML = '';

    options.forEach(opt => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';

      const card = document.createElement('div');
      card.className = 'card h-100 shadow-sm border-0 root-card';
      card.style.cursor = 'pointer';
      card.style.transition = 'transform 0.2s';
      card.onmouseover = () => card.style.transform = 'translateY(-5px)';
      card.onmouseout = () => card.style.transform = 'translateY(0)';
      card.onclick = () => this.showSection(opt.id);

      card.innerHTML = `
        <div class="card-body text-center d-flex flex-column align-items-center p-4">
          <img src="${opt.icon}" alt="${opt.title}" class="card-icon mb-3" style="width: 64px; height: 64px;" />
          <h5 class="card-title fw-bold" style="color: var(--rosa-escuro)">${opt.title}</h5>
          <p class="card-text text-secondary mt-2">${opt.description}</p>
        </div>
      `;

      col.appendChild(card);
      container.appendChild(col);
    });
  }

  showSection(type) {
    const section = document.getElementById('section-content');
    if (!section) return;

    section.innerHTML = this.model.getSectionContent(type);
    
    // Smooth scroll to section if user is interacting with cards
    if (type !== 'money' || document.documentElement.scrollTop > 0) {
      setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }

    // Bind events for dynamically injected HTML
    if (type === 'money' || !type) {
      const btn = document.getElementById('btn-copy-pix');
      if (btn) {
        btn.addEventListener('click', (e) => this.copyPixOnClick(e));
      }
    }
  }

  copyPixOnClick(e) {
    navigator.clipboard.writeText('26219166434').then(() => {
      const btn = e.target;
      const originalText = btn.textContent;
      
      btn.textContent = 'Chave PIX copiada!';
      btn.setAttribute('disabled', 'true');
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.removeAttribute('disabled');
      }, 2000);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DoarViewModel();
});
