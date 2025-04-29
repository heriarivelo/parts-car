import { RouterOutlet, Routes } from '@angular/router';
import { CalculatriceComponent } from './admin/parts/calculatriceprix/calculatrice.component';
import { StocksComponent } from './admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './admin/parts/dashboards/dashboards.component';
import { ContactComponent } from './client/contact/contact.component';
import { HomeComponent } from './client/home/home.component';
import { ServicesComponent } from './client/services/services.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { VehiculesComponent } from './client/vehicules/vehicules.component';
import { ImportationComponent } from './admin/parts/importation/importation.component';
import { CommandeComponent } from './admin/parts/Commande/commande.component';
import { ArcticlesComponent } from './admin/parts/articles/articles.component';
import { EntrepotComponent } from './admin/parts/entrepot/entrepot.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },

  { path: 'admin-stocks', component: StocksComponent },
    { path: 'import-data' , component: ImportationComponent },
    { path: 'admin-tableau-de-bord', component: DashboardsComponent },
    { path: 'admin-calculatrice-prix', component: CalculatriceComponent },
    { path: 'admin-commande' , component: CommandeComponent },
    { path: 'article' , component: ArcticlesComponent },
    { path: 'entrepot' , component: EntrepotComponent },
  // Ajoutez d'autres routes ici
  { path: '**', redirectTo: '' } // Redirige vers la page d'accueil pour les routes non trouvées
];
