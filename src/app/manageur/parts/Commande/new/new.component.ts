import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import axios from 'axios';

interface ArticleCommande {
  code_art: string;
  lib1: string;
  quantite: number;
  prix_article: number;
}

@Component({
  selector: 'app-new',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewMComponent {
  commande = {
    reference: 'C001',
    mail_phone: '032 12 456 11',
    articles_commande: [] as ArticleCommande[]
  };

  nouvelArticle: ArticleCommande = {
    code_art: '',
    lib1: '',
    quantite: 1,
    prix_article: 0
  };

  ajouterArticle() {
    if (this.nouvelArticle.code_art && this.nouvelArticle.lib1) {
      this.commande.articles_commande.push({ ...this.nouvelArticle });
      this.nouvelArticle = { code_art: '', lib1: '', quantite: 1, prix_article: 0 };
    }
  }

  supprimerArticle(index: number) {
    this.commande.articles_commande.splice(index, 1);
  }

  enregistrerCommande() {
    // // Structure de la commande à envoyer
    // const commandeData = {
    //   reference: this.commande.reference,
    //   mail_phone: this.commande.mail_phone,
    //   articles_commande: this.commande.articles_commande.map(article => ({
    //     code_art: article.code_art,
    //     lib1: article.lib1,
    //     quantite: article.quantite,
    //     prix_article: article.prix_article
    //   }))
    // };

    // // Appel à l'API pour enregistrer la commande
    // axios.post('https://ton-api-endpoint.com/commande', commandeData)
    // .then(response => {
    //   console.log('Commande enregistrée avec succès:', response.data);
    // })
    // .catch(error => {
    //   console.error('Erreur lors de l\'enregistrement de la commande:', error);
    // });
}
}
