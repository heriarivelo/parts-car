import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importer CommonModule pour utiliser ngFor
import { StocksComponent } from './stocks.component'; // Assurez-vous que StocksComponent est bien importé

@NgModule({
  declarations: [
    StocksComponent  // Déclarez le StocksComponent ici
  ],
  imports: [
    CommonModule  // CommonModule est nécessaire pour ngFor et autres directives Angular
  ],
  exports: [
    StocksComponent  // Exporte le StocksComponent si nécessaire pour d'autres modules
  ]
})
export class StockModule { }
