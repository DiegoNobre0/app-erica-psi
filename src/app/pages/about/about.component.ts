import { Component, HostListener, ElementRef, OnInit, OnDestroy, ApplicationRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private appRef: ApplicationRef,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'whatsapp',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/whatsapp.svg')
    );
  } 

  whatsapp(): void{    
    const phoneNumber = '71992886118';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seus serviços.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  ngOnInit(){   
    // this.openDialog();
  }
  

}
