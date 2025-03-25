import { Component, HostListener, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';
// import { PopupCadastroMedicamentoComponent } from '../popup-cadastro-medicamento/popup-cadastro-medicamento.component';
// import { MatDialog } from '@angular/material/dialog';
// import { MedicamentosService } from 'src/app/services/medicamentos.service';
// import { Medicamento } from 'src/app/model/medicamento';
// import { PopupLoginComponent } from '../popup-login/popup-login.component';
// import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,    
    private route: ActivatedRoute  
    ) {}

  rotaAtual = ""
  panelOpenState : boolean = false;
  loginLogout : boolean = false;
  showWhiteLogo : boolean = true;
  showDefaultLogo : boolean= false;

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rotaAtual = this.activatedRoute?.root?.firstChild?.snapshot?.routeConfig?.path ?? ""
        // console.log(this.rotaAtual)
        this.onWindowScroll();
      });
      // this.confirmToken();
  }

  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;

  closePanel() {
    this.panel.close();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){    
    const nav = this.elementRef.nativeElement.querySelector('#nav');
  
    if (this.rotaAtual === "" && window.scrollY > 90) {
      this.showWhiteLogo = false;
      this.showDefaultLogo = true;
      nav.style.background = '#fff';
      nav.style.color = '#1C3D69'
      return
    }

    // if (window.scrollY === 0) {
    //   nav.style.background = 'transparent';
    //   nav.style.color = 'white'
    //   return;
    // }

    if (window.scrollY === 0 && this.rotaAtual === "") {
      this.showWhiteLogo = true;
      this.showDefaultLogo = false;
      nav.style.background = 'transparent';
      nav.style.color = '#CEA44B'
      return;
    }

    if (window.scrollY === 0 && (this.rotaAtual === "blog" || this.rotaAtual === "servicos" || this.rotaAtual === "contato" || this.rotaAtual === "sobre" )) {
      this.showWhiteLogo = false;
      this.showDefaultLogo = true;
      nav.style.background = 'transparent';
      nav.style.color = '#CEA44B'
      return;
    }

    if(this.rotaAtual){
      this.showWhiteLogo = false;
      this.showDefaultLogo = true;
      nav.style.background = '#fff';
      nav.style.color = '#CEA44B'
      return
    }

  
    nav.style.background = 'transparent';
    
  }

  home(): void{
    this.router.navigate(['/'], { relativeTo: this.route });
     this.closePanel();
  }

  about(): void{    
    this.router.navigate(['/sobre'], { relativeTo: this.route });
     this.closePanel();
  }
 
  service(): void{
    this.router.navigate(['/servicos'], { relativeTo: this.route });
     this.closePanel();
  }

  blog(): void{
    this.router.navigate(['/blog'], { relativeTo: this.route });
     this.closePanel();
  }

  contact(): void{
    this.router.navigate(['/contato'], { relativeTo: this.route });
     this.closePanel();
  }


  // openDialogLogin(): void {
  //   const dialogRef = this.dialog.open(PopupLoginComponent, {
  //     panelClass: 'custom-dialog-container-login',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.login(result)
  //   });
  // } 

  // login(login : any){ 
  //   this.loginService.signIn(login).subscribe((res: any) => {
  //     localStorage.setItem('access_token', res.token);
  //     localStorage.setItem('loginLogout', 'true');
  //     this.confirmToken()
  //   });
  // }  

  // confirmToken(){
  //   var access_token = this.loginService.getToken()
    
  //   if(access_token  != null){  
  //     this.loginLogout = true;
  //     //this.router.navigate(['/adm'], { relativeTo: this.route });
  //   }
  // }

  // logout(){
  //   localStorage.removeItem('access_token');
  //   localStorage.setItem('loginLogout', 'false');
  //   this.loginLogout = false;
  //   this.loginService.doLogout();
  // }
}
