import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-ws-psi';
  showLayout = true;

  constructor(private router: Router) {
    // Monitora as rotas para esconder a navbar/footer/whatsapp no biolink
    this.router.events.pipe(
      // O "event is NavigationEnd" avisa o TypeScript que, se passar daqui, o tipo foi refinado
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Agora o compilador aceita o 'urlAfterRedirects' sem reclamar
      this.showLayout = !event.urlAfterRedirects.includes('/biolink');
    });
  }
}