import { CalculatriceComponent } from './admin/parts/calculatriceprix/calculatrice.component';
import { StocksComponent } from './admin/parts/stocks/stocks.component';
import { DashboardsComponent } from './admin/parts/dashboards/dashboards.component';
import { ContactComponent } from './client/contact/contact.component';
// import { HomeComponent } from './client/home/home.component';
import { ServicesComponent } from './client/services/services.component';
import { ReservationComponent } from './client/reservation/reservation.component';
import { VehiculesComponent } from './client/vehicules/vehicules.component';
import { ImportationComponent } from './admin/parts/importation/importation.component';
import { CommandeComponent } from './admin/parts/Commande/commande.component';
import { EntrepotComponent } from './admin/parts/entrepot/entrepot.component';
import { ArcticlesMComponent } from './manageur/parts/articles/articles.component';
// import { CommandeMComponent } from './manageur/parts/Commande/commande.component';
import { Routes } from '@angular/router';
import { DashboardsMComponent } from './manageur/parts/dashboards/dashboards.component';
import { LoginComponent } from './Login/login.component';
import { NewMComponent } from './manageur/parts/Commande/new/new.component';
import { FactureMComponent } from './manageur/parts/Facture/facture.component';
import { FactureMDComponent } from './manageur/parts/Facture/Detaille/factureD.component';
import { CommandeMComponent } from './manageur/parts/Commande/commande.component';
import { ArticlesComponent } from './admin/parts/articles/articles.component';

export const routes: Routes = [
  { path: '',redirectTo: '/login', pathMatch: 'full'  },
  { path: 'contact', component: ContactComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'nos-vehicules', component: VehiculesComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'admin-stocks', component: StocksComponent },
  { path: 'import-data' , component: ImportationComponent },
  { path: 'admin-tableau-de-bord', component: DashboardsComponent },
  { path: 'admin-calculatrice-prix', component: CalculatriceComponent },
  { path: 'admin-commande' , component: CommandeComponent },
  { path: 'article' , component: ArticlesComponent },
  { path: 'entrepot' , component: EntrepotComponent },

  { path: 'manager/article', component: ArcticlesMComponent },
  { path: 'manager/tableau-de-bord', component: DashboardsMComponent },
  { path: 'manager/commande', component: CommandeMComponent },
  { path: 'manager/commande/new', component: NewMComponent },
  { path: 'manager/facture', component: FactureMComponent },
  { path: 'manager/facture/D', component: FactureMDComponent },
      
];
