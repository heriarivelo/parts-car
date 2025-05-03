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



export class StocksMComponent implements OnInit {
  
  produits: any[] = [];
  panier: any[] = [];

  reference: string = '';
  status: string = '';
  libelle: string = '';
  nom_client: string = '';
  mail_phone: string = '';

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
    const params = {
      lib1: this.filtres.lib1,
      marque: this.filtres.marque,
      oem: this.filtres.oem,
      auto: this.filtres.auto,
      page: this.filtres.page.toString(),
      limit: this.filtres.limit.toString(),
    };
  
    try {
      const response = await axios.get('http://localhost:5000/api/stock', { params });
      
      this.produits = response.data.results;
    } catch (error) {
      console.error('Erreur API :', error);
    }
  }

  showModal: boolean = false;
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ajouterAuPanier(produit: any): void {
    const produitDejaDansPanier = this.panier.find(item => item.lib1 === produit.lib1);


    if (produitDejaDansPanier) {
      
      alert('Cet article est déjà dans votre panier!');
    } else {
      this.panier.push(produit);
    }

    console.log(this.panier);

  }

  async validerCommande() {
    const commande = {
      reference: this.reference,
      status: this.status,
      libelle: this.libelle,
      nom_client: this.nom_client,
      mail_phone: this.mail_phone,
      panier: this.panier.map(item => ({
        lib1: item.lib1,
        quantite: item.qte_ttl,
        prix_article: item.prix_final
      }))
    };

    console.log(commande.panier);

      await axios.post('http://localhost:5000/api/commande', commande)
      .then(response => {
        console.log('Commande envoyée avec succès', response.data);
         this.reference = '';
        this.nom_client = '';
        this.mail_phone = '';
        this.status = '';
        this.libelle = '';
        this.panier = [];
        this.closeModal();
      })
      .catch(error => {
        console.error('Erreur lors de l’envoi de la commande', error);
      });
  }
  
  mettreAJourQuantite(article: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const nouvelleQuantite = Number(inputElement.value);
  
    const index = this.panier.indexOf(article);
    if (index !== -1 && nouvelleQuantite > 0) {
      this.panier[index].qte_ttl = nouvelleQuantite;
    }
  }
  
  supprimerArticle(article: any): void {
    this.panier = this.panier.filter(p => p !== article);
  }
  
}
