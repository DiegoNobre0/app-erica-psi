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

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    } 
      
    this.emailService.postEmail(this.contactForm.value).subscribe({
      next: () => {         
        alert('E-mail enviado com sucesso!');
        this.contactForm.reset(); 
      },
      error: (error) => {
        console.error('Erro:', error);
        alert('Erro ao enviar. Tente novamente.');
      }
    });
  }
}