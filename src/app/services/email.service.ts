import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // Substitua pelos seus IDs do painel do EmailJS
  private serviceID = 'service_0wzw6rl';   // Pegamos da sua imagem anterior
  private templateID = 'template_4xahqb9'; // O ID que você acabou de mandar
  private publicKey = 'XFc6j73k5YYkOSx_Z';

  constructor() {
    // Inicializa o EmailJS (opcional, mas recomendado)
    emailjs.init(this.publicKey);
  }

  // Método para enviar o e-mail
  async sendEmail(formValues: any): Promise<void> {
    try {
      // O objeto 'templateParams' deve ter as mesmas chaves que você usou no template do site
      // Ex: no site você colocou {{name}}, aqui deve ter { name: ... }
      const templateParams = {
        from_name: formValues.name,
        from_email: formValues.email,
        phone: formValues.number,
        message: formValues.message
      };

      const response = await emailjs.send(
        this.serviceID,
        this.templateID,
        templateParams,
        this.publicKey
      );

      console.log('SUCCESS!', response.status, response.text);
    } catch (error) {
      console.error('FAILED...', error);
      throw error; // Repassa o erro para o componente tratar
    }
  }
}