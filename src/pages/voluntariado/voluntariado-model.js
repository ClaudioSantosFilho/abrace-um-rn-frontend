export class VoluntarioModel {
  // Rota Real
  // API_URL = "https://sheetdb.io/api/v1/db1c2w33lso24"
  API_URL = "https://sheetdb.io/api/v1/db1c2w33lso24";

  async cpfDuplicado(cpf) {
    const cpfLimpo = this.limparCPF(cpf);
    try {
      const response = await fetch(`${this.API_URL}/search?cpf=${cpfLimpo}`);
      const data = await response.json();
      return data.length > 0;
    } catch (e) {
      console.error('Erro ao buscar CPF duplicado', e);
      return false; 
    }
  }

  async enviarFormulario(dados) {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição', error);
      throw error;
    }
  }

  limparCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
  }
}
