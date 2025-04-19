// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ContactComponent } from './app/contact/contact.component';
import { ServicesComponent } from './app/services/services.component';
import { ReservationComponent } from './app/reservation/reservation.component';
import { VehiculesComponent } from './app/vehicules/vehicules.component';
import { StocksComponent } from './app/admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './app/admin/parts/dashboards/dashboards.component';
import { CalculatriceComponent } from './app/admin/parts/calculatriceprix/calculatrice.component';
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

  // Ajoutez d'autres routes ici
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
