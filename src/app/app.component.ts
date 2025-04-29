import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { ManagerSidebarComponent } from './manageur/manager-sidebar/manager-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, AdminSidebarComponent, ManagerSidebarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  role: string[] = ['admin', 'manager'];
currentRole: string = 'admin'; // Par défaut admin

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects.toLowerCase();

      const matchedRole = this.role.find(r => url.includes(`/${r}`));
      this.currentRole = matchedRole ? matchedRole : 'admin'; // Reste sur admin si rien trouvé
    });
}
  
}
