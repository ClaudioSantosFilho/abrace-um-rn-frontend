export class DoarModel {
  getDonationOptions() {
    return [
      {
        id: 'money',
        title: 'DOAÇÃO EM DINHEIRO',
        icon: './assets/Icone-doar-em-dinheiro.svg',
        description: 'Contribua com qualquer valor para a compra de itens essenciais, como kits de higiene e enxoval, ou para ajudar a cobrir custos operacionais, como transporte e manutenção da sede.'
      },
      {
        id: 'used',
        title: 'DOAÇÃO DE ITENS USADOS',
        icon: './assets/Icone-doar-usados.svg',
        description: 'Doe roupas, brinquedos e outros itens de bebê que você não usa mais. Esses itens serão entregues diretamente às mães que precisam de ajuda.'
      },
      {
        id: 'store',
        title: 'COMPRE NA LOJINHA',
        icon: './assets/Icone-lojinha.svg',
        description: 'Apoie o projeto comprando produtos customizados na nossa lojinha. Todo o dinheiro arrecadado com as vendas será revertido para as ações sociais, ajudando ainda mais mães a cuidarem dos seus bebês.'
      }
    ];
  }

  getSectionContent(type) {
    if (type === 'money' || !type) {
      return `
        <div class="mt-5 bg-white rounded-4 p-4 shadow-sm text-center">
          <div class="qr-container d-flex flex-column align-items-center">
            <h2 class="h3 mb-4 fw-semibold" style="color: var(--rosa-escuro)">Faça sua doação aqui:</h2>
            <div class="gap-3 d-flex flex-column align-items-center">
              <img class="qr-code rounded" src="./assets/qrcode-pix.jpeg" width="200" height="auto" alt="QR Code">
              <h4 class="mt-3 px-3 fw-semibold text-secondary">Chave PIX: 262.191.664-34</h4>
              <h5 class="mt-2 px-3 fw-medium text-secondary">Nome: Maria Cavalcanti Freire</h5>
              <h5 class="mt-2 px-3 fw-medium text-secondary">Banco: Banco do Brasil</h5>
              <app-button variant="pequeno-rosa" class="mt-3" id="btn-copy-pix">Copiar chave PIX</app-button>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'used') {
      return `
        <div class="map-section mt-5 bg-white rounded-4 p-4 shadow-sm">
          <h2 class="h3 mb-4 fw-semibold text-center" style="color: var(--rosa-escuro)">Nosso ponto de coleta:</h2>
          <div class="mb-4 w-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0656829416166!2d-35.905250223923396!3d-7.23334897104028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ac1e170824dd0d%3A0x6ddbf69d2214cb03!2sR.%20do%20Sol%2C%20853%20-%20Santa%20Rosa%2C%20Campina%20Grande%20-%20PB%2C%2058416-280!5e0!3m2!1spt-BR!2sbr!4v1757420622839!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="450" 
              style="border:0; border-radius: 8px;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      `;
    } else if (type === 'store') {
      return `
        <div class="mt-5 bg-white rounded-4 p-4 shadow-sm text-center">
          <h2 class="h3 mb-4 fw-semibold" style="color: var(--rosa-escuro)">Visite Nossa Lojinha Virtual!</h2>
          <p class="fs-5 text-secondary mb-4 mx-auto" style="max-width: 600px;">
            Que tal apoiar uma causa especial e, ao mesmo tempo, levar para
            casa produtos lindos? Na nossa lojinha, todo o dinheiro arrecadado
            é destinado a ajudar mães e bebês em situação de vulnerabilidade.
          </p>
          <app-button href="lojinha.html" variant="rosa-letra-branca">Acesse a Lojinha Agora</app-button>
        </div>
      `;
    }
  }
}
