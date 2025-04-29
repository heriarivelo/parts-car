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
import { HomeComponent } from './app/client/home/home.component';
import { ContactComponent } from './app/client/contact/contact.component';
import { ServicesComponent } from './app/client/services/services.component';
import { ReservationComponent } from './app/client/reservation/reservation.component';
import { VehiculesComponent } from './app/client/vehicules/vehicules.component';
import { ImportationComponent } from './app/admin/parts/importation/importation.component';
import { CommandeComponent } from './app/admin/parts/Commande/commande.component';
import { ArcticlesComponent } from './app/admin/parts/articles/articles.component';
import { EntrepotComponent } from './app/admin/parts/entrepot/entrepot.component';
// import { AboutComponent } from './app/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },

  { path: 'admin-stocks', component: StocksComponent },
  { path: 'admin-tableau-de-bord', component: DashboardsComponent },
  { path: 'admin-calculatrice-prix', component: CalculatriceComponent },
  { path: 'import-data' , component: ImportationComponent },
  { path: 'article' , component: ArcticlesComponent },
  { path: 'admin-commande' , component: CommandeComponent },
  { path: 'entrepot' , component: EntrepotComponent }
  

  // Ajoutez d'autres routes ici
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
