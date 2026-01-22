import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  contactForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService  
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]], // Regex ajustado para 10 ou 11 dígitos
      message: ['', Validators.required]
    }); 
  }

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