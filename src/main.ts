// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { StocksComponent } from './app/admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './app/admin/parts/dashboards/dashboards.component';
import { CalculatriceComponent } from './app/admin/parts/calculatriceprix/calculatrice.component';
// import { HomeComponent } from './app/client/home/home.component';
import { ContactComponent } from './app/client/contact/contact.component';
import { ServicesComponent } from './app/client/services/services.component';
import { ReservationComponent } from './app/client/reservation/reservation.component';
import { VehiculesComponent } from './app/client/vehicules/vehicules.component';
import { ImportationComponent } from './app/admin/parts/importation/importation.component';
import { CommandeComponent } from './app/admin/parts/Commande/commande.component';
import { EntrepotComponent } from './app/admin/parts/entrepot/entrepot.component';
import { ArcticlesMComponent } from './app/manageur/parts/articles/articles.component';
import { CommandeMComponent } from './app/manageur/parts/Commande/commande.component';
import { LoginComponent } from './app/Login/login.component';
import { DashboardsMComponent } from './app/manageur/parts/dashboards/dashboards.component';
import { NewMComponent } from './app/manageur/parts/Commande/new/new.component';
import { FactureMComponent } from './app/manageur/parts/Facture/facture.component';
import { FactureMDComponent } from './app/manageur/parts/Facture/Detaille/factureD.component';
import { ArticlesComponent } from './app/admin/parts/articles/articles.component';
// import { AboutComponent } from './app/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },
  { path: 'login', component: LoginComponent },
  

  { path: 'admin-stocks', component: StocksComponent },
  { path: 'admin-tableau-de-bord', component: DashboardsComponent },
  { path: 'admin-calculatrice-prix', component: CalculatriceComponent },
  { path: 'import-data' , component: ImportationComponent },
  { path: 'article' , component: ArticlesComponent },
  { path: 'admin-commande' , component: CommandeComponent },
  { path: 'entrepot' , component: EntrepotComponent },

  // {
  //   path: 'manager',
  //   children: [
  //     { path: 'article', component: ArcticlesMComponent },
  //     { path: 'tableau-de-bord', component: DashboardsMComponent },
  //     {
  //       path: 'commande',
  //       children: [
  //         { path: '', component: CommandeMComponent },
  //         { path: 'new', component: NewMComponent },
  //         { path: 'facture', component: FactureMComponent },
  //         { path: 'facture/D', component: FactureMDComponent },
  //       ]
  //     },
  //     // (optionnel) redirection si /manager sans chemin
  //     { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
  //   ]
  // },
  // // redirection par défaut si aucun chemin
  // { path: '', redirectTo: '/manager', pathMatch: 'full' },
  // { path: '**', redirectTo: '/manager' }

  // Ajoutez d'autres routes ici
  { path: 'manager/article', component: ArcticlesMComponent },
  { path: 'manager/tableau-de-bord', component: DashboardsMComponent },
  { path: 'manager/commande', component: CommandeMComponent },
  { path: 'manager/commande/new', component: NewMComponent },
  { path: 'manager/facture', component: FactureMComponent },
  { path: 'manager/facture/D', component: FactureMDComponent },
      
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
