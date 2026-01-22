import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  whatsapp(): void {    
    const phoneNumber = '71992886118';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

}