import { VoluntarioModel } from './voluntariado-model.js';

export class VoluntarioViewModel {
  constructor() {
    this.model = new VoluntarioModel();
    this.errors = {};
    
    this.formElement = null;
    this.cpfField = null;
    this.telefoneField = null;
    this.btnEnviar = null;
    
    this.toast = null;
    this.errorToast = null;
    this.errorToastEl = null;

    this.init();
  }

  init() {
    this.formElement = document.querySelector('#form-voluntario.needs-validation');
    
    if (!this.formElement) return;

    this.cpfField = this.formElement.querySelector('#cpf');
    this.telefoneField = this.formElement.querySelector('#phone');
    this.btnEnviar = this.formElement.querySelector('.btn-form-voluntario');

    const toastEl = document.getElementById('successToast');
    if (toastEl) this.toast = new bootstrap.Toast(toastEl);
    
    this.errorToastEl = document.getElementById('errorToast');
    if (this.errorToastEl) this.errorToast = new bootstrap.Toast(this.errorToastEl);

    // Binds
    this.handleCpfInput = this.handleCpfInput.bind(this);
    this.handleTelefoneInput = this.handleTelefoneInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Listeners
    if (this.cpfField) this.cpfField.addEventListener('input', this.handleCpfInput);
    if (this.telefoneField) this.telefoneField.addEventListener('input', this.handleTelefoneInput);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  handleCpfInput() {
    const cpfValue = this.model.limparCPF(this.cpfField.value);
    if (cpfValue.length === 11) {
      this.cpfField.setCustomValidity('');
      delete this.errors.cpf;
    } else {
      this.cpfField.setCustomValidity('CPF inválido. Deve conter 11 dígitos.');
    }
  }

  handleTelefoneInput() {
    const telefoneValue = this.telefoneField.value.replace(/\D/g, '');
    if (telefoneValue.length >= 11) {
      this.telefoneField.setCustomValidity('');
      delete this.errors.telefone;
    } else {
      this.telefoneField.setCustomValidity('Telefone inválido. Deve conter pelo menos 11 dígitos.');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.formElement.classList.remove('was-validated');
    const formData = new FormData(this.formElement);
    const data = {};

    formData.forEach((value, key) => {
      let finalValue = value;

      if (key === 'cpf') {
        finalValue = this.model.limparCPF(value);
      }

      if (key === 'cpf' && this.model.limparCPF(value).length !== 11) {
        this.errors.cpf = {
          field: this.cpfField,
          message: 'CPF inválido. Deve conter 11 dígitos.',
        };
      }

      if (key === 'phone') {
        finalValue = value.replace(/\D/g, '');
      }

      if (key === 'phone' && value.replace(/\D/g, '').length < 11) {
        this.errors.telefone = {
          field: this.telefoneField,
          message: 'Telefone inválido. Deve conter pelo menos 11 dígitos.',
        };
      }

      data[key] = finalValue;
    });

    if (!this.formElement.checkValidity() || Object.values(this.errors).length > 0) {
        
      if (Object.values(this.errors).length > 0) {
        const firstErrorField = Object.values(this.errors)[0];
        firstErrorField.field.focus();
    
        Object.values(this.errors).forEach((input) => {
          input.field.classList.add('is-invalid');
          input.field.setCustomValidity(input.message);
        });
      }

      this.formElement.classList.add('was-validated');
      return;
    }

    this.btnEnviar.disabled = true;
    this.btnEnviar.textContent = 'Enviando...';

    // Validation against server
    const isCpfDuplicate = await this.model.cpfDuplicado(data.cpf);
    if (isCpfDuplicate) {
      if (this.errorToastEl) {
         this.errorToastEl.querySelector('.toast-body').textContent =
           'Já identificamos uma solicitação com esse CPF. Caso tenha alguma dúvida ou precise atualizar suas informações, entre em contato conosco.';
      }
      if (this.errorToast) this.errorToast.show();
      this.resetButton();
      return;
    }

    // Attempt push
    try {
      await this.model.enviarFormulario({
        nome: data.name,
        cpf: data.cpf,
        telefone: data.phone,
        email: data.email,
        mensagem: data.message,
        cidade: data.city,
        ajuda: data['help-type'],
      });

      if (this.toast) this.toast.show();
      this.formElement.reset();
      this.formElement.classList.remove('was-validated');
    } catch (err) {
      if (this.errorToast) this.errorToast.show();
    }

    this.resetButton();
  }

  resetButton() {
     this.btnEnviar.disabled = false;
     this.btnEnviar.textContent = 'Enviar';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VoluntarioViewModel();
});
