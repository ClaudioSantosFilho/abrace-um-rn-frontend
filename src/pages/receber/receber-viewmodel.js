import { ReceberModel } from './receber-model.js';

export class ReceberViewModel {
  constructor() {
    this.model = new ReceberModel();
    
    this.formElement = null;
    this.sendBtn = null;
    this.toastEl = null;

    this.init();
  }

  init() {
    this.formElement = document.getElementById('form-receber');
    
    if (!this.formElement) return;

    this.sendBtn = document.getElementById('sendFormReceber');
    this.toastEl = document.getElementById('meuToast');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.formElement);
    const data = {};

    formData.forEach((value, key) => {
      if (key === 'cpf') {
        value = this.model.limparCPF(value);
      }
      data[key] = value;
    });

    try {
      this.sendBtn.disabled = true;
      this.sendBtn.textContent = 'Enviando...';
      
      const isCpfDuplicate = await this.model.cpfDuplicado(data.cpf);

      if (isCpfDuplicate) {
        this.formElement.reset();
        alert('Já identificamos uma solicitação com esse CPF. Caso tenha alguma dúvida ou precise atualizar suas informações, entre em contato conosco.');
        this.resetButton();
        return;
      }
      
      await this.model.enviarFormulario(data);

      if (!this.toastEl) {
        console.error('Elemento toast não encontrado no DOM!');
      } else {
        const toast = new bootstrap.Toast(this.toastEl);
        toast.show();
      }
      
      this.formElement.reset();
      this.resetButton();
    } catch (error) {
      alert('Erro ao enviar o formulário. Tente novamente.');
      this.resetButton();
      console.error('Erro ao enviar:', error);
    }
  }

  resetButton() {
     this.sendBtn.disabled = false;
     this.sendBtn.textContent = 'Enviar';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ReceberViewModel();
});
