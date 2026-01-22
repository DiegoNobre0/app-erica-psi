import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // Controle de estado visual
  isScrolled: boolean = false; // Controla a cor de fundo (transparente vs branco)
  isHidden: boolean = false;   // Controla se o menu está escondido ou visível
  sidebarVisible: boolean = false;
  currentRoute: string = '';

  // Controle de posição para o efeito "Smart Scroll"
  private lastScrollPosition: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.isHidden = false; // Sempre mostra o menu ao mudar de página
        this.checkScroll(); 
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const currentScroll = window.scrollY || 0;

    // 1. LÓGICA DE COR (Transparente vs Branco)
    if (this.currentRoute !== '/' || currentScroll > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }

    // 2. LÓGICA DE ESCONDER/MOSTRAR (Smart Header)
    // Só ativa se já tiver descido um pouco (ex: 100px) para evitar "pulos" no topo
    if (currentScroll > 100) {
      if (currentScroll > this.lastScrollPosition) {
        // Se a posição atual for MAIOR que a anterior, está descendo -> ESCONDE
        this.isHidden = true;
      } else {
        // Se a posição atual for MENOR que a anterior, está subindo -> MOSTRA
        this.isHidden = false;
      }
    } else {
      // Se estiver no topo da página, sempre mostra
      this.isHidden = false;
    }

    // Atualiza a posição anterior para a próxima verificação
    this.lastScrollPosition = currentScroll;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarVisible = false;
  }
}