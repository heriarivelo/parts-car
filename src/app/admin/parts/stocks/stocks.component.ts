import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stocks',
  imports: [
    CommonModule,
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent {
  produits = [
    { id: 1, description: 'Produit A', quantiteRestant: 20, quantiteVendu: 5 },
    { id: 2, description: 'Produit B', quantiteRestant: 30, quantiteVendu: 10 },
    { id: 3, description: 'Produit C', quantiteRestant: 15, quantiteVendu: 8 },
    { id: 4, description: 'Produit D', quantiteRestant: 50, quantiteVendu: 12 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Méthode pour supprimer un produit
  supprimerProduit(id: number): void {
    this.produits = this.produits.filter(product => product.id !== id);
  }

  // Méthode pour modifier un produit (vous pouvez personnaliser cette logique)
  modifierProduit(id: number): void {
    const produit = this.produits.find(p => p.id === id);
    if (produit) {
      const newDescription = prompt('Nouvelle description:', produit.description);
      if (newDescription !== null) produit.description = newDescription;

      const newQuantiteRestant = prompt('Nouvelle quantité restante:', produit.quantiteRestant.toString());
      if (newQuantiteRestant !== null) produit.quantiteRestant = parseInt(newQuantiteRestant, 10) || produit.quantiteRestant;

      const newQuantiteVendu = prompt('Nouvelle quantité vendue:', produit.quantiteVendu.toString());
      if (newQuantiteVendu !== null) produit.quantiteVendu = parseInt(newQuantiteVendu, 10) || produit.quantiteVendu;
    }
  }
}
