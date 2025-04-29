import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Article {
  codeArt: string;
  marque: string;
  oem: string;
  prix: number;
  poids: number;
}

@Component({
  selector: 'app-new-commande',
  standalone: true,
  imports: [FormsModule, CommonModule ,  RouterModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewMComponent {
  codeArt = '';
  marque = '';
  oem = '';
  prix: number | null = null;
  poids: number | null = null;

  articles: Article[] = [];

  ajouterArticle() {
    if (this.codeArt && this.marque && this.oem && this.prix !== null && this.poids !== null) {
      const nouvelArticle: Article = {
        codeArt: this.codeArt.trim(),
        marque: this.marque.trim(),
        oem: this.oem.trim(),
        prix: this.prix,
        poids: this.poids
      };

      this.articles.push(nouvelArticle);

      // Réinitialiser les champs
      this.codeArt = '';
      this.marque = '';
      this.oem = '';
      this.prix = null;
      this.poids = null;
    }
  }

  supprimerArticle(index: number) {
    this.articles.splice(index, 1);
  }

  enregistrerCommande() {
    console.log('Commande enregistrée:', this.articles);
    // Appel API ou autre logique ici
  }
}
