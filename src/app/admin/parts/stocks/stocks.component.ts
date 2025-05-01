import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-stocks',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})



export class StocksComponent implements OnInit {
  
  produits: any[] = [];

  filtres = {
    lib1: '',
    marque: '',
    oem: '',
    auto: '',
    page: 1,
    limit: 10
  };

  ngOnInit(): void {
    this.rechercher();
  }

  async rechercher(): Promise<void> {
    // Construction de l'URL avec les filtres saisis par l'utilisateur
    const params = {
      lib1: this.filtres.lib1,
      marque: this.filtres.marque,
      oem: this.filtres.oem,
      auto: this.filtres.auto,
      page: this.filtres.page.toString(),
      limit: this.filtres.limit.toString(),
    };
  
    try {
      // Appel asynchrone à l'API avec axios
      const response = await axios.get('http://localhost:5000/api/stock', { params });
      
      // Mise à jour des produits avec les résultats récupérés
      this.produits = response.data.results;
    } catch (error) {
      console.error('Erreur API :', error);
    }
  }
  
  
  

  modifierProduit(id: number): void {
    alert(`Modifier produit ${id}`);
  }

  supprimerProduit(id: number): void {
    this.produits = this.produits.filter(p => p.id !== id);
  }
}
