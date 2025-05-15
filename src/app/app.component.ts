import { Component } from '@angular/core';
// import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { ManagerSidebarComponent } from './manageur/manager-sidebar/manager-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminSidebarComponent } from "./admin/admin-sidebar/admin-sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ManagerSidebarComponent, AdminSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(_title: any) {
    throw new Error('Method not implemented.');
  }
  role: string[] = ['admin', 'manager'];
currentRole: string = 'admin'; // Par défaut admin
showLayout: boolean = true;

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects.toLowerCase();

      const matchedRole = this.role.find(r => url.includes(`/${r}`));
      this.currentRole = matchedRole ? matchedRole : 'admin'; // Reste sur admin si rien trouvé
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cacher le layout complet uniquement pour la page de login
        this.showLayout = event.url !== '/login';
      }
    });
}

  
}
