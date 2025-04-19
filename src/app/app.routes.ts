import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { ReservationComponent } from './reservation/reservation.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { CalculatriceComponent } from './admin/parts/calculatriceprix/calculatrice.component';
import { StocksComponent } from './admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './admin/parts/dashboards/dashboards.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },

  { path: 'admin-stocks', component: StocksComponent },
    { path: 'admin-tableau-de-bord', component: DashboardsComponent },
    { path: 'admin-calculatrice-prix', component: CalculatriceComponent },
  // Ajoutez d'autres routes ici
  { path: '**', redirectTo: '' } // Redirige vers la page d'accueil pour les routes non trouvées
];
