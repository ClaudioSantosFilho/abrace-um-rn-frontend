import { HomeModel } from './home-model.js';

export class HomeViewModel {
  constructor() {
    this.model = new HomeModel();
    this.init();
  }

  async init() {
    const ajudados = await this.model.getAjudados();
    this.renderCarousel(ajudados);
    this.bindScrollToTop();
  }

  renderCarousel(ajudados) {
    const container = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');
    if (!container || !indicators) return;

    container.innerHTML = '';
    indicators.innerHTML = '';

    ajudados.forEach((item, index) => {
      // Create Indicator
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('data-bs-target', '#carousel-conhecer-ajudados');
      button.setAttribute('data-bs-slide-to', index.toString());
      button.setAttribute('aria-label', `Slide ${index + 1}`);
      if (index === 0) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'true');
      }
      indicators.appendChild(button);

      // Create Item
      const itemDiv = document.createElement('div');
      itemDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
      itemDiv.innerHTML = `
        <div class="card-ajudados">
          <img src="${item.img}" alt="Recém nascido ajudado" width="393" height="479" />
          <p>${item.text}</p>
        </div>
      `;
      container.appendChild(itemDiv);
    });
  }

  bindScrollToTop() {
    const btn = document.querySelector('.rolar-pra-cima');
    if (btn) {
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

// Bind to view
document.addEventListener('DOMContentLoaded', () => {
  new HomeViewModel();
});
