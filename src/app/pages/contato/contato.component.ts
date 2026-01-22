import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  
  contactForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]], 
      message: ['', Validators.required]
    });
  }

  // Redireciona para o WhatsApp
  whatsapp(): void {    
    const phoneNumber = '71992886118';
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  // Abre o Google Maps em nova aba
  openMaps(): void {
    const address = encodeURIComponent('Rua da Bandeira, 44 - Centro, Camaçari - BA');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }

  // Envio do formulário
  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true; // Ativa loading

    try {
      // Chama o serviço do EmailJS
      await this.emailService.sendEmail(this.contactForm.value);
      
      alert('Mensagem enviada com sucesso!');
      this.contactForm.reset();
    } catch (error) {
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      this.loading = false; // Desativa loading
    }
  }
}