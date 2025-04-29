import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Composants personnalisés
import { FooterComponent } from './footer/footer.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { ManagerSidebarComponent } from './manageur/manager-sidebar/manager-sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

// (et tous les autres composants que tu as)

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppComponent,
    AdminSidebarComponent,
    ManagerSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  exports:[
    AppComponent,
    AdminSidebarComponent,
    ManagerSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  providers: [],
  bootstrap: [] // ton composant racine
})
export class AppModule { }
